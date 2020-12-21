/* eslint-disable no-shadow */
import useSWR, { ConfigInterface } from 'swr';

import api from '../../services/api';

export function useFetch<T = any, E = any>(url: string, config?: ConfigInterface<T, E>) {
  const { data, error, mutate } = useSWR<T, E>(
    url,
    async (url: string) => {
      const response = await api.get(url);

      return response.data;
    },
    config
  );

  return { data, error, mutate };
}
