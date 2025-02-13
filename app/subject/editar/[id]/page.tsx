"use client";

import { BreadcrumbComp } from "@/components/breadcrumb";
import useLocalStorage, { ItemType } from "@/hooks/use-local-storage";
import { toast } from "@/hooks/use-toast";
import { SubjectForm } from "@/modules/subject/form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { update, getOne } = useLocalStorage("subjects");

  const [subject, setSubject] = useState<ItemType | null>(null);

  const { id } = useParams();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    update(id, data);
    router.push("/subject");
    toast({
        title: "Sucesso",
        description: "Item editado com sucesso!"
    })
  };

  const fetchData = () => {
    const res = getOne(id);
    setSubject(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-5">
      <BreadcrumbComp items={[
        {name: "Disciplina", href: "/subject"},
        {name: 'Editar'}
      ]} />
      <h2 className="text-lg">Editar</h2>
      {subject && <SubjectForm onSubmit={onSubmit} defaultValues={{ description: subject.description || ""}} />}
    </div>
  );
};

export default Page;
