import { MdError } from 'react-icons/md';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { IoIosWarning } from 'react-icons/io';
import { RiInformationLine } from 'react-icons/ri';

const iconConfig = {
  error: { Icon: MdError, className: 'text-[#E03F32]' },
  success: { Icon: IoCheckmarkCircle, className: 'text-[#04B00B]' },
  warning: { Icon: IoIosWarning, className: 'text-[#E5B510]' },
  info: { Icon: RiInformationLine, className: 'text-[#2689D7]' },
};

export function ToastComponent({ closeToast, status = null, message, type = 'info' }) {
  const { Icon, className } = iconConfig[type] || iconConfig.info;

  return (
    <div className="w-full flex gap-3 items-center text-pitch/60">
      <Icon size={24} className={`shrink-0 ${className}`} />

      <div className="flex-1 min-w-0">
        <p aria-label={message} className="text-xs font-light line-clamp-2">
          {message}
        </p>
        {status && (
          <span className="text-xs font-light text-pitch/40">
            Estado: {status}
          </span>
        )}
      </div>

      <button
        type="button"
        aria-label="Cerrar notificación"
        onClick={closeToast}
        className="cursor-pointer"
      >
        <span className="whitespace-nowrap text-xs font-light ">Ocultar</span>
      </button>
    </div>
  );
}
