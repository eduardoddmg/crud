/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { File, Pen, RefreshCcw, Trash } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import Link from 'next/link';
import subjects from '@/mock/subjects.json';
import { SubjectDrawer } from './drawer';
import { useSubjectStore } from './contex';

export const SubjectList = () => {
  const { setOpen, setId } = useSubjectStore();
  const columns = [
    {
      header: 'Ver',
      accessor: 'id_subject',
      width: '5%',
      row: (row: any) => (
        <Link href={`/subject/${row.id_subject}`}>
          <Button variant="ghost" size="icon">
            <File />
          </Button>
        </Link>
      ),
    },
    {
      header: 'DESCRIÇÃO',
      accessor: 'description',
    },
    {
      header: '',
      width: '5%',
      row: (row: any) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setOpen(true);
              setId(row.id_subject);
            }}
          >
            <Pen />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Disciplinas</h2>
        <div className="flex gap-5">
          <Button size="sm">
            <RefreshCcw /> Atualizar
          </Button>
          <Button size="sm" variant="default" onClick={() => setOpen(true)}>
            Adicionar Disciplina
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={subjects} loading={false} />
      <SubjectDrawer />
    </div>
  );
};
