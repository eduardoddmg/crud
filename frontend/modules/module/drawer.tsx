import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ModuleForm } from './form';
import { editModule, saveModule } from './actions';

interface ModuleDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValues?: { id_module?: string; description?: string };
  fetchData: () => void;
  id: string;
}

export const ModuleDrawer: React.FC<ModuleDrawerProps> = ({
  open,
  setOpen,
  defaultValues,
  fetchData,
  idSubject,
}) => {
  const handleSubmit = async (data: { description: string }) => {
    data.id_subject = idSubject;
    if (defaultValues?.id_module) {
      await editModule(defaultValues.id_module, data);
    } else {
      await saveModule(data);
    }
    fetchData();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {defaultValues?.id_module ? 'Editar Módulo' : 'Adicionar Módulo'}
          </DialogTitle>
          <DialogDescription>
            Preencha o formulário e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <ModuleForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
};
