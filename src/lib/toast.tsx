import { CheckCircle, WarningCircle } from 'phosphor-react';
import { toast } from 'react-toastify';

export const Toast = (
  message: string,
  type: 'success' | 'error' = 'success',
  options = {}
) =>
  toast[type](
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      {message}
      {type === 'success' && <CheckCircle size={24} />}
      {type === 'error' && <WarningCircle size={24} />}
    </div>,
    { ...options }
  );
