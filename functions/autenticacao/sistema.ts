import { Sistema } from '@/types/autenticacao';
import { requestFetch } from '@/utils/request';

const getAll = async () => {
  const response = await requestFetch('/autenticacao/sistema');
  return response;
};

const remove = async (id: string) => {
  const response = await requestFetch(`/autenticacao/sistema/${id}`, 'delete');
  return response;
};

const create = async (data: Sistema) => {
  const response = await requestFetch('/autenticacao/sistema', 'post', data);
  return response;
};

const update = async (id: string, data: Sistema) => {
  const response = await requestFetch(
    `/autenticacao/sistema/${id}`,
    'put',
    data
  );
  return response;
};

export const AutenticacaoSistemaFunctions = { getAll, remove, create, update };
