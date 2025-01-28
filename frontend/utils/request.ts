import axios from 'axios';
const base_url = 'http://localhost:8080/api';

export const api = axios.create({ baseURL: base_url });

export const requestFetch = async (
  url?: string,
  method: string = 'get',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any = null,
  token?: string
) => {
  try {
    const response = await api({
      method,
      url: url,
      data,
      headers: {
        'x-auth-token': token,
      },
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response.data;
    } else {
      throw err;
    }
  }
};
