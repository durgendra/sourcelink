import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { Toast } from "../components/ui/Toast";
import { useDemoStore } from "../store/useDemoStore";

export function AppProviders({ children }: PropsWithChildren) {
  const initialize = useDemoStore((state) => state.initialize);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return (
    <>
      {children}
      <Toast />
    </>
  );
}
