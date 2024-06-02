import { InferInsertModel, InferSelectModel, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const documents = sqliteTable('documents', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  product: text('product').notNull(),
  price: integer('price').notNull(),
  status: text('status').notNull(), // pending, approved, rejected // sqlite doesn't support enum
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
})

export type SelectDocuments = InferSelectModel<typeof documents>
export type InsertDocuments = InferInsertModel<typeof documents>
