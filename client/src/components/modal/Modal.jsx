import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({
  children,
  isOpen,
  onClose,
  overlay = '',
  className = '',
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.backgroundColor = '#F3F0EA';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return createPortal(
    
    <motion.div
      onClick={() => onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-lenis-prevent
      className={`fixed inset-0 bg-black/60 modal-overlay-backdrop z-50 ${overlay}`}
    >
      <div className={`w-full h-full pointer-events-none ${className}`}>
        {children}
      </div>
    </motion.div>,
    document.body
  );
}
