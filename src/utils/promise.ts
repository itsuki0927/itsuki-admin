export function timeoutPromise<T>(promiseFn: () => Promise<T>, time = 10000) {
  let timer: null | NodeJS.Timeout;
  let timePResolve: (value: unknown) => void;
  const timeP = () =>
    new Promise((resolve, reject) => {
      timePResolve = resolve;
      timer = setTimeout(() => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`请求超时, time: ${time}`);
      }, time);
    });

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timePResolve?.('timeP resolved');
  };

  return Promise.race([promiseFn(), timeP()]).then(
    res => {
      clearTimer();
      return res as T;
    },
    err => {
      clearTimer();
      return Promise.reject(err);
    }
  );
}
