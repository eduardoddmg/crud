'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

const formSchema = z.object({
  descricao: z.string().min(2, {
    message: 'Descrição é obrigatório',
  }),
});

interface FormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: z.infer<typeof formSchema>;
}

export const AutenticacaoRegraForm = ({
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
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
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
