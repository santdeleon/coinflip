import React, { useLayoutEffect, useRef, useReducer, useCallback } from 'react';

function useSafeDispatch(dispatch) {
  const mounted = React.useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  );
}

const defaultInitialState = { data: null, status: 'idle', error: null };

export const useAsync = (initialState) => {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ data, status, error }, setState] = useReducer(
    (s, a) => ({ ...s, ...a }),
    initialStateRef.current,
  );

  const safeSetState = useSafeDispatch(setState);

  const run = useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        );
      }
      safeSetState({ status: 'pending' });
      return promise.then(
        (data) => {
          safeSetState({ data, status: 'resolved' });
          return data;
        },
        (error) => {
          safeSetState({ status: 'rejected', error });
          return error;
        },
      );
    },
    [safeSetState],
  );

  const setData = useCallback((data) => safeSetState({ data }), [safeSetState]);
  const setError = useCallback((error) => safeSetState({ error }), [
    safeSetState,
  ]);
  const reset = useCallback(() => safeSetState(initialStateRef.current), [
    safeSetState,
  ]);

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
};
