export function isTrackingEnabled(): boolean {
  return process.env.NODE_ENV === 'production';
}
