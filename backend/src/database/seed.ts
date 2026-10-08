import { randomBytes, scryptSync } from "node:crypto";
import { usersTable } from "./models/users.ts";
import { machinesTable } from "./models/machines.ts";
import db from "./db.ts"


const TEST_PASSWORD = "Password123!";

// SWAP THIS for whatever your auth code uses (bcrypt/argon2), otherwise
// logging in as seeded users will fail.
function hashPassword(plain: string): string {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(plain, salt, 64).toString("hex")}`;
}

// student_number format: "u" + 8 digits (9 chars total, fits varchar(9)).
const users = [
  { studentNumber: "u12345678", firstName: "Thabo",  lastName: "Mokoena", role: "resident",    roomNumber: "A101", cellNumber: "0821234567" },
  { studentNumber: "u23456789", firstName: "Lerato", lastName: "Dlamini", role: "resident",    roomNumber: "A102", cellNumber: "0832345678" },
  { studentNumber: "u34567890", firstName: "Pieter", lastName: "van Wyk", role: "resident",    roomNumber: "B214", cellNumber: "0843456789" },
  { studentNumber: "u45678901", firstName: "Nomsa",  lastName: "Khumalo", role: "resident",    roomNumber: "C305", cellNumber: "0724567890" },
  { studentNumber: "u56789012", firstName: "Sipho",  lastName: "Ndlovu",  role: "coordinator", roomNumber: "D001", cellNumber: "0715678901" },
  { studentNumber: "u67890123", firstName: "Ayesha", lastName: "Patel",   role: "EC",          roomNumber: "D002", cellNumber: "0766789012" },
  { studentNumber: "u24676412", firstName: "Njabulo", lastName: "Mathonsi", role: "dev", roomNumber: "A2-84", cellNumber: "0665212412" },
] as const;

const machines = [
  { number: 1, type: "washing machine", status: "healthy" },
  { number: 2, type: "washing machine", status: "healthy" },
  { number: 3, type: "washing machine", status: "unhealthy" },
  { number: 4, type: "washing machine", status: "healthy" },
  { number: 5, type: "washing machine", status: "healthy" },
  { number: 6, type: "washing machine", status: "unhealthy" },
  { number: 7, type: "washing machine", status: "healthy" },
  { number: 1, type: "dryer", status: "healthy" },
  { number: 2, type: "dryer", status: "unhealthy" },
  { number: 3, type: "dryer", status: "healthy" },
  { number: 4, type: "dryer", status: "healthy" },
  { number: 5, type: "dryer", status: "healthy" },
  { number: 6, type: "dryer", status: "healthy" },
  { number: 7, type: "dryer", status: "healthy" },
] as const;

async function main() {
  const password = hashPassword(TEST_PASSWORD);

  await db
    .insert(usersTable)
    .values(users.map((u) => ({ ...u, password })))
    .onConflictDoNothing();

  await db.insert(machinesTable).values([...machines]).onConflictDoNothing();

  console.log(`Seeded ${users.length} users and ${machines.length} machines.`);
  console.log(`All seeded users share the password: ${TEST_PASSWORD}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })