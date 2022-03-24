import Swal from 'sweetalert2';

export const defaultSWalConfig = {
  title: 'Thông báo',
  html: 'Thông báo',
  icon: 'success',
  showConfirmButton: true,
  confirmButtonText: 'Tiếp tục',
  showCancelButton: false,
  cancelButtonText: 'Hủy',
};

export const NotiModal = (configs = {}) => {
  const finalConfig = Object.assign({ ...defaultSWalConfig }, configs);
  return Swal.fire(finalConfig);
};

export const SuccessNotiModal = (configs = {}) => {
  return NotiModal({ ...configs, title: 'Thành công' });
};

export const ErrorNotiModal = (configs = {}) => {
  return NotiModal({ ...configs, icon: 'error' });
};
