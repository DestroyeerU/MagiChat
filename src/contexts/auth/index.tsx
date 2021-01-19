import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { DefaultRequestError } from '@mytypes/request';
import { User } from '@mytypes/user';
import { useRouter } from 'next/dist/client/router';

import { saveApiDefaultAuthorization } from '@services/api';

import { postRequest } from '@utils/request';

import { authStorageHelper } from './utils';

interface SignInData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface SignInReturn {
  data?: LoginResponse;
  status?: number;
  error?: DefaultRequestError;
}

type AuthListener = () => void;

interface AuthContextData {
  user: User;
  signed: boolean;
  loadingSignIn: boolean;

  signIn(data: SignInData): Promise<SignInReturn>;
  signOut(): void;
  addSignOutListener: (listener: AuthListener) => void;
  removeSignOutListener: (listener: AuthListener) => void;
}

function useListener<T = any>() {
  const listeners = useRef([] as T[]);

  const addListener = useCallback((listener: T) => {
    listeners.current.push(listener);
  }, []);

  const removeListener = useCallback((listener: T) => {
    const listenersUpdated = listeners.current.filter((currentListener) => currentListener !== listener);
    listeners.current = listenersUpdated;
  }, []);

  return {
    listeners: listeners.current,
    addListener,
    removeListener,
  };
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const signOutListener = useListener<AuthListener>();

  const [user, setUser] = useState({} as User);
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [signed, setSigned] = useState(false);

  const signIn = useCallback(async (signInData: SignInData) => {
    setLoadingSignIn(true);

    const { email, password } = signInData;

    const { data, error, status } = await postRequest<LoginResponse>('/login', {
      email,
      password,
    });

    if (status === 200) {
      authStorageHelper.saveUserAndToken(data.user, data.token);
      saveApiDefaultAuthorization(data.token);

      setUser(data.user);
      setSigned(true);
    }

    setLoadingSignIn(false);

    return { data, error, status };
  }, []);

  const signOut = useCallback(() => {
    signOutListener.listeners.forEach((listener) => {
      listener();
    });

    localStorage.clear();

    setUser({} as User);
    setSigned(false);
  }, [signOutListener.listeners]);

  useEffect(() => {
    const { user: userStoraged, token } = authStorageHelper.loadUserAndToken();

    if (userStoraged && token) {
      saveApiDefaultAuthorization(token);

      setUser(userStoraged);
      setSigned(true);
      router.push('/home', undefined, { shallow: false });
    }
    // next bug, always re-rendering the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo<AuthContextData>(() => {
    return {
      user,
      signed,
      loadingSignIn,

      signIn,
      signOut,
      addSignOutListener: signOutListener.addListener,
      removeSignOutListener: signOutListener.removeListener,
    };
  }, [loadingSignIn, signIn, signOut, signOutListener.addListener, signOutListener.removeListener, signed, user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
