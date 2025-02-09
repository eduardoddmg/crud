/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Plus, File } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { getAllSubjects, removeSubject } from './actions';
import { SubjectDrawer } from './drawer';
import { DeleteDrawer } from '@/components/delete-drawer';
import Link from 'next/link';

export const SubjectList = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<{
    id_subject?: string;
    description?: string;
  } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const subjects = await getAllSubjects();
    setData(subjects);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (subject: { id_subject: string; description: string }) => {
    setSelectedSubject(subject);
    setDrawerOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSubject?.id_subject) {
      await removeSubject(selectedSubject.id_subject);
      fetchData();
    }
    setDeleteOpen(false);
  };

  const handleDelete = (subject: { id_subject: string }) => {
    setSelectedSubject(subject);
    setDeleteOpen(true);
  };

  const handleAdd = () => {
    setSelectedSubject(null);
    setDrawerOpen(true);
  };

  const columns = [
    {
      header: 'Ver',
      accessor: 'id_subject',
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
      header: 'Editar',
      accessor: 'id_subject',
      row: (row: any) => (
        <Button onClick={() => handleEdit(row)} variant="ghost" size="icon">
          <Edit />
        </Button>
      ),
    },
    {
      header: 'Apagar',
      accessor: 'id_subject',
      row: (row: any) => (
        <Button onClick={() => handleDelete(row)} variant="ghost" size="icon">
          <Trash />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Disciplinas</h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2" /> Adicionar Disciplina
        </Button>
      </div>

      <SubjectDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        defaultValues={selectedSubject}
        fetchData={fetchData}
      />
      <DeleteDrawer
        open={deleteOpen}
        setOpen={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
      />

      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
};
