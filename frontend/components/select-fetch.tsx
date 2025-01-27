import { FormControl } from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Loading } from './loading';
import { useFetch } from '@/hooks/use-fetch';

interface SelectFetchProps {
  field: { onChange: (value: string) => void; value: string };
  accessorId: string;
  accessorItem: string;
  placeholder: string;
  route: string;
}

export const SelectFetch = ({
  field,
  accessorId,
  accessorItem,
  placeholder,
  route,
}: SelectFetchProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, loading } = useFetch(route);

  if (loading) return <Loading />;

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {data?.map((item) => (
          <SelectItem
            key={item[accessorId]}
            value={item[accessorId].toString()}
          >
            {item[accessorItem]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
