"use client";

import { BreadcrumbComp } from "@/components/breadcrumb";
import useLocalStorage from "@/hooks/use-local-storage";
import { toast } from "@/hooks/use-toast";
import { SubjectForm } from "@/modules/subject/form";
import { useRouter } from "next/navigation";

const Page = () => {
  const { add } = useLocalStorage("subjects");
  const router = useRouter();
  const onSubmit = async (data: any) => {
    add(data);
    router.push("/subject");
    toast({
        title: "Sucesso",
        description: "Item adicionado com sucesso!"
    })
  };
  return (
    <div className="space-y-5">
      <BreadcrumbComp items={[
        {name: "Disciplina", href: "/subject"},
        {name: 'Adicionar'}
      ]} />
      <h2 className="text-lg">Adicionar</h2>
      <SubjectForm onSubmit={onSubmit} />
    </div>
  );
};

export default Page;
