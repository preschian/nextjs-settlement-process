'use client'

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useItems } from '@/hooks/items'
import { toast } from 'sonner'

export default function Review() {
  const { items } = useItems()

  async function handleReview({ id, product, price, status }: { id: number; product: string; price: number; status: string }) {
    const res = await fetch('/api', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, product, price, status }),
    })

    if (res.ok) {
      toast.info('Item updated!')
    }
  }

  return (
    <Card className="w-full max-w-2xl mt-6">
      <CardHeader>
        <CardTitle>Review Procurement Requests</CardTitle>
        <CardDescription>View all procurement requests.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {items.length &&
            items.map((item) => {
              return (
                <div key={item.id}>
                  <div className="shadow p-3 rounded-lg rounded-b-none relative bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-bold">{item.product}</p>
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
                  {item.status === 'pending' ? (
                    <div className="shadow relative z-10 bg-white rounded-b-lg flex justify-stretch items-center overflow-auto text-xs font-mono">
                      <button
                        onClick={() => handleReview({ id: item.id, price: item.price, product: item.product, status: 'rejected' })}
                        className="w-full p-2 text-center bg-red-700 hover:bg-red-900 text-white hover:cursor-pointer"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleReview({ id: item.id, price: item.price, product: item.product, status: 'approved' })}
                        className="w-full p-2 text-center bg-green-700 hover:bg-green-900 text-white hover:cursor-pointer"
                      >
                        Approve
                      </button>
                    </div>
                  ) : (
                    <div className="shadow relative z-10 bg-gray-200 rounded-b-lg  overflow-auto text-xs font-mono p-2 text-center">
                      {item.status === 'rejected' ? 'Waiting for user to update' : 'Request approved'}
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </CardContent>
    </Card>
  )
}
