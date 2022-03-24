import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import userAPI from 'api/user';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/user/reducers';
import { useNavigate } from 'react-router-dom';

const loginSchema = yup
  .object({
    email: yup
      .string()
      .required('Vui lòng nhập địa chỉ email')
      .email('Email không hợp lệ'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khâu')
      .test(
        'len',
        'Mật khẩu tối thiểu 9 ký tự',
        (val) => val.toString().length >= 9
      ),
  })
  .required();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const handleLogin = async (data = {}) => {
    setLoading(true);
    const response = await userAPI.login(data);
    setLoading(false);
    if (response?.success) {
      dispatch(setUser(response?.data));
      navigate('/user');
    }
  };
  const onSubmit = (data) => {
    handleLogin(data);
  };

  return (
    <div className="m-3 card p-3">
      <h5>Đăng nhập</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input {...register('email')} className="form-control" />
          {errors.email && (
            <div className="text-danger">{errors.email?.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Mật khẩu
          </label>
          <input
            {...register('password')}
            type="password"
            className="form-control"
          />
          {errors.password && (
            <div className="text-danger">{errors.password?.message}</div>
          )}
        </div>
        <div>
          <button disabled={loading} className="btn btn-success">
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
