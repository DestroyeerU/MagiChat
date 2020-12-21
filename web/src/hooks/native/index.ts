import { useMemo, useRef } from 'react';

export function useSafeRef<T = any>(ref: React.Ref<T>) {
  const defaultRef = useRef<T>(null);

  return useMemo(() => {
    if (ref) {
      return ref as React.RefObject<T>;
    }

    return defaultRef;
  }, [ref]);
}
