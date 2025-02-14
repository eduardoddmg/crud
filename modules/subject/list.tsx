import { Button } from "@/components/ui/button";
import { File, Pen, RefreshCcw, Trash } from "lucide-react";
import { DataTable } from "@/components/data-table";
import Link from "next/link";
import useLocalStorage from "@/hooks/use-local-storage";

export const SubjectList = () => {
  const {
    data: subjects,
    loading,
    fetchData,
    remove,
  } = useLocalStorage("subjects", []);

  const columns = [
    {
      header: "Ver",
      accessor: "id",
      width: "5%",
      row: (row: any) => (
        <Link href={`/subject/${row.id}`}>
          <Button variant="ghost" size="icon">
            <File />
          </Button>
        </Link>
      ),
    },
    {
      header: "DESCRIÇÃO",
      accessor: "description",
    },
    {
      header: "",
      width: "5%",
      row: (row: any) => (
        <div className="flex justify-end">
          <Link href={`/subject/editar/${row.id}`}>
          <Button
            variant="ghost"
            size="icon"
            >
            <Pen />
          </Button>
            </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              remove(row.id);
            }}
          >
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
          <Button size="sm" onClick={fetchData}>
            <RefreshCcw /> Atualizar
          </Button>
          <Link href="/subject/adicionar">
          <Button size="sm" variant="default">
            Adicionar Disciplina
          </Button>
          </Link>
        </div>
      </div>

      <DataTable columns={columns} data={subjects} loading={loading} />
    </div>
  );
};
