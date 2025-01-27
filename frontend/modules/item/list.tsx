import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { useItemActions } from './actions';
import { Grid } from '@/components/grid';

export const ItemList = () => {
  const { removeItem } = useItemActions();

  const columns = [
    {
      header: 'NOME',
      accessor: 'name',
    },
    {
      header: 'DESCRIÇÃO',
      accessor: 'description',
    },
    {
      header: 'Editar',
      accessor: 'id',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      row: (row: any) => (
        <Link href={`/item/editar/${row.id}`}>
          <Button>
            <Edit />
          </Button>
        </Link>
      ),
    },
    {
      header: 'APAGAR',
      accessor: 'id',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      row: (row: any, fetchData: any) => (
        <Button
          onClick={async () => {
            await removeItem(row.id);
            fetchData();
          }}
        >
          <Trash />
        </Button>
      ),
    },
  ];

  return <Grid columns={columns} route="/items" />;
};
