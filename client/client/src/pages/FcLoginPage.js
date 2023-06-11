import React from 'react';
import FcAuthTemplate from '../components/auth/FcAuthTemplate';
import FcLoginForm from '../containers/auth/FcLoginForm';

const FcLoginPage = () => {
  return (
    <FcAuthTemplate>
      <FcLoginForm />
    </FcAuthTemplate>
  );
};

export default FcLoginPage;