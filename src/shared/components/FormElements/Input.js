import React, { useReducer, useEffect } from 'react';

import './Input.css';
import { validate } from '../../utils/Validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(
          action.val,
          action.validators
        ),
      };

    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(
    inputReducer,
    {
      value: props.initialValue || '',
      isTouched: false,
      isValid: props.initialValid || false,
    }
  );

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = (e) => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        placeholder={props.placeholder}
        onBlur={touchHandler}
        value={inputState.value}
      ></textarea>
    );

  return (
    <div
      className={`form-control ${props.className} ${
        !inputState.isValid &&
        inputState.isTouched &&
        'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p>{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
