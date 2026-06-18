const REDIRECT_DESTINATION_PARAM = 'dest';

export { REDIRECT_DESTINATION_PARAM };

export function getRedirectDestinationParam(
  searchParams: URLSearchParams,
): string | null {
  return searchParams.get(REDIRECT_DESTINATION_PARAM);
}

export function isValidRedirectDestination(destination: string | null): boolean {
  if (!destination) {
    return false;
  }

  if (!destination.startsWith('/') || destination.startsWith('//')) {
    return false;
  }

  return !destination.includes('://');
}

export function buildRedirectTargetUrl(
  destination: string,
  requestUrl: string,
): URL {
  return new URL(destination, requestUrl);
}
