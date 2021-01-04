import { DefaultRequestError } from '@mytypes/request';

import api from '@services/api';

export async function postRequest<T = any, E = DefaultRequestError>(url: string, requestData: any) {
  try {
    const response = await api.post<T>(url, requestData);
    const { data, status } = response;

    return {
      data,
      status,
    };
  } catch (e) {
    const error = e.response.data as E;

    return {
      error,
    };
  }
}
