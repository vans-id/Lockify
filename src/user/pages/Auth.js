import React, { useState, useContext } from 'react';
import GoogleLogin from 'react-google-login';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/Validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import '../../places/pages/PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth = () => {
  const [state, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: { value: '', isValid: false },
    },
    false
  );
  const [isLogin, setIsLogin] = useState(true);
  const {
    error,
    isLoading,
    sendRequest,
    clearError,
  } = useHttpClient();
  const { login } = useContext(AuthContext);

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
          image: undefined,
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
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevState) => !prevState);
  };

  const authHandler = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: state.inputs.email.value,
            password: state.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        login(
          data.userId,
          data.name,
          data.image,
          data.token
        );
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append(
          'name',
          state.inputs.name.value
        );
        formData.append(
          'email',
          state.inputs.email.value
        );
        formData.append(
          'password',
          state.inputs.password.value
        );
        formData.append(
          'image',
          state.inputs.image.value
        );

        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          'POST',
          formData
        );

        login(
          data.userId,
          data.name,
          data.image,
          data.token
        );
      } catch (err) {}
    }
  };

  const responseGoogle = async (response) => {
    try {
      const code = response['code'];
      const data = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
        'POST',
        JSON.stringify({ code }),
        {
          'Content-Type': 'application/json',
        }
      );

      login(
        data.userId,
        data.name,
        data.image,
        data.token
      );
    } catch (err) {}
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <form
        onSubmit={authHandler}
        className='place-form'
      >
        {!isLogin && (
          <>
            <ImageUpload
              id='image'
              center
              isRounded
              onInput={inputHandler}
              errorText='Please provide an avatar image'
            />
            <Input
              id='name'
              element='input'
              label='Username'
              placeholder='Enter username'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a valid Username'
              onInput={inputHandler}
            />
          </>
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
        <div className='center divider'>or</div>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          render={(renderProps) => (
            <Button
              type='button'
              size='large'
              className='btn-google'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <i className='fab fa-google'></i>
              LOGIN WITH GOOGLE
            </Button>
          )}
          responseType='code'
          buttonText='Login'
          redirectUri='postmessage'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </form>
    </>
  );
};

export default Auth;
