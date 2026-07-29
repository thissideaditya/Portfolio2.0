/**
 * Hashes the password you'll log in with. Paste the output into
 * ADMIN_PASSWORD_HASH — the plain password is never stored anywhere.
 *
 *   npm run hash-password
 */
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const password = await rl.question("Choose an admin password: ");
rl.close();

if (password.length < 12) {
  console.error("\nUse at least 12 characters — this is the only door to your admin panel.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log("\nAdd this to your environment variables:\n");
console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
