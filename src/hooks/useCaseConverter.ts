import { useDeferredValue, useMemo } from 'react';

export function useCaseConverter(input: string, batchMode: boolean) {
  const deferredInput = useDeferredValue(input);

  const transform = useMemo(() => {
    return (fn: (val: string) => string): string => {
      if (!deferredInput) return '';

      if (batchMode) {
        return deferredInput
          .split('\n')
          .map((line) => (line.length > 0 ? fn(line) : ''))
          .join('\n');
      }

      return fn(deferredInput);
    };
  }, [deferredInput, batchMode]);

  return {
    deferredInput,
    transform,
    isStale: input !== deferredInput,
  };
}

