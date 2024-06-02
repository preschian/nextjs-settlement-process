import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from './lib/db'

// this will automatically run needed migrations on the database
migrate(db, { migrationsFolder: './drizzle' })
