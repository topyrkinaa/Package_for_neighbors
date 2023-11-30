import { z } from 'zod';
import MessagesRegister from './register.messages';

const zodNameValidation = (name: string) => z
  .string()
  .min(1, { message: MessagesRegister.errors.required })
  .regex(
    new RegExp(MessagesRegister.const.regex),
    { message: MessagesRegister.errors.correctFormat(name) }
  )
  .max(100);

export default zodNameValidation;