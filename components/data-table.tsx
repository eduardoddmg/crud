'use client';

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
import { Button } from './ui/button';
import { Pen, Archive } from 'lucide-react';
import Link from 'next/link';
import { requestFetch } from '@/utils/request';

interface Column<T> {
  header: string;
  accessor?: keyof T;
  row?: ((data: T) => React.ReactNode) | string;
}

interface DataTableProps<T> {
  data: T[] | null;
  columns: Column<T>[] | null;
  loading: boolean;
  fetchData?: () => void;
}

export const DataTable = <T,>({
  loading = true,
  data,
  columns,
  fetchData,
}: DataTableProps<T>) => {
  const handleDelete = async (module: string, id: string | number) => {
    try {
      await requestFetch(`/${module}/${id}`, 'delete'); // Executa o DELETE
      if (fetchData) fetchData(); // Atualiza os dados na tabela
    } catch (error) {
      console.error('Erro ao excluir:', error); // Loga o erro
    }
  };

  const handleDefaultAction = (
    action: string,
    module: string,
    id: string | number
  ) => {
    switch (action) {
      case 'editar':
        return (
          <Link href={`/${module}/editar/${id}`}>
            <Button>
              <Pen />
            </Button>
          </Link>
        );
      case 'arquivar':
        return (
          <Button onClick={() => handleDelete(module, id)}>
            <Archive />
          </Button>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (data?.length === 0) {
    return <p>Nenhum dado encontrado</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns?.map((column, index) => (
            <TableHead key={index}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((rowData, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns?.map((column, colIndex) => (
              <TableCell key={colIndex}>
                {typeof column.row === 'function'
                  ? column.row(rowData)
                  : typeof column.row === 'string'
                  ? handleDefaultAction(
                      String(column.row).split(' ')[0],
                      String(column.row).split(' ')[1] +
                        '/' +
                        String(column.accessor).split('_')[1],
                      column.accessor
                        ? (rowData[column.accessor] as string | number)
                        : ''
                    )
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
