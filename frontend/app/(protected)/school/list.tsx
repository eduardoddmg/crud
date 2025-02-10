import { DataTable } from '@/components/data-table';
import schools from "@/mock/school.json";

export const SchoolList = () => {

  const columns = [
    {
      header: 'NOME',
      accessor: 'name',
    },
    {
      header: 'Nível de educação',
      accessor: 'education_level',
    },
  ];

  return <DataTable columns={columns} data={schools} loading={false} />;
};