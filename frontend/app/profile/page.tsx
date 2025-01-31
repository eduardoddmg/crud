import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Page = () => {
  return (
    <div className="space-y-5">
      <h1>Perfil</h1>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="dados-pessoais">Dados pessoais</TabsTrigger>
          <TabsTrigger value="seguranca-privacidade">
            Segurança e privacidade
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dados-pessoais">
          Corrija os seus dados pessoais aqui.
        </TabsContent>
        <TabsContent value="seguranca-privacidade">
          Mude suas informações confidenciais.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
