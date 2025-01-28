'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

// Validação do formulário com Zod
const FormSchema = z.object({
  items: z
    .array(
      z.object({
        name: z.string().min(1, 'O nome é obrigatório'),
        description: z.string().min(1, 'A descrição é obrigatória'),
      })
    )
    .nonempty('Adicione pelo menos um item.'),
});

interface FormLoteProps {
  onSubmit: (data: { items: { name: string; description: string }[] }) => void;
}

export const ItemFormLote: React.FC<FormLoteProps> = ({ onSubmit }) => {
  const [rows, setRows] = useState([
    { name: '', description: '' },
    { name: '', description: '' },
    { name: '', description: '' },
  ]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: rows },
  });

  const addRow = () => {
    setRows((prevRows) => [...prevRows, { name: '', description: '' }]);
  };

  const removeRow = (index: number) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  React.useEffect(() => {
    form.setValue('items', rows); // Atualiza os valores no formulário quando as linhas mudam
  }, [rows, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Nome do item" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Descrição do item" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeRow(index)}
                  >
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center">
          <Button type="button" onClick={addRow} variant="outline">
            Adicionar Linha
          </Button>
          <Button
            type="submit"
            isLoading={form.formState.isSubmitting}
            variant="default"
          >
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
};
