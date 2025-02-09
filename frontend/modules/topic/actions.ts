/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase';

export const saveTopic = async (data: { [key: string]: any }) => {
  await supabase.from('topics').insert(data);
};

export const removeTopic = async (id: string) => {
  await supabase.from('topics').delete().eq('id_topic', id);
};

export const getAllTopics = async () => {
  const { data } = await supabase
    .from('topics')
    .select('*')
    .order('created_at');
  return data;
};

export const getTopicsByModule = async (id: string) => {
  const { data } = await supabase
    .from('topics')
    .select('*')
    .eq('id_module', id)
    .order('created_at');
  return data;
};

export const getOneTopic = async (id: string) => {
  const { data } = await supabase.from('topics').select('*').eq('id_topic', id);
  return data?.[0];
};

export const editTopic = async (id: string, data: { [key: string]: any }) => {
  await supabase.from('topics').update(data).eq('id_topic', id);
};
