import isUrl from "validator/lib/isURL";

export function isValidUrl(url: string) {
  return isUrl(url, {
    protocols: [ 'https' ],
    require_protocol: true
  });
}
