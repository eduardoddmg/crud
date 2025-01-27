import { DataTable } from './data-table';
import { useFetch } from '@/hooks/use-fetch';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { Input } from './ui/input';

export const Grid = ({ route, columns }) => {
  const [search, setSearch] = useState('');
  const { debouncedValue, loading: debounceLoading } = useDebounce(
    search,
    2000
  ); // Obtém o loading do debounce

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
      <div>
        <Input
          placeholder="Faça uma busca"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Atualiza o estado do input
          loading={debounceLoading}
        />
      </div>
      <DataTable columns={enhancedColumns} data={data} loading={loading} />;
    </div>
  );
};
