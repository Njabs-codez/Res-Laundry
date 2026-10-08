import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";;


export const userRole = pgEnum('role', [
    'resident',
    'coordinator',
    'EC',
    'dev'
])

export const usersTable = pgTable('users', {
    studentNumber: varchar('student_number', { length: 9 }).primaryKey(),
    firstName: varchar('first_name', { length: 255 }).notNull().default("College"),
    lastName: varchar('last_name', { length: 255 }).notNull().default("Man"),
    role: userRole().notNull().default('resident'),
    password: varchar().notNull().default("not assigned"),
    roomNumber: varchar('room_number', { length: 7 }).notNull().default("not assigned"),
    cellNumber: varchar('cellphone_number', { length: 10 }).notNull().default("not assigned"),
    refreshToken: varchar('refresh_token', { length: 255 }),
    resetPasswordToken: varchar('reset_password_token', { length: 255 }),
})