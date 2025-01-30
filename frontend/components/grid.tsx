import { DataTable } from './data-table';
import { useFetch } from '@/hooks/use-fetch';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { Input } from './ui/input';
import { Button } from './ui/button';

export const Grid = ({ route, columns }) => {
  const [search, setSearch] = useState('');
  const { debouncedValue, loading: debounceLoading } = useDebounce(search, 500); // Obtém o loading do debounce

  // Log do valor debounced
  useEffect(() => {
    console.log('Valor do input (debounced):', debouncedValue);
    fetchData(debouncedValue);
  }, [debouncedValue]);

  const { data, loading, fetchData } = useFetch(route);

  // Passa `refresh` como prop para as colunas
  const enhancedColumns = columns.map((column) => ({
    ...column,
    row: column.row ? (row) => column.row(row, fetchData) : undefined,
  }));

  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-3">
        <Input
          placeholder="Faça uma busca"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Atualiza o estado do input
          loading={debounceLoading}
          disabled={data === null || data?.length === 0}
        />
        <Button onClick={() => setSearch('')}>Limpar</Button>
      </div>
      <DataTable columns={enhancedColumns} data={data} loading={loading} />
    </div>
  );
};
