import React from 'react';

const ErrorLayout = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <h5>
        Hệ thống không thể khởi tạo mã thiết bị (device_code), vui lòng thử lại
        sau ít phút.
      </h5>
    </div>
  );
};

export default ErrorLayout;
