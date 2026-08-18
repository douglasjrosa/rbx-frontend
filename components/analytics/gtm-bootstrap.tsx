import { buildGtmBootstrapScript } from '@/lib/analytics/gtm-loader-script';
import { isTrackingEnabled } from '@/lib/analytics/is-tracking-enabled';

/**
 * Server-rendered bootstrap: Consent Mode defaults, click-id capture, and
 * deferred gtm.js (engagement / idle). Preview + returning consent load ASAP.
 */
export default function GtmBootstrap() {
  if (!isTrackingEnabled()) {
    return null;
  }

  return (
    <script
      id="gtm-bootstrap"
      dangerouslySetInnerHTML={{ __html: buildGtmBootstrapScript() }}
    />
  );
}
