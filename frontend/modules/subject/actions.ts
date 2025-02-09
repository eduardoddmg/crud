/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase';

export const saveSubject = async (data: { [key: string]: any }) => {
  await supabase.from('subjects').insert(data);
};

export const removeSubject = async (id: string) => {
  await supabase.from('subjects').delete().eq('id_subject', id);
};

export const getAllSubjects = async () => {
  const { data } = await supabase
    .from('subjects')
    .select('*')
    .order('created_at');
  return data;
};

export const getOneSubject = async (id: string) => {
  const { data } = await supabase
    .from('subjects')
    .select('*')
    .eq('id_subject', id);
  return data?.[0];
};

export const editSubject = async (id: string, data: { [key: string]: any }) => {
  await supabase.from('subjects').update(data).eq('id_subject', id);
};
