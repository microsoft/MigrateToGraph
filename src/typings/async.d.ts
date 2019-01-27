import * as async from 'async';
declare module 'async' {
  export function retryable<T, E = Error>(
    opts:
      | number
      | { times: number; interval: number | ((retryCount: number) => number) },
    task: AsyncFunction<T, E>
  ): AsyncFunction<T, E>;
}
