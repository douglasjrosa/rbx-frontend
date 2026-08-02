import { buildGtmBootstrapScript } from '@/lib/analytics/gtm-loader-script';
import { isTrackingEnabled } from '@/lib/analytics/is-tracking-enabled';

/**
 * Server-rendered bootstrap so GTM Preview can detect the container early
 * without downloading gtm.js for regular visitors.
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
