'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useEffect } from 'react';
import { SelectFetch } from '@/components/select-fetch';

const formSchema = z.object({
  id_regra: z.string(),
  id_acao: z.string(),
  id_controller: z.string(),
});

interface FormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: z.infer<typeof formSchema>;
}

export const AutenticacaoRegraAcaoForm = ({
  onSubmit,
  defaultValues,
}: FormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  // Atualiza os valores padrão sempre que `defaultValues` mudar
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id_regra"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regra</FormLabel>
              <SelectFetch
                field={field}
                accessorId="id_regra"
                accessorItem="descricao"
                placeholder="Selecione uma regra"
                route="/autenticacao/regra"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_controller"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Controller</FormLabel>
              <SelectFetch
                field={field}
                accessorId="id_controller"
                accessorItem="descricao_geral"
                placeholder="Selecione um controller"
                route="/autenticacao/controller"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_acao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ação</FormLabel>
              <SelectFetch
                field={field}
                accessorId="id_acao"
                accessorItem="descricao"
                placeholder="Selecione uma ação"
                route="/autenticacao/acao"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" isLoading={form.formState.isSubmitting}>
          Enviar
        </Button>
      </form>
    </Form>
  );
};
