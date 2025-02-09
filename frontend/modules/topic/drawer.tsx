import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TopicForm } from './form';
import { editTopic, saveTopic } from './actions';

interface TopicDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValues?: { id_topic?: string; description?: string };
  fetchData: () => void;
  idModule: string;
}

export const TopicDrawer: React.FC<TopicDrawerProps> = ({
  open,
  setOpen,
  defaultValues,
  fetchData,
  idModule,
}) => {
  const handleSubmit = async (data: {
    description: string;
    id_module: string;
  }) => {
    data.id_module = idModule;
    if (defaultValues?.id_topic) {
      await editTopic(defaultValues.id_topic, data);
    } else {
      await saveTopic(data);
    }
    fetchData();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {defaultValues?.id_topic ? 'Editar Tópico' : 'Adicionar Tópico'}
          </DialogTitle>
          <DialogDescription>
            Preencha o formulário e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <TopicForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
};
