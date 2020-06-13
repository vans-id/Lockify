import {
  useEffect,
  useCallback,
  useReducer,
} from 'react';

let logoutTimer;

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const tokenExp =
        action.expirationDate ||
        new Date(
          new Date().getTime() + 1000 * 60 * 60
        );

      return {
        token: action.token,
        userId: action.uid,
        userName: action.username,
        userImage: action.imageUrl,
        tokenExpDate: tokenExp,
      };
    case 'LOGOUT':
      return {};

    default:
      return state;
  }
};

export const useAuth = () => {
  const [state, dispatch] = useReducer(
    authReducer,
    {},
    () => {
      const storedData = localStorage.getItem(
        'userData'
      );
      return storedData ? JSON.parse(storedData) : {};
    }
  );

  const login = useCallback(
    (
      uid,
      username,
      imageUrl,
      token,
      expirationDate
    ) => {
      dispatch({
        type: 'LOGIN',
        uid,
        username,
        imageUrl,
        token,
        expirationDate,
      });
    },
    []
  );

  const logout = useCallback(() => {
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const {
    token,
    userId,
    userName,
    userImage,
    tokenExpDate,
  } = state;

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('userData');
    } else {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId,
          token,
          userName,
          userImage,
          expiration: tokenExpDate,
        })
      );
    }
  }, [
    token,
    userId,
    userName,
    userImage,
    tokenExpDate,
  ]);

  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime =
        tokenExpDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpDate]);

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem('userData')
    );

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.userName,
        storedData.userImage,
        storedData.token
      );
    }
  }, [login]);

  return {
    token,
    userId,
    userName,
    userImage,
    login,
    logout,
  };
};
