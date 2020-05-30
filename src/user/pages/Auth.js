import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/Validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';

const Auth = () => {
  const [state, inputHandler, setFormData] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);

  const authHandler = (e) => {
    e.preventDefault();
    console.log(state.inputs);
    login();
  };

  const switchModeHandler = (e) => {
    const {
      email: { isValid: emailValid },
      password: { isValid: passwordValid },
    } = state.inputs;

    if (!isLogin) {
      setFormData(
        {
          ...state.inputs,
          name: undefined,
        },
        emailValid && passwordValid
      );
    } else {
      setFormData(
        {
          ...state.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevState) => !prevState);
  };

  return (
    <form
      onSubmit={authHandler}
      className='place-form'
    >
      {!isLogin && (
        <Input
          id='name'
          element='input'
          label='Username'
          placeholder='Enter username'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid Username'
          onInput={inputHandler}
        />
      )}
      <Input
        id='email'
        element='input'
        label='Email'
        placeholder='Enter email'
        validators={[VALIDATOR_EMAIL()]}
        errorText='Please enter a valid Email'
        onInput={inputHandler}
      />
      <Input
        id='password'
        type='password'
        element='input'
        label='Password'
        placeholder='Enter password'
        validators={[VALIDATOR_MINLENGTH(8)]}
        errorText='Please enter a valid Password (min 8 characters)'
        onInput={inputHandler}
      />
      <Button
        type='submit'
        disabled={!state.isValid}
        size='large'
        inverse
      >
        {isLogin ? 'LOGIN' : 'SIGN UP'}
      </Button>
      <Button
        type='button'
        size='large'
        onClick={switchModeHandler}
      >
        SWITCH TO {!isLogin ? 'LOGIN' : 'SIGN UP'}
      </Button>
    </form>
  );
};

export default Auth;
