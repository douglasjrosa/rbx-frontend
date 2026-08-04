import http from "node:http";
import { URL } from "node:url";
import fs from "node:fs";
import { OAuth2Client } from "google-auth-library";
import { loadGoogleAdsConfig } from "./lib/load-env.mjs";

const REDIRECT_PORT = 3333;
const REDIRECT_URI = `http://127.0.0.1:${REDIRECT_PORT}/oauth2callback`;
const SCOPE = "https://www.googleapis.com/auth/adwords";

async function main() {
  const config = loadGoogleAdsConfig();
  const oauth2Client = new OAuth2Client(
    config.clientId,
    config.clientSecret,
    REDIRECT_URI,
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [SCOPE],
  });

  console.log("1) Open this URL in the browser signed into the Ads account:");
  console.log(authUrl);
  console.log("");
  console.log(
    `2) Waiting for OAuth callback on ${REDIRECT_URI} ...`,
  );

  const code = await waitForAuthCode();
  const { tokens } = await oauth2Client.getToken(code);

  if (!tokens.refresh_token) {
    throw new Error(
      "No refresh_token returned. Revoke prior access at " +
        "https://myaccount.google.com/permissions and run ads:auth again " +
        "with prompt=consent.",
    );
  }

  fs.writeFileSync(
    config.tokensPath,
    JSON.stringify(
      {
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token,
        expiry_date: tokens.expiry_date,
        scope: tokens.scope,
        token_type: tokens.token_type,
        created_at: new Date().toISOString(),
      },
      null,
      2,
    ),
  );

  appendRefreshTokenToEnv(config.repoRoot, tokens.refresh_token);

  console.log("");
  console.log(`Saved tokens to ${config.tokensPath}`);
  console.log("Also wrote GOOGLE_ADS_REFRESH_TOKEN into .env.google-ads.local");
  console.log("Next: npm run ads:accounts");
}

/**
 * @returns {Promise<string>}
 */
function waitForAuthCode() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const requestUrl = new URL(req.url || "/", `http://127.0.0.1:${REDIRECT_PORT}`);
        if (requestUrl.pathname !== "/oauth2callback") {
          res.writeHead(404);
          res.end("Not found");
          return;
        }

        const error = requestUrl.searchParams.get("error");
        if (error) {
          res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(`OAuth error: ${error}`);
          server.close();
          reject(new Error(error));
          return;
        }

        const code = requestUrl.searchParams.get("code");
        if (!code) {
          res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Missing code");
          return;
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          "<html><body><h1>Google Ads OAuth OK</h1>" +
            "<p>You can close this tab and return to the terminal.</p>" +
            "</body></html>",
        );
        server.close();
        resolve(code);
      } catch (err) {
        server.close();
        reject(err);
      }
    });

    server.listen(REDIRECT_PORT, "127.0.0.1");
  });
}

/**
 * @param {string} repoRoot
 * @param {string} refreshToken
 */
function appendRefreshTokenToEnv(repoRoot, refreshToken) {
  const envPath = `${repoRoot}/.env.google-ads.local`;
  let content = "";
  try {
    content = fs.readFileSync(envPath, "utf8");
  } catch {
    content = "";
  }

  const line = `GOOGLE_ADS_REFRESH_TOKEN=${refreshToken}`;
  if (/^GOOGLE_ADS_REFRESH_TOKEN=/m.test(content)) {
    content = content.replace(/^GOOGLE_ADS_REFRESH_TOKEN=.*$/m, line);
  } else {
    content = `${content.trimEnd()}\n\n${line}\n`;
  }
  fs.writeFileSync(envPath, content);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
