import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser } from 'store/user/reducers';
import userAPI from 'api/user';
import { useNavigate } from 'react-router-dom';
import { ErrorNotiModal } from 'utils/modal';

const UserInfo = ({ isEdit, setIsEdit, avatar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = useSelector((state) => {
    return state.User;
  });
  const [userInfo, setUserInfo] = useState({
    name: storedUser?.user?.name || '',
    phone_number: storedUser?.user?.uncen_phone_number || '',
    gender: storedUser?.user?.gender,
    address: storedUser?.user?.address,
    id_number: storedUser?.user?.id_number,
  });
  const { name, phone_number, gender, address } = userInfo;
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const updateUserInfoState = (ev) => {
    const value = ev.target.value;
    setUserInfo((state) => {
      return { ...state, [ev.target.name]: value };
    });
  };

  // validate name and phone
  const validPhoneAndName = () => {
    let isValid = false;
    // check tên
    if (!name) {
      alert('Vui lòng nhập tên');
      return;
    }
    if (name.length > 32) {
      setNameError('Vui lòng nhập tên tối đa 32 ký tự');
      return;
    }
    // check sđt
    if (!phone_number) {
      alert('Vui lòng nhập số điện thoại');
      return;
    }
    if (!phone_number.includes('+')) {
      const isNumberOnly = /^\d*(\.\d+)?$/;
      const numberResult = isNumberOnly.test(phone_number);
      const validLength = phone_number.length === 10;
      const startWithZero = phone_number[0] === '0';
      if (!numberResult) {
        setPhoneError('Vui lòng chỉ nhập số điện thoại bằng chữ số');
        return;
      }
      if (!validLength) {
        setPhoneError('Vui lòng nhập số điện thoại 10 chữ số');
        return;
      }
      if (!startWithZero) {
        setPhoneError('Vui lòng nhập số điện thoại bắt đầu bằng số 0');
        return;
      }
      isValid = true;
    } else {
      const startWith84 =
        (phone_number[0] === '+' && phone_number[1] === '8') ||
        phone_number[2] === '4';
      if (!startWith84) {
        setPhoneError('Vui lòng nhập số điện thoại bắt đầu bằng số +84');
        return;
      }
      isValid = true;
    }
    return isValid;
  };

  // update new info to redux
  const updateUserToRedux = () => {
    const newUser = {
      ...storedUser,
      user: {
        ...storedUser?.user,
        name,
        uncen_phone_number: phone_number,
        phone_number,
        gender: parseInt(gender),
        address,
        avatar,
      },
    };
    dispatch(setUser(newUser));
  };

  // update user info to server
  const updateUserToServer = async () => {
    if (!validPhoneAndName()) {
      return;
    }
    const data = {
      name,
      avatar,
      gender: parseInt(gender),
      address,
      phone_number,
    };
    const response = await userAPI.update(data);
    if (response?.success) {
      updateUserToRedux();
      setIsEdit(false);
    }
  };

  // call api logout
  const handleLogout = async () => {
    const response = await userAPI.logout();
    if (response?.success) {
      navigate('/login');
      dispatch(setUser({}));
    }
  };

  // reset form error whenever change edit state
  useEffect(() => {
    setPhoneError('');
    setNameError('');
  }, [isEdit]);

  // check if user already logged in
  useEffect(() => {
    if (!storedUser?.user?.id) {
      navigate('/login');
      ErrorNotiModal({ html: 'Vui lòng đăng nhập lại' });
    }
  }, []);

  return (
    <div>
      <h6>
        Xin chào
        <input
          className={`p-2 fw-bold  ${
            isEdit ? 'border ms-1' : 'border-0 outline-0'
          }`}
          type="text"
          name="name"
          disabled={!isEdit}
          value={name}
          onChange={updateUserInfoState}
        />
      </h6>
      {isEdit && nameError && (
        <div className="text-danger mt-1">{nameError}</div>
      )}
      <div className="mt-3">
        Số điện thoại:
        <input
          className={`p-2 fw-bold  ${
            isEdit ? 'border ms-1' : 'border-0 outline-0'
          }`}
          type="text"
          name="phone_number"
          disabled={!isEdit}
          value={phone_number}
          onChange={updateUserInfoState}
        />
        {isEdit && phoneError && (
          <div className="text-danger mt-1">{phoneError}</div>
        )}
      </div>
      <div className="mt-3">
        Giới tính:
        <select
          className={`p-2 fw-bold  ${
            isEdit ? 'border ms-1' : 'border-0 outline-0'
          }`}
          type="text"
          name="gender"
          disabled={!isEdit}
          value={gender}
          onChange={updateUserInfoState}>
          <option value="1">Nữ</option>
          <option value="2">Nam</option>
          <option value="3">Khác</option>
        </select>
      </div>
      <div className="mt-3">
        Địa chỉ:
        <input
          className={`p-2 fw-bold  ${
            isEdit ? 'border ms-1' : 'border-0 outline-0'
          }`}
          type="text"
          name="address"
          disabled={!isEdit}
          value={address}
          onChange={(e) => updateUserInfoState(e)}
        />
      </div>
      <div className="mt-4 text-end">
        {isEdit && (
          <button className="btn btn-success me-2" onClick={updateUserToServer}>
            Lưu
          </button>
        )}
        {!isEdit && (
          <button
            className="btn btn-success me-2"
            onClick={() => setIsEdit(!isEdit)}>
            Chỉnh sửa
          </button>
        )}
        <button className="btn btn-danger" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
  avatar: PropTypes.string,
};

export default UserInfo;
