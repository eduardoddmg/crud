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
import { useAuth } from '@/context/auth-context';

const FormSchema = z.object({
  username: z.string().min(4, {
    message: 'Por favor, digite um e-mail válido.',
  }),
  password: z.string().min(8, {
    message: 'A senha deve ter 8 caracteres.',
  }),
});

export default function Login() {
  const { login } = useAuth();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { username, password } = data;
    await login(username, password);
  }

  return (
    <Card className="w-[500px] mx-auto my-20">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Adicione as suas credenciais e realize o login no sistema.
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
          <Link href="/register">Criar uma conta</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
