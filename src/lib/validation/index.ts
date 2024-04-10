import * as z from "zod";

export const signupValidation = z.object({
 name: z.string().min(2,{message:'name must be 2 char long'}),
  username: z.string().min(2).max(50),
  email: z.string().min(2,{message:'email must be 2 char long'}),
  password: z.string().min(8,{message:'password must be 8 char long'}),
});
export const signInValidation = z.object({
 
  email: z.string().min(2,{message:'email must be 2 char long'}),
  password: z.string().min(8,{message:'password must be 8 char long'}),
});