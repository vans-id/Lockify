import {
  useState,
  useEffect,
  useCallback,
} from 'react';
let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  const [tokenExpDate, setTokenExpDate] = useState();

  const login = useCallback(
    (
      uid,
      username,
      imageUrl,
      token,
      expirationDate
    ) => {
      setToken(token);
      setUserId(uid);
      setUserName(username);
      setUserImage(imageUrl);

      const tokenExp =
        expirationDate ||
        new Date(
          new Date().getTime() + 1000 * 60 * 60
        );
      setTokenExpDate(tokenExp);

      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: uid,
          token,
          userName: username,
          userImage: imageUrl,
          expiration: tokenExp.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    setUserImage(null);
    setTokenExpDate(null);
    localStorage.removeItem('userData');
  }, []);

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
