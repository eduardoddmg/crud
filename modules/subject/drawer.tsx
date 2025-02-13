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
import subjects from '@/mock/subjects.json';
import useLocalStorage from '@/hooks/use-local-storage';

export const SubjectDrawer: React.FC = () => {
  const { open, setOpen, id, setId } = useSubjectStore();
  const { add } = useLocalStorage("subjects");

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

  const defaultValues = subjects.find((subject) => subject.id_subject == id);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues?.id_subject
              ? 'Editar Disciplina'
              : 'Adicionar Disciplina'}
          </DialogTitle>
          <DialogDescription>
            Preencha o formulário e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <SubjectForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
};
