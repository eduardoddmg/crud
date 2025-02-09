import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteDrawer: React.FC<DeleteDrawerProps> = ({
  open,
  setOpen,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px] text-center">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja remover?</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 mt-4">
          <Button variant="destructive" onClick={onConfirm}>
            Excluir
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
