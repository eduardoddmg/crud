/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SubjectForm } from './form';
import { useSubjectStore } from './context';
import useLocalStorage, { ItemType } from '@/hooks/use-local-storage';

export const SubjectDrawer: React.FC = () => {
  const { open, setOpen, id, setId } = useSubjectStore();
  const { add, getOne } = useLocalStorage("subjects");

  const [subject, setSubject] = React.useState<ItemType | null>(null);

  const fetchData = () => {
    const response = getOne(id);
    setSubject(response);
  }

  const handleSubmit = async (data: any) => {
    add(data);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setId(''); // Limpa o ID ao fechar o modal
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {subject?.id
              ? 'Editar Disciplina'
              : 'Adicionar Disciplina'}
          </DialogTitle>
          <DialogDescription>
            Preencha o formulário e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <SubjectForm onSubmit={handleSubmit} defaultValues={subject} />
      </DialogContent>
    </Dialog>
  );
};
