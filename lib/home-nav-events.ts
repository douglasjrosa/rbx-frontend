export const HOME_NAV_HASH_EVENT = 'home-nav-hash';

export const HOME_NAV_HASH_UNLOCK_EVENT = 'home-nav-hash-unlock';

export function dispatchHomeNavHash(hash: string): void {
  window.dispatchEvent(
    new CustomEvent<string>(HOME_NAV_HASH_EVENT, { detail: hash }),
  );
}

export function dispatchHomeNavHashUnlock(): void {
  window.dispatchEvent(new Event(HOME_NAV_HASH_UNLOCK_EVENT));
}
