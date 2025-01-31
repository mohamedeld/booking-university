'use client';

import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { IBook } from "@/utils/types";
import { bookSchema } from "@/lib/validation";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../ImageUpload";
import ColorPicker from "../ColorPicker";
import { createBook } from "@/lib/actions/admin/books";


interface IProps extends Partial<IBook> {
  type?: 'create' | 'update';
}

const BookForm = ({ type, ...book }: IProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      description: '',
      author: '',
      genre: '',
      rating: 1,
      totalCopies: 1,
      coverUrl: '',
      coverColor: '',
      videoUrl: '',
      summary: '',
    }
  })

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<z.infer<typeof bookSchema>> = async (values) => {
    try{
      const res = await createBook(values);
      if(res?.success){
        toast({
          title:"Success",
          description:"book created successfully"
        })
        router.push(`/admin/booking/${res?.data?.id}`)
      }
    }catch(error){
      toast({
        variant:"destructive",
        description:error instanceof Error ? error?.message : "Something went wrong"
      })
    }
  }

  const { isSubmitting, isValid,errors } = form?.formState;

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="capitalize text-base font-normal text-dark-500">
                  Book Title
                </FormLabel>
                <FormControl>
                  <Input required placeholder="Book title" {...field} className="book-form_input" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"author"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="capitalize text-base font-normal text-dark-500">
                  Book Author
                </FormLabel>
                <FormControl>
                  <Input required placeholder="Book Author" {...field} className="book-form_input" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"genre"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="capitalize text-base font-normal text-dark-500">
                  Book Genre
                </FormLabel>
                <FormControl>
                  <Input required placeholder="Book genre" {...field} className="book-form_input" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"rating"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="capitalize text-base font-normal text-dark-500">
                  Book Rating
                </FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={5} placeholder="Book rating" {...field} className="book-form_input" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"totalCopies"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="capitalize text-base font-normal text-dark-500">
                  Book Total Copies
                </FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={1000} placeholder="Book total copies" {...field} className="book-form_input" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"coverUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="capitalize text-base font-normal text-dark-500">
                  Book Image
                </FormLabel>
                <FormControl>
                <ImageUpload placeholder="Upload a Book Cover" accept="image/*" folder="books/covers" variant="dark" type="image"  onFileChange={field?.onChange} value={field?.value}/>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"coverColor"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="capitalize text-base font-normal text-dark-500">
                  Primary Color
                </FormLabel>
                <FormControl>
                 <ColorPicker value={field?.value} onPickerChange={field?.onChange}/>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="capitalize text-base font-normal text-dark-500">
                  Description
                </FormLabel>
                <FormControl>
                 <Textarea placeholder="Book description" {...field} rows={10} className="book-form_input"/>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name={"videoUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="capitalize text-base font-normal text-dark-500">
                  Book Video
                </FormLabel>
                <FormControl>
                <ImageUpload placeholder="Upload a Book Video" accept="video/*" folder="books/videos" variant="dark" type="video"  onFileChange={field?.onChange} value={field?.value}/>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"summary"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="capitalize text-base font-normal text-dark-500">
                  Book Summary 
                </FormLabel>
                <FormControl>
                 <Textarea placeholder="Book summary" {...field} rows={10} className="book-form_input"/>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit" className="book-form_btn text-white text-2xl " disabled={isSubmitting || !isValid}>

          {isSubmitting ? 'Submitting...' : 'Add Book To Library'}
        </Button>
      </form>

    </Form>

  )
}

export default BookForm