import * as convertHrtime from 'convert-hrtime';

export function timeit(fn: () => void): convertHrtime.HRTime {
  const start = process.hrtime();
  fn();
  return convertHrtime(process.hrtime(process.hrtime()));
}
