declare module 'json-source-map' {
  export function stringify(
    value: any,
    replacer?: (key: string, value: any) => any,
    space?: string | number
  ): { json: string; pointers: any };
}
