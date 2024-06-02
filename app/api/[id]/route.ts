import { db } from '@/lib/db'
import { documents } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const item = await db
    .select()
    .from(documents)
    .where(eq(documents.id, Number(id)))

  return Response.json({ item })
}
