import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="text-center">
      <h5>Test ReactJs Ibenefit</h5>
      <NavLink to="/login" className="btn btn-success">
        Đăng nhập
      </NavLink>
    </div>
  );
};

export default HomeLayout;
