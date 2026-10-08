import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({
  children,
  isOpen,
  onClose,
  overlay,
  className = "",
}) {
  if (!isOpen) return null;

  return createPortal(
    <motion.div
      onClick={() => onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className={`fixed inset-0 bg-black/60 modal-overlay-backdrop z-50 ${overlay}`}
    >
      <div className={`w-full h-full pointer-events-none ${className}`}>
        {children}
      </div>
    </motion.div>,
    document.body,
  );
}
