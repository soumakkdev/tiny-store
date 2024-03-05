import { decimal, json, pgEnum, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const genderEnum = pgEnum('gender', ['male', 'female'])

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	uid: varchar('uid', { length: 255 }).notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	phoneNo: varchar('phone_no', { length: 255 }),
})

export const productsTable = pgTable('products', {
	id: serial('id').primaryKey().notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	category: varchar('category', { length: 255 }).notNull(),
	status: varchar('status', { length: 255 }),
	price: decimal('price').notNull(),
	sku: varchar('sku', { length: 255 }).notNull(),
	images: json('images'),
})

export type IUser = typeof users.$inferSelect
export type IAddUser = typeof users.$inferInsert
export type IProduct = typeof productsTable.$inferSelect
export type IAddProduct = typeof productsTable.$inferInsert

export const ZAddUserSchema = createInsertSchema(users)
export const ZUserSchema = createSelectSchema(users)
