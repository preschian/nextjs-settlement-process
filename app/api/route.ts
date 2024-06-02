import { db } from '@/lib/db'
import { documents } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const items = await db.select().from(documents)

  return Response.json({ items })
}

export async function POST(request: Request) {
  const { product, price } = await request.json()
  const doc = await db.insert(documents).values({ product, price, status: 'pending' })

  return Response.json({ message: 'Document created!', doc })
}

export async function PATCH(request: Request) {
  const { id, product, price, status } = await request.json()
  const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const doc = await db.update(documents).set({ product, price, status, updatedAt }).where(eq(documents.id, id))

  return Response.json({ message: 'Document updated!', doc, updatedAt })
}
