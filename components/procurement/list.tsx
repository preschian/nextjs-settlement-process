'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEditStore } from '@/lib/store'
import { useItems } from '@/hooks/items'

export default function ProcurementList() {
  const { items } = useItems()
  const { editProduct } = useEditStore()

  return (
    <Card className="w-full max-w-2xl mt-6">
      <CardHeader>
        <CardTitle>Procurement Requests</CardTitle>
        <CardDescription>View all procurement requests.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {items.length &&
            items.map((item) => {
              return (
                <div key={item.id} className="shadow p-3 rounded-lg flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold">{item.product}</p>
                    {item.status !== 'approved' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          editProduct({
                            id: item.id,
                            product: item.product,
                            price: item.price,
                            updatedAt: item.updatedAt,
                          })
                        }
                      >
                        <i className="fa-sharp fa-light fa-pen-to-square fa-xs"></i>
                      </Button>
                    ) : null}
                  </div>

                  <div className="flex justify-between">
                    <div className="text-sm">
                      <p className="text-gray-400">Price</p>
                      <p className="ml-auto font-mono">${item.price}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-400">Status</p>
                      <p className="ml-auto font-mono">{item.status}</p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </CardContent>
    </Card>
  )
}
