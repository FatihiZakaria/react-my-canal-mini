import { useEffect, useRef } from "react";

export const useEffectOnce = (
  effect: () => void | (() => void),
  withParam?: any
) => {
  const destroyFunc = useRef<void | (() => void)>();
  const calledOnce = useRef(false);
  const renderAfterCalled = useRef(false);

  if (calledOnce.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    calledOnce.current = true;
    destroyFunc.current = effect();

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }

      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withParam]);
};
