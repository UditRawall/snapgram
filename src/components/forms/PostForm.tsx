import React from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { postValidation } from '@/lib/validation';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
    username: z.string().min(2).max(50),
  })

const PostForm = () => {

    const form = useForm<z.infer<typeof postValidation>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          caption: "",
        },
      });

      function onSubmit(values: z.infer<typeof postValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Caption</FormLabel>
            <FormControl>
              <Textarea className='shad-textarea custom-scrollbar' {...field}
               />
            </FormControl>
            
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Upload File</FormLabel>
            <FormControl>
              <Textarea className='shad-textarea custom-scrollbar' {...field}
               />
            </FormControl>
            
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Location</FormLabel>
            <FormControl>
              <Input className='shad-input' {...field}
               />
            </FormControl>
            
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Caption</FormLabel>
            <FormControl>
              <Input className='shad-input' {...field}
               />
            </FormControl>
            
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default PostForm