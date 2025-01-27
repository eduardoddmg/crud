'use client';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useFetch } from '@/hooks/use-fetch';
import { LucidePlus, RefreshCcwIcon } from 'lucide-react';
import Link from 'next/link';

export const AutenticacaoControllerTable = () => {
  const { data, fetchData, loading } = useFetch('/autenticacao/controller');
  const { data: columns, loading: loadingColumns } = useFetch(
    '/autenticacao/controller/6/coluna'
  );

  return (
    <div className="space-y-5">
      <h1 className="text-lg">Controllers</h1>
      <div className="flex gap-5">
        <Link href="/autenticacao/controller/adicionar">
          <Button>
            <LucidePlus /> Adicionar controller
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
        fetchData={fetchData}
      />
    </div>
  );
};
