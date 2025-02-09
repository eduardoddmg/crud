import { TiptapEditor } from '@/components/TiptapEditor';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { editTopic, getOneTopic } from './actions';
import { toast } from '@/hooks/use-toast';
import { Loading } from '@/components/loading';

export const TopicContent = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState<string>();
  const [loading, setLoading] = useState(true);

  const onSubmit = () => {
    editTopic(id, { content });
    toast({
      title: 'Tópico atualizado com sucesso!',
      className: 'bg-green-500 text-white',
    });
  };

  const fetchData = async () => {
    setLoading(true);

    const result = await getOneTopic(id);
    setTopic(result.description);
    setContent(result.content);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="p-6 space-y-5">
      <h2 className="text-4xl">Adicione conteúdo ao tópico - {topic}</h2>
      <TiptapEditor content={content} setContent={setContent} />
      <Button variant="default" onClick={onSubmit}>
        Salvar
      </Button>
    </main>
  );
};
