import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SubjectForm } from './form';
import { editSubject, saveSubject } from './actions';

interface SubjectDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValues?: { id_subject?: string; description?: string };
  fetchData: () => void;
}

export const SubjectDrawer: React.FC<SubjectDrawerProps> = ({
  open,
  setOpen,
  defaultValues,
  fetchData,
}) => {
  const handleSubmit = async (data: { description: string }) => {
    if (defaultValues?.id_subject) {
      await editSubject(defaultValues.id_subject, data);
    } else {
      await saveSubject(data);
    }
    fetchData();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
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
