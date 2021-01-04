import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { DefaultRequestError } from '@mytypes/request';
import { User } from '@mytypes/user';

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

interface AuthContextData {
  user: User;
  signed: boolean;
  loadingSignIn: boolean;

  signIn(data: SignInData): Promise<SignInReturn>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }) => {
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
    setUser({} as User);
    setSigned(false);

    localStorage.clear();
  }, []);

  useEffect(() => {
    const { user: userStoraged, token } = authStorageHelper.loadUserAndToken();

    if (userStoraged && token) {
      saveApiDefaultAuthorization(token);

      setUser(userStoraged);
      setSigned(true);
    }
  }, []);

  const contextValue = useMemo<AuthContextData>(() => {
    return {
      user,
      signed,
      loadingSignIn,

      signIn,
      signOut,
    };
  }, [loadingSignIn, signIn, signOut, signed, user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
