import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

const FormSchema = z.object({
  description: z.string().min(1, 'A descrição é obrigatória'),
});

interface SubjectFormProps {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  defaultValues?: Partial<z.infer<typeof FormSchema>>;
}

export const SubjectForm: React.FC<SubjectFormProps> = ({
  onSubmit,
  defaultValues = {},
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          isLoading={form.formState.isSubmitting}
          variant="default"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
};
