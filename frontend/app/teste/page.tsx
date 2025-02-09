'use client';

import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';

export default function UsersList() {
  useEffect(() => {
    async function fetchUsers() {
      const data = await supabase.from('subjects').select('*');
      console.log(data);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
    </div>
  );
}
