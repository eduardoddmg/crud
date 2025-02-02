'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import Link from 'next/link';
import { api } from '@/utils/request';
import { toast } from '@/hooks/use-toast';

const FormSchema = z.object({
  username: z.string().min(4, {
    message: 'Por favor, digite um nome de usuário válido.',
  }),
  email: z.string().email({ message: 'Por favor, digite um e-mail válido.' }),
  password: z.string().min(8, {
    message: 'A senha deve ter no mínimo 8 caracteres.',
  }),
});

export default function Register() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { username, email, password } = data;
    api
      .post('/auth/register', { username, email, password })
      .then((response) => {
        const message = response.data.message;
        toast({
          title: 'Sucesso!',
          description: message,
          className: 'text-white bg-green-500',
        });
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Erro inesperado.';
        toast({
          title: 'Aconteceu algo de errado',
          description: message,
          className: 'text-white bg-red-500',
        });
      });
  }

  return (
    <Card className="w-[500px] mx-auto my-20">
      <CardHeader>
        <CardTitle>Registro</CardTitle>
        <CardDescription>
          Adicione suas credenciais e registre-se no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="w-full">
          <Link href="/login">Fazer login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
