import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER } = process.env;
const database = process.env.MONGO_DATABASE || "gramalk";
const apply = process.argv.includes("--apply");
const watch = process.argv.includes("--watch");
const resetExisting = process.argv.includes("--reset-existing");
if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_CLUSTER) throw new Error("MongoDB environment variables missing");
if (resetExisting && !apply) throw new Error("--reset-existing requires --apply");
if (resetExisting && watch) throw new Error("--reset-existing cannot be combined with --watch");
const uri = `mongodb+srv://${encodeURIComponent(MONGO_USERNAME)}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_CLUSTER}/${database}?authSource=admin`;

async function sync() {
  const db = mongoose.connection.db;
  const villagers = db.collection("villagers");
  const users = db.collection("users");
  const houses = await villagers.distinct("houseNumber", { houseNumber: { $type: "string", $ne: "" } });
  let created = 0, reset = 0, existing = 0, invalid = 0;
  for (const raw of houses) {
    const house = raw.trim();
    if (!/^[A-Za-z0-9-]{1,32}$/.test(house)) { invalid++; continue; }
    const account = await users.findOne({ $or: [{ houseNumber: house }, { username: house }, { houseNumber: raw }, { username: raw }] });
    if (account && (!resetExisting || account.role !== "family")) { existing++; continue; }
    if (account && resetExisting) {
      if (!apply) { reset++; continue; }
      const hash = await bcrypt.hash(house, 12);
      const result = await users.updateOne(
        { _id: account._id, role: "family" },
        {
          $set: {
            password: hash,
            mustChangePassword: true,
            passwordVersion: (account.passwordVersion || 0) + 1,
            updatedAt: new Date(),
          },
        }
      );
      if (result.modifiedCount !== 1) {
        throw new Error(`Could not reset family account for house ${house}`);
      }
      reset++;
      continue;
    }
    if (!apply) { console.log(`WOULD CREATE: ${house}`); created++; continue; }
    const hash = await bcrypt.hash(house, 12);
    try {
      await users.insertOne({ username: house, houseNumber: house, role: "family", portal: "Family", assignedPortal: "Family", password: hash, mustChangePassword: true, passwordVersion: 0, createdAt: new Date(), updatedAt: new Date() });
      console.log(`CREATED: ${house}`);
      created++;
    } catch (error) {
      if (error.code === 11000) { existing++; console.log(`SKIPPED DUPLICATE: ${house}`); }
      else throw error;
    }
  }
  console.log(`${apply ? "Created" : "Would create"}: ${created}; ${apply ? "Reset" : "Would reset"}: ${reset}; Existing: ${existing}; Invalid: ${invalid}`);
}

async function main() {
  await mongoose.connect(uri);
  await sync();
  if (!watch) { await mongoose.disconnect(); return; }
  if (!apply) throw new Error("--watch requires --apply");
  console.log("Watching for new houses every 30 seconds. Keep this process running.");
  setInterval(() => sync().catch(error => console.error("Sync error:", error.message)), 30000);
}
main().catch(async error => { console.error(error.message); await mongoose.disconnect(); process.exitCode = 1; });
