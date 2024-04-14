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
import FileUploader from '../shared/FileUploader';

const formSchema = z.object({
    username: z.string().min(2).max(50),
  })

const PostForm = ({post}) => {

    const form = useForm<z.infer<typeof postValidation>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
        },
      });

      function onSubmit(values: z.infer<typeof postValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
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
            <FormLabel className='shad-form_label'>Add Photos</FormLabel>
            <FormControl>
              <FileUploader fieldChange={field?.onChange} mediaUrl={post?.imageUrl} />
              
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
            <FormLabel className='shad-form_label'>Add Location</FormLabel>
            <FormControl>
              <Input type="text" className='shad-input' {...field}
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
            <FormLabel className='shad-form_label'>Add Tags (seprated by comma ' , ')</FormLabel>
            <FormControl>
              <Input type='text' className='shad-input' {...field}
               />
            </FormControl>
            
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <div className='flex flex-1 justify-end items-center gap-4'>

      <Button type="button" className='shad-button_dark_4'>Cancel</Button>
      <Button type="submit" className='shad-button_primary whitespace-nowrap'>Submit</Button>
      </div>
    </form>
  </Form>
  )
}

export default PostForm