import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router';

export const AppContext = createContext();

let setKey = (key, value) => {
  localStorage.setItem('aiportal:' + key, JSON.stringify(value));
};

let getKey = (key) => {
  return JSON.parse(localStorage.getItem('aiportal:' + key));
};

export function AppEnv({ children }) {
  let [user, _setUser] = useState(getKey('user'));
  let setUser = (user) => {
    setKey('user', user);
    _setUser(user);
  };
  let logout = () => {
    setUser(null);
    setKey('token', '');
  };
  let history = useHistory();
  console.log(history);
  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        setKey: setKey,
        getKey: getKey,
        logout: logout,
        goTo: (path) => history.push(path),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppEnv = () => useContext(AppContext);
