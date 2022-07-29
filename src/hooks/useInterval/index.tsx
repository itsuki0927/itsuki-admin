import { useRef, useEffect } from 'react';

type EmptyFunction = () => void;

const useInterval = (handler: EmptyFunction, delay: number | null = 1000) => {
  const callbackRef = useRef<EmptyFunction | undefined>();

  useEffect(() => {
    callbackRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const tick = () => {
      callbackRef.current!();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
