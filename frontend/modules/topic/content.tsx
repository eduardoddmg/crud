import { TiptapEditor } from '@/components/TiptapEditor';

export const TopicContent = () => {
  return (
    <main className="p-6 space-y-5">
      <h2 className="text-4xl">Adicione conteúdo ao tópico</h2>
      <TiptapEditor />
    </main>
  );
};
