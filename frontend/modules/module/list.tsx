/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Plus, File } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { getModulesBySubject, removeModule } from './actions';
import { ModuleDrawer } from './drawer';
import { DeleteDrawer } from '@/components/delete-drawer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getOneSubject } from '../subject/actions';

export const ModuleList = () => {
  const { id: idSubjectParam } = useParams();
  const idSubject = Array.isArray(idSubjectParam)
    ? idSubjectParam[0]
    : idSubjectParam;
  const [subject, setSubject] = useState<any | null>(null);

  const fetchSubject = async () => {
    setLoading(true);
    const result = await getOneSubject(idSubject);
    setSubject(result);
    setLoading(false);
  };

  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<{
    id_module?: string;
    description?: string;
  } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const modules = await getModulesBySubject(idSubject);
    setData(modules);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchSubject();
  }, []);

  const handleEdit = (module: { id_module: string; description: string }) => {
    setSelectedModule(module);
    setDrawerOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedModule?.id_module) {
      await removeModule(selectedModule.id_module);
      fetchData();
    }
    setDeleteOpen(false);
  };

  const handleDelete = (module: { id_module: string }) => {
    setSelectedModule(module);
    setDeleteOpen(true);
  };

  const handleAdd = () => {
    setSelectedModule(null);
    setDrawerOpen(true);
  };

  const columns = [
    {
      header: 'Ver',
      accessor: 'id_module',
      row: (row: any) => (
        <Link href={`/module/${row.id_module}`}>
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
      accessor: 'id_module',
      row: (row: any) => (
        <Button onClick={() => handleEdit(row)} variant="ghost" size="icon">
          <Edit />
        </Button>
      ),
    },
    {
      header: 'Apagar',
      accessor: 'id_module',
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
        <h2 className="text-lg font-semibold">
          Módulo - {subject?.description}
        </h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2" /> Adicionar módulo
        </Button>
      </div>

      <ModuleDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        defaultValues={selectedModule}
        fetchData={fetchData}
        idSubject={idSubject}
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
