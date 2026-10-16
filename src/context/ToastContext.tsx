import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', title?: string) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, type, title, message }]);
      setTimeout(() => removeToast(id), 5000);
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, title?: string) => showToast(message, 'success', title || 'عملیات موفق'),
    [showToast]
  );

  const error = useCallback(
    (message: string, title?: string) => showToast(message, 'error', title || 'خطا در ارسال'),
    [showToast]
  );

  const info = useCallback(
    (message: string, title?: string) => showToast(message, 'info', title || 'پیام سیستم'),
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, info }}>
      {children}

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto rounded-editorial-lg border p-4 shadow-xl flex items-start gap-3 backdrop-blur-md ${
                toast.type === 'success'
                  ? 'bg-cream-card border-emerald-700/30 text-warm-charcoal'
                  : toast.type === 'error'
                  ? 'bg-cream-card border-red-700/30 text-warm-charcoal'
                  : 'bg-cream-card border-warm-hairline text-warm-charcoal'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                ) : toast.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <Info className="w-5 h-5 text-teal" />
                )}
              </div>

              <div className="flex-1 min-w-0 text-right">
                {toast.title && (
                  <h5 className="font-display font-bold text-xs text-warm-charcoal mb-0.5">
                    {toast.title}
                  </h5>
                )}
                <p className="text-xs text-warm-muted leading-relaxed">{toast.message}</p>
              </div>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-warm-muted hover:text-warm-charcoal p-1"
                aria-label="بستن اعلان"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
