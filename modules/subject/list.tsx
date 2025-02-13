/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { File, Pen, RefreshCcw, Trash } from "lucide-react";
import { DataTable } from "@/components/data-table";
import Link from "next/link";
import { SubjectDrawer } from "./drawer";
import { useSubjectStore } from "./context";
import useLocalStorage from "@/hooks/use-local-storage";
import { Suspense } from "react";

export const SubjectList = () => {
  const { setOpen, setId } = useSubjectStore();
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setOpen(true);
              setId(row.id);
            }}
          >
            <Pen />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              remove(row.id);
              fetchData();
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
          <Button size="sm" variant="default" onClick={() => setOpen(true)}>
            Adicionar Disciplina
          </Button>
        </div>
      </div>

      {!loading && (
        <DataTable columns={columns} data={subjects} loading={false} />
      )}
      <SubjectDrawer />
    </div>
  );
};
