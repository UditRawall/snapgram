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
export const postValidation = z.object({
 
file: z.custom<File[]>(),
  caption: z.string().min(5,{message:'email must be 2 char long'}).max(2200, { message: "Maximum 2,200 caracters" }),
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});