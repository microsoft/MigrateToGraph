declare module '*/package.json' {
  const version: string;
  export { version };
}

declare module '*.json' {
  const value: any;
  export default value;
}
