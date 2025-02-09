/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Plus, File } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { getTopicsByModule, removeTopic } from './actions';
import { TopicDrawer } from './drawer';
import { DeleteDrawer } from '@/components/delete-drawer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getOneModule } from '../module/actions';

export const TopicList = () => {
  const { id: idModuleParam } = useParams();
  const idModule = Array.isArray(idModuleParam)
    ? idModuleParam[0]
    : idModuleParam;
  const [subject, setSubject] = useState<any | null>(null);

  const fetchSubject = async () => {
    setLoading(true);
    const result = await getOneModule(idModule);
    setSubject(result);
    setLoading(false);
  };

  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<{
    id_topic?: string;
    description?: string;
  } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const topics = await getTopicsByModule(idModule);
    setData(topics);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchSubject();
  }, []);

  const handleEdit = (topic: { id_topic: string; description: string }) => {
    setSelectedTopic(topic);
    setDrawerOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedTopic?.id_topic) {
      await removeTopic(selectedTopic.id_topic);
      fetchData();
    }
    setDeleteOpen(false);
  };

  const handleDelete = (topic: { id_topic: string }) => {
    setSelectedTopic(topic);
    setDeleteOpen(true);
  };

  const handleAdd = () => {
    setSelectedTopic(null);
    setDrawerOpen(true);
  };

  const columns = [
    {
      header: 'Ver',
      accessor: 'id_topic',
      row: (row: any) => (
        <Link href={`/topic/${row.id_topic}`}>
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
      accessor: 'id_topic',
      row: (row: any) => (
        <Button onClick={() => handleEdit(row)} variant="ghost" size="icon">
          <Edit />
        </Button>
      ),
    },
    {
      header: 'Apagar',
      accessor: 'id_topic',
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
          <Plus className="mr-2" /> Adicionar tópico
        </Button>
      </div>

      <TopicDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        defaultValues={selectedTopic}
        fetchData={fetchData}
        idModule={idModule}
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
