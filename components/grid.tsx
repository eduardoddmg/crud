import { DataTable } from './data-table';
import { useFetch } from '@/hooks/use-fetch';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface Column {
  id: string;
  header: string;
  accessor?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row?: (row: any, refresh: () => void) => JSX.Element;
}

interface GridProps {
  route: string;
  columns: Column[];
}

export const Grid: React.FC<GridProps> = ({ route, columns }) => {
  const [search, setSearch] = useState<string>('');
  const { debouncedValue, loading: debounceLoading } = useDebounce(search, 500);

  const { data, loading, fetchData } = useFetch(route);

  useEffect(() => {
    console.log('Valor do input (debounced):', debouncedValue);
    fetchData(debouncedValue);
  }, [debouncedValue, fetchData]);

  const enhancedColumns = columns.map((column) => ({
    ...column,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: column.row ? (row: any) => column.row?.(row, fetchData) : undefined,
  }));

  return (
    <div className="space-y-5">
      {data && data.length > 0 && (
        <div className="flex items-center space-x-3">
          <Input
            placeholder="Faça uma busca"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            loading={debounceLoading}
            disabled={data === null || data?.length === 0}
          />
          <Button onClick={() => setSearch('')}>Limpar</Button>
        </div>
      )}
      <DataTable
        columns={enhancedColumns}
        data={data || []}
        loading={loading}
      />
    </div>
  );
};
