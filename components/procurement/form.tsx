'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { type EditItem, useEditStore } from '@/lib/store'
import { toast } from 'sonner'

const formSchema = z.object({
  product: z.string().min(3).max(50),
  price: z.coerce.number().min(10).max(1000000),
})

export default function ProcurementAdd() {
  const { id, price, product, updatedAt, reset } = useEditStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product,
      price,
    },
  })

  useEffect(() => {
    form.reset({ product, price })
  }, [form, price, product])

  async function getItem(): Promise<EditItem> {
    const { item } = await fetch(`/api/${id}`).then((res) => res.json())
    return item[0] || []
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let res

    if (id) {
      const item = await getItem()

      if (item.updatedAt !== updatedAt) {
        toast.warning(`"${values.product}" has been updated by Admin! Please check again.`)
        reset()
        return
      }

      res = await fetch(`/api`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, product: values.product, price: values.price, status: 'pending' }),
      })

      if (res.ok) {
        reset()
        toast.info('Item updated!')
      }
    } else {
      res = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: values.product, price: values.price }),
      })

      if (res.ok) {
        form.reset()
        toast.info('Item submitted!')
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Procurement</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <Input placeholder="Macbook Air 13'" {...field} />
                  </FormControl>
                  <FormDescription>The name of the product you want to procure.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1000" {...field} />
                  </FormControl>
                  <FormDescription>The price of the product in USD.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {id ? (
              <div className="flex gap-3">
                <Button type="submit">Update</Button>
                <Button size="icon" onClick={reset}>
                  <i className="fa-sharp fa-light fa-plus"></i>
                </Button>
              </div>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
