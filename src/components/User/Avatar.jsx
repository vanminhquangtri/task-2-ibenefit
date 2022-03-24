import Icons from 'config/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ErrorNotiModal } from 'utils/modal';
import uploadAPI from 'api/upload';
import { setUser } from 'store/user/reducers';

const UserAvatar = ({ isEdit, setAvatarToParent }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(Icons.defaultAvatar);
  const storedUser = useSelector((state) => {
    return state.User;
  });

  // check avatar validity
  const checkAvatar = async () => {
    const storedAvatar = storedUser?.user?.avatar;
    await new Promise(() => {
      const img = new Image();
      img.src = storedAvatar;
      img.onload = () => {
        setAvatar(storedAvatar);
      };
    });
  };

  // update new avatar to server
  const handleChangeAvatar = async (e) => {
    const acceptedFormat = ['image/png', 'image/jpeg'];
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const { type } = file;
    if (!acceptedFormat.includes(type)) {
      ErrorNotiModal({ html: 'Vui lòng chỉ sử dụng file ảnh PNG hoặc JPG' });
      return;
    }
    const data = new FormData();
    data.append('file', file);
    data.append('app_id', '1');
    data.append('upload_time', new Date());
    data.append('secure_code', '6007560ba8');
    const response = await uploadAPI.uploadImage(data);

    if (response?.success) {
      setAvatar(response?.data);
      // update redux
      const newUser = {
        ...storedUser,
        user: { ...storedUser?.user, avatar: response?.data },
      };
      dispatch(setUser(newUser));
    }
  };

  useEffect(() => {
    checkAvatar();
  }, []);

  useEffect(() => {
    setAvatarToParent(avatar);
  }, [avatar]);

  return (
    <div className="mb-4 d-flex justify-content-start">
      <div className="position-relative p-2">
        <img
          src={avatar}
          alt="user avatar"
          width="100"
          height="100"
          className="rounded-circle"
        />
        {isEdit && (
          <label className="camera-icon" htmlFor="avatar">
            <img
              src={Icons.cameraIcon}
              alt="user avatar"
              width="25"
              height="25"
            />
          </label>
        )}
      </div>
      <input
        className="d-none"
        type="file"
        id="avatar"
        onChange={handleChangeAvatar}
      />
    </div>
  );
};

UserAvatar.propTypes = {
  isEdit: PropTypes.bool,
  setAvatarToParent: PropTypes.func,
};

export default UserAvatar;
