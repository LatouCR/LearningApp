'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

import useSupabaseClient from '@/lib/supabase/client';
import { signInWithEmailAndPassword } from '../../auth/_actions';

import { LoginUserInput, loginUserSchema } from '@/lib/user-schema';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


export default function StudentForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [error, setError] = useState('');
    const [isPending, startTransition] = useTransition();
    const supabase = useSupabaseClient();

    const methods = useForm<LoginUserInput>({
        resolver: zodResolver(loginUserSchema),
    });

    const {
        reset,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
        startTransition(async () => {
            const result = await signInWithEmailAndPassword(values);

            const { error } = JSON.parse(result);
            if (error?.message) {
                setError(error.message);
                console.log('Error message', error.message);
                toast({
                    title: "Error al iniciar sesion",
                    variant: "destructive",
                  })
                reset({ password: '' });
                return;
            }

            setError('');
            toast({
                title: "Inicio de sesion exitoso",
                variant: "success",
              })
            router.push('/dashboard');
        });
    };

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='w-full h-96'>
                <div className='bg-white w-[calc(100%-40px)] max-w-md h-full mx-auto'>
                    <div className='flex justify-center items-center flex-col p-11'>

                        <div className='w-full'>
                            <Image
                                src='/logo_ulacit.png'
                                alt=''
                                width={116}
                                height={36} />
                            <h1 className='text-xl font-bold py-2'>Iniciar Sesion</h1>
                        </div>

                        <div className='flex items-center justify-start w-full'>

                            <Form {...methods}>
                                <form onSubmit={handleSubmit(onSubmitHandler)}
                                    className='w-full'>
                                    <FormField
                                        control={methods.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Email</FormLabel>
                                                <FormControl className="w-full">
                                                    <Input
                                                        className="bg-white border-b border-black border-none w-full"
                                                        placeholder="usuario@ulacit.ed.cr"
                                                        {...field}
                                                        onChange={field.onChange} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={methods.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem className=''>
                                                <FormLabel>Contraseña</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        className="bg-white border-b border-black border-none w-full"
                                                        placeholder="Password"
                                                        {...field}
                                                        onChange={field.onChange} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <div className='w-full flex float-left my-9'>
                                        <div className='text-white gap-3 flex justify-between'>
                                            <Link href='/logIn'
                                                className='p-2 bg-slate-400 hover:bg-slate-500 rounded-none h-9 w-28 flex justify-center items-center'>
                                                <p className='text-white font-normal text-sm'>Volver</p>
                                            </Link>
                                            <Button
                                                className='p-2 bg-blue-700 hover:bg-blue-500 rounded-none h-9 w-28 font-light text-sm'
                                                type='submit'
                                            >
                                                Iniciar Sesion
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
