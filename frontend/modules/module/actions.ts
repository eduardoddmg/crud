/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase';

export const saveModule = async (data: { [key: string]: any }) => {
  await supabase.from('modules').insert(data);
};

export const removeModule = async (id: string) => {
  await supabase.from('modules').delete().eq('id_module', id);
};

export const getAllModules = async () => {
  const { data } = await supabase
    .from('modules')
    .select('*')
    .order('created_at');
  return data;
};

export const getModulesBySubject = async (id: string) => {
  const { data } = await supabase
    .from('modules')
    .select('*')
    .eq('id_subject', id)
    .order('created_at');
  return data;
};

export const getOneModule = async (id: string) => {
  const { data } = await supabase
    .from('modules')
    .select('*')
    .eq('id_module', id);
  return data?.[0];
};

export const editModule = async (id: string, data: { [key: string]: any }) => {
  await supabase.from('modules').update(data).eq('id_module', id);
};
