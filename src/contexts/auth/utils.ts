import { User } from '@mytypes/user';

const localStoragetKey = '@magichat';

interface LoadUserAndTokenReturn {
  user: User | null;
  token: string | null;
}

export const authStorageHelper = {
  saveUserAndToken(userToSave: User, token: string) {
    localStorage.setItem(`${localStoragetKey}:token`, token);
    localStorage.setItem(`${localStoragetKey}:user`, JSON.stringify(userToSave));
  },

  loadUserAndToken(): LoadUserAndTokenReturn {
    const storagedUser = localStorage.getItem(`${localStoragetKey}:user`);
    const storagedToken = localStorage.getItem(`${localStoragetKey}:token`);

    return {
      user: JSON.parse(storagedUser),
      token: storagedToken,
    };
  },
};
