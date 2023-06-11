import React from 'react';
import FcAuthTemplate from '../components/auth/FcAuthTemplate';
import FcRegisterForm from '../containers/auth/FcRegisterForm';

const FcRegisterPage = () => {
  return (
    <FcAuthTemplate>
      <FcRegisterForm />
    </FcAuthTemplate>
  );
};

export default FcRegisterPage;