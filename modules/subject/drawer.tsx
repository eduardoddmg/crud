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
import { useSubjectStore } from './contex';

interface SubjectDrawerProps {
  defaultValues?: { id_subject?: string; description?: string };
}

export const SubjectDrawer: React.FC<SubjectDrawerProps> = ({
  defaultValues,
}) => {
  const { open, setOpen, setId } = useSubjectStore();

  const handleSubmit = async (data: any) => {
    console.log(data);
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
