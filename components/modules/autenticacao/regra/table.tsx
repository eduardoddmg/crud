'use client';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { LucidePlus, RefreshCcwIcon } from 'lucide-react';
import Link from 'next/link';
import { useFetch } from '@/hooks/use-fetch';

export const AutenticacaoRegraTable = () => {
  const { data, fetchData, loading } = useFetch('/autenticacao/regra');
  const { data: columns, loading: loadingColumns } = useFetch(
    '/autenticacao/controller/8/coluna'
  );

  return (
    <div className="space-y-5">
      <h1 className="text-lg">Regras</h1>
      <div className="flex gap-5">
        <Link href="/autenticacao/regra/adicionar">
          <Button>
            <LucidePlus /> Adicionar regra
          </Button>
        </Link>
        <Button onClick={fetchData}>
          <RefreshCcwIcon />
          Atualizar
        </Button>
      </div>
      <DataTable
        loading={loading || loadingColumns}
        data={data}
        columns={columns}
      />
    </div>
  );
};
