import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useDemoStore } from "../../store/useDemoStore";

export function Toast() {
  const { toasts, dismissToast } = useDemoStore();

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((toast) => window.setTimeout(() => dismissToast(toast.id), 2800));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [toasts, dismissToast]);

  return (
    <div className="fixed bottom-4 right-4 z-[80] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div key={toast.id} className="rounded-2xl border border-border bg-white p-4 shadow-xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}>
            <p className="font-semibold text-brand-navy">{toast.title}</p>
            <p className="mt-1 text-sm text-text-secondary">{toast.description}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
