import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  name: string({ required_error: 'Name is required' }).min(
    1,
    'Name is required'
  ),
  email: string({ required_error: 'Email no valido' })
    .min(1, 'El correo es necesario')
    .email('Email invalido'),
  photo: string().optional(),
  password: string({ required_error: 'Contraseña no valida' })
    .min(1, 'La contraseña es necesaria')
    .min(8, 'La contraseña tiene que ser mayor a 8 caracteres')
    .max(16, 'La contraseña tiene que ser menor a 16 caracteres'),
});

export const loginUserSchema = object({
  email: string({ required_error: 'Email no valido' })
    .min(1, 'Email no valido')
    .email('Email o Correo invalido'),
  password: string({ required_error: 'Contraseña no valida' }).min(
    1,
    'Contraseña no valida'
  ),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
