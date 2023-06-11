import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FcHeader from '../../components/common/FcHeader';
import { logout } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const FcHeaderContainer = () => {
  const navigate = useNavigate();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    navigate('/');
    // window.location.href="/";
  };
  return <FcHeader user={user} onLogout={onLogout} />;
};

export default FcHeaderContainer;