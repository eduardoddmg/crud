import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loading } from './loading';
import { requestFetch } from '@/utils/request';

interface Column<T> {
  header: string;
  accessor?: keyof T;
  row?: (data: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  route: string;
}

export const DataTableFetch = <T,>({ route, columns }: DataTableProps<T>) => {
  const [data, setData] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await requestFetch(route);
    setData(response.data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <p>Nenhum dado encontrado</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((rowData, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex}>
                {column.row
                  ? column.row(rowData)
                  : column.accessor
                  ? (rowData[column.accessor] as React.ReactNode) ||
                    String(rowData[column.accessor])
                  : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
