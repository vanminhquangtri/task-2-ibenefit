import UserAvatar from 'components/User/Avatar';
import UserInfo from 'components/User/Info';
import React, { useState } from 'react';
import './User.style.scss';

const UerLayout = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatarToParent] = useState('');
  return (
    <div className="w-50 m-auto p-2 card ">
      <UserAvatar isEdit={isEdit} setAvatarToParent={setAvatarToParent} />
      <UserInfo isEdit={isEdit} setIsEdit={setIsEdit} avatar={avatar} />
    </div>
  );
};

export default UerLayout;
