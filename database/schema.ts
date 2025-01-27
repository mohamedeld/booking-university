import { date, integer, pgEnum, pgTable, serial, text, timestamp, uuid,varchar } from 'drizzle-orm/pg-core';

export const STATUS_ENUM = pgEnum("status",[
  "PENDING","APPROVED","REJECTED"
])

export const ROLE_ENUM = pgEnum("role",
  ['USER','ADMIN']
)

export const BORROW_STATUS_ENUM = pgEnum("borrow_status",[
  'BORROWED','RETURNED'
])

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName:varchar("full_name",{length: 255}).notNull(),
  email:varchar("email").notNull().unique(),
  universityId:integer("universityId").notNull(),
  password:text("password").notNull(),
  universityCard:text('universityCard').notNull(),
  status:STATUS_ENUM('status').default('PENDING'),
  role:ROLE_ENUM('role').default('USER'),
  lastActivityDate:date('last_activity_date').defaultNow(),
  createdAt:timestamp("createdAt",{
    withTimezone:true
  }).defaultNow()
});