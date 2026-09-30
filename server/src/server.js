import Welfare from "../models/Welfare.js";
import WelfareFund from "../models/WelfareFund.js";
import SportsEvent from "../models/SportsEvent.js";
import SportsInventory from "../models/SportsInventory.js";
import WelfareMember from "../models/WelfareMember.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ROOT = process.cwd();
const JWT_SECRET = process.env.JWT_SECRET || "gramalk-development-secret";

/* =========================================================
   GEMINI
========================================================= */
const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
const gemini = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;
console.log(`Gemini API key loaded: ${Boolean(gemini)}`);

/* =========================================================
   MONGODB ATLAS
========================================================= */
const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;
const mongoDatabase = process.env.MONGO_DATABASE || "gramalk";

if (!mongoUsername || !mongoPassword || !mongoCluster) {
  console.error("MongoDB environment variables are missing.");
  process.exit(1);
}

const mongoURI = `mongodb+srv://${encodeURIComponent(mongoUsername)}:${encodeURIComponent(mongoPassword)}@${mongoCluster}/${mongoDatabase}?authSource=admin`;

try {
  await mongoose.connect(mongoURI);
  console.log("=================================");
  console.log("MongoDB Atlas Connected Successfully!");
  console.log("Database:", mongoDatabase);
  console.log("=================================");
} catch (error) {
  console.error("MongoDB Connection Failed:", error.message);
  process.exit(1);
}

/* =========================================================
   DIRECTORIES
========================================================= */
const complaintUploadDir = path.join(ROOT, "uploads", "complaints");
const formUploadDir = path.join(ROOT, "uploads", "forms");
fs.mkdirSync(complaintUploadDir, { recursive: true });
fs.mkdirSync(formUploadDir, { recursive: true });

/* =========================================================
   MIDDLEWARE
========================================================= */
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(ROOT, "uploads")));

/* =========================================================
   MULTER - COMPLAINT UPLOADS
========================================================= */
const complaintStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, complaintUploadDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});
const complaintUpload = multer({
  storage: complaintStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

/* =========================================================
   MULTER - FORM PDF UPLOADS
========================================================= */
const formStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, formUploadDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});
const formUpload = multer({
  storage: formStorage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (extension === ".pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."));
    }
  },
});

/* =========================================================
   USER MODEL
========================================================= */
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "family" },
    houseNumber: { type: String, default: "" },
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  { timestamps: true, strict: false }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

/* =========================================================
   DEFAULT PORTAL USERS
========================================================= */
async function createDefaultPortalUsers() {
  const portalUsers = [
    { username: "gnadmin", password: "ChangeMe123!", role: "gnadmin", fullName: "GN Officer", email: "gnadmin@gramalk.lk", houseNumber: "" },
    { username: "welfare", password: "ChangeMe123!", role: "welfare", fullName: "Welfare Officer", email: "welfare@gramalk.lk", houseNumber: "" },
    { username: "health", password: "ChangeMe123!", role: "health", fullName: "Health Officer", email: "health@gramalk.lk", houseNumber: "" },
    { username: "youthsports", password: "ChangeMe123!", role: "youthsports", fullName: "Youth and Sports Officer", email: "youthsports@gramalk.lk", houseNumber: "" },
    { username: "family001", password: "1234", role: "family", fullName: "Family User", email: "family001@gramalk.lk", houseNumber: "H001" },
  ];
  for (const account of portalUsers) {
    const hashedPassword = await bcrypt.hash(account.password, 10);
    const existingUser = await User.findOne({ username: account.username });
    if (!existingUser) {
      await User.create({
        username: account.username,
        password: hashedPassword,
        role: account.role,
        fullName: account.fullName,
        email: account.email,
        houseNumber: account.houseNumber,
      });
      console.log(`Created portal user: ${account.username}`);
    } else {
      existingUser.password = hashedPassword;
      existingUser.role = account.role;
      existingUser.fullName = account.fullName;
      existingUser.email = account.email;
      existingUser.houseNumber = account.houseNumber;
      await existingUser.save();
      console.log(`Updated portal user: ${account.username}`);
    }
  }
  console.log("Portal user setup completed.");
}

/* =========================================================
   MODELS
========================================================= */
const Office = mongoose.models.Office || mongoose.model("Office", new mongoose.Schema({}, { timestamps: true, strict: false }));
const GovernmentOffice = mongoose.models.GovernmentOffice || mongoose.model("GovernmentOffice", new mongoose.Schema({}, { timestamps: true, strict: false }), "governmentoffices");
const Form = mongoose.models.Form || mongoose.model("Form", new mongoose.Schema({}, { timestamps: true, strict: false }));
const Announcement = mongoose.models.Announcement || mongoose.model("Announcement", new mongoose.Schema({}, { timestamps: true, strict: false }), "announcements");
const Complaint = mongoose.models.Complaint || mongoose.model("Complaint", new mongoose.Schema({}, { timestamps: true, strict: false }), "complaints");
const Chat = mongoose.models.Chat || mongoose.model("Chat", new mongoose.Schema({}, { timestamps: true, strict: false }), "chats");
const Officer = mongoose.models.Officer || mongoose.model("Officer", new mongoose.Schema({}, { timestamps: true, strict: false }), "officers");
const VillageActivity = mongoose.models.VillageActivity || mongoose.model("VillageActivity", new mongoose.Schema({}, { timestamps: true, strict: false }), "village_activities");

/* =========================================================
   AUTHENTICATION
========================================================= */
function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
      houseNumber: user.houseNumber || "",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function authMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: "Authentication required." });
    }
    const parts = authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid authorization format." });
    }
    req.user = jwt.verify(parts[1], JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

function roleMiddleware(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required." });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission." });
    }
    next();
  };
}

/* =========================================================
   HEALTH CHECK
========================================================= */
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "GramaLK backend is running.",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

/* =========================================================
   LOGIN
========================================================= */
app.post("/api/login", async (req, res) => {
  try {
    const { username = "", password = "", houseNumber = "" } = req.body;
    const loginUsername = username.trim();
    const loginHouseNumber = houseNumber.trim();
    if (!loginUsername && !loginHouseNumber) {
      return res.status(400).json({ message: "Username or house number is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    let user = null;

    if (loginUsername) {
      user = await User.findOne({ username: loginUsername });
    }
    if (!user && loginHouseNumber) {
      user = await User.findOne({ houseNumber: loginHouseNumber });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username, house number or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username, house number or password." });
    }

    const token = createToken(user);
    return res.json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        houseNumber: user.houseNumber || "",
        fullName: user.fullName || "",
        email: user.email || "",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed." });
  }
});

/* =========================================================
   CURRENT USER
========================================================= */
app.get("/api/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Failed to load user." });
  }
});

/* =========================================================
   OFFICES
========================================================= */
app.get("/api/offices", async (req, res) => {
  try {
    const offices = await Office.find().sort({ createdAt: -1 });
    res.json(offices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load offices." });
  }
});
app.post("/api/offices", authMiddleware, async (req, res) => {
  try {
    const office = await Office.create(req.body);
    res.status(201).json(office);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create office." });
  }
});

/* =========================================================
   GOVERNMENT OFFICES
========================================================= */
app.get("/api/government-offices", async (req, res) => {
  try {
    const offices = await GovernmentOffice.find().sort({ createdAt: -1 });
    res.json(offices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load government offices." });
  }
});

/* =========================================================
   FORMS
========================================================= */
app.get("/api/forms", async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load forms." });
  }
});
app.post("/api/forms", authMiddleware, formUpload.single("file"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.fileName = req.file.filename;
      data.fileUrl = `/uploads/forms/${req.file.filename}`;
    }
    data.createdBy = req.user.username;
    const form = await Form.create(data);
    res.status(201).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create form." });
  }
});

/* =========================================================
   ANNOUNCEMENTS
========================================================= */
app.get("/api/announcements", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load announcements." });
  }
});
app.post("/api/announcements", authMiddleware, async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    res.status(201).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create announcement." });
  }
});
app.put("/api/announcements/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update announcement." });
  }
});
app.delete("/api/announcements/:id", authMiddleware, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Announcement deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete announcement." });
  }
});

/* =========================================================
   COMPLAINTS
========================================================= */
app.post("/api/complaints", authMiddleware, complaintUpload.single("image"), async (req, res) => {
  try {
    const data = {
      ...req.body,
      username: req.user.username,
      houseNumber: req.body.houseNumber || req.user.houseNumber || "",
      status: req.body.status || "Pending",
    };
    if (req.file) {
      data.imageUrl = `/uploads/complaints/${req.file.filename}`;
    }
    const complaint = await Complaint.create(data);
    res.status(201).json({ success: true, complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit complaint." });
  }
});
app.get("/api/complaints", authMiddleware, async (req, res) => {
  try {
    let complaints;
    const staffRoles = ["gnadmin", "welfare", "health", "youthsports"];
    if (staffRoles.includes(req.user.role)) {
      complaints = await Complaint.find().sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find({ username: req.user.username }).sort({ createdAt: -1 });
    }
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load complaints." });
  }
});

/* =========================================================
   CHATS
========================================================= */
app.get("/api/chats", authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [{ username: req.user.username }, { userId: req.user.id }],
    }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (error) {
    console.error("Get chats error:", error);
    res.status(500).json({ message: "Failed to load chats." });
  }
});
app.post("/api/chats", authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.create({
      ...req.body,
      username: req.user.username,
      userId: req.user.id,
    });
    res.status(201).json(chat);
  } catch (error) {
    console.error("Create chat error:", error);
    res.status(500).json({ message: "Failed to save chat." });
  }
});

/* =========================================================
   OFFICERS
========================================================= */
app.get("/api/officers", async (req, res) => {
  try {
    const officers = await Officer.find().sort({ createdAt: -1 });
    res.json(officers);
  } catch (error) {
    console.error("Get officers error:", error);
    res.status(500).json({ message: "Failed to load officers." });
  }
});
app.post("/api/officers", authMiddleware, async (req, res) => {
  try {
    const officer = await Officer.create(req.body);
    res.status(201).json(officer);
  } catch (error) {
    console.error("Create officer error:", error);
    res.status(500).json({ message: "Failed to create officer." });
  }
});

/* =========================================================
   VILLAGE ACTIVITIES
========================================================= */
app.get("/api/village-activities", async (req, res) => {
  try {
    const activities = await VillageActivity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    console.error("Get village activities error:", error);
    res.status(500).json({ message: "Failed to load village activities." });
  }
});
app.post("/api/village-activities", authMiddleware, async (req, res) => {
  try {
    const activity = await VillageActivity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    console.error("Create village activity error:", error);
    res.status(500).json({ message: "Failed to create village activity." });
  }
});

/* =========================================================
   GEMINI WEBSITE CONTEXT & CHAT
========================================================= */
async function getWebsiteContext() {
  try {
    const [offices, governmentOffices, forms, announcements, officers, activities] = await Promise.all([
      Office.find().lean(),
      GovernmentOffice.find().lean(),
      Form.find().lean(),
      Announcement.find().lean(),
      Officer.find().lean(),
      VillageActivity.find().lean(),
    ]);
    return { offices, governmentOffices, forms, announcements, officers, activities };
  } catch (error) {
    console.error("Context error:", error);
    return { offices: [], governmentOffices: [], forms: [], announcements: [], officers: [], activities: [] };
  }
}

async function tryGemini(message, context) {
  if (!gemini) return null;
  const prompt = `
You are the GramaLK government services assistant.
Answer clearly and simply.
Use only the information available in the GramaLK database when answering questions about GramaLK services.
Do not invent offices, officers, forms, announcements, activities, contacts or government information.
If information is not available, say that it is not currently available in the GramaLK database.

OFFICES:
${JSON.stringify(context.offices, null, 2)}
GOVERNMENT OFFICES:
${JSON.stringify(context.governmentOffices, null, 2)}
FORMS:
${JSON.stringify(context.forms, null, 2)}
ANNOUNCEMENTS:
${JSON.stringify(context.announcements, null, 2)}
OFFICERS:
${JSON.stringify(context.officers, null, 2)}
VILLAGE ACTIVITIES:
${JSON.stringify(context.activities, null, 2)}

USER QUESTION:
${message}
`;
  try {
    const response = await gemini.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });
    if (response && response.text) {
      return response.text;
    }
  } catch (error) {
    console.error("Gemini error:", error.message);
  }
  return null;
}

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required." });
    }
    const context = await getWebsiteContext();
    const answer = await tryGemini(message.trim(), context);
    if (answer) {
      return res.json({ success: true, reply: answer });
    }
    res.json({
      success: true,
      reply: "Sorry, I could not process your request right now. Please try again.",
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ message: "Chat service failed." });
  }
});

/* =========================================================
   WELFARE CLAIMS ROUTES (සුබසාධක ආධාර දත්ත)
========================================================= */
app.get("/api/welfare/claims", async (req, res) => {
  try {
    const claims = await Welfare.find().sort({ createdAt: -1 });
    res.json(claims);
  } catch (error) {
    console.error("Welfare fetch error:", error);
    res.status(500).json({ message: "දත්ත ලබාගැනීමට නොහැකි විය." });
  }
});

app.post("/api/welfare/claims", async (req, res) => {
  try {
    const claim = await Welfare.create(req.body);
    res.status(201).json({ success: true, claim });
  } catch (error) {
    console.error("Welfare save error:", error);
    res.status(500).json({ message: "දත්ත සුරැකීමට නොහැකි විය." });
  }
});


app.delete("/api/welfare/claims/:id", async (req, res) => {
  try {
    await Welfare.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "සහනාධාරය ඉවත් කළා." });
  } catch (error) {
    console.error("Welfare claim delete error:", error);
    res.status(500).json({ message: "ඉවත් කිරීම අසාර්ථක විය." });
  }
});

// UPDATE RELIEF CLAIM
app.put("/api/welfare/claims/:id", async (req, res) => {
  try {
    const { claimType, amount, itemsBorrowed } = req.body;
    const updated = await Welfare.findByIdAndUpdate(
      req.params.id,
      { claimType, amount, itemsBorrowed },
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: "සහනාධාර සටහන හමු නොවීය." });
    }

    res.json({ success: true, message: "සාර්ථකව Update විය!", data: updated });
  } catch (error) {
    console.error("Claim update error:", error);
    res.status(500).json({ message: "Update කිරීම අසාර්ථක විය." });
  }
});

/* =========================================================
   WELFARE MONTHLY FUNDS ROUTES (මාසික ගාස්තු එකතු කිරීම)
========================================================= */
app.get("/api/welfare/funds", async (req, res) => {
  try {
    const funds = await WelfareFund.find().sort({ createdAt: -1 });
    res.json(funds);
  } catch (error) {
    res.status(500).json({ message: "අරමුදල් දත්ත ලබාගැනීමට නොහැකි විය." });
  }
});

app.post("/api/welfare/funds", async (req, res) => {
  try {
    const fund = await WelfareFund.create(req.body);
    res.status(201).json({ success: true, fund });
  } catch (error) {
    res.status(500).json({ message: "අරමුදල් දත්ත සුරැකීමට නොහැකි විය." });
  }
});

app.put("/api/welfare/funds/:id", async (req, res) => {
  try {
    const updated = await WelfareFund.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: "Update කිරීම අසාර්ථක විය." });
  }
});

app.delete("/api/welfare/funds/:id", async (req, res) => {
  try {
    await WelfareFund.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "ගෙවීමේ සටහන ඉවත් කළා." });
  } catch (error) {
    res.status(500).json({ message: "ඉවත් කිරීම අසාර්ථක විය." });
  }
});

// ==========================================
// 1. YOUTH MEMBERS MODEL & ROUTES
// ==========================================
const youthMemberSchema = new mongoose.Schema({
  houseNumber: String,
  name: String,
  age: Number,
  sport: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

const YouthMember = mongoose.models.YouthMember || mongoose.model("YouthMember", youthMemberSchema, "youthmembers");

app.get("/api/sports/members", async (req, res) => {
  try {
    const members = await YouthMember.find({});
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "දත්ත ලබාගැනීම අසාර්ථක විය." });
  }
});

app.post("/api/sports/members", async (req, res) => {
  try {
    const { houseNumber, name, age, sport, phone } = req.body;
    const newMember = new YouthMember({ houseNumber, name, age, sport, phone });
    await newMember.save();
    res.status(201).json({ success: true, message: "සාර්ථකයි!", member: newMember });
  } catch (error) {
    console.error("Youth member save error:", error);
    res.status(500).json({ message: "ලියාපදිංචි කිරීම අසාර්ථක විය." });
  }
});

// ==========================================
// 2. MONTHLY FEES MODEL & ROUTES (New Database Collection)
// ==========================================
const feeSchema = new mongoose.Schema({
  houseNumber: String,
  memberName: String,
  month: String,
  amount: Number,
  status: { type: String, default: "Paid" },
  date: { type: Date, default: Date.now }
});

const SportFee = mongoose.models.SportFee || mongoose.model("SportFee", feeSchema, "youthfees");

app.get("/api/sports/fees", async (req, res) => {
  try {
    const fees = await SportFee.find({});
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: "දත්ත ලබාගැනීම අසාර්ථක විය." });
  }
});

app.post("/api/sports/fees", async (req, res) => {
  try {
    const { houseNumber, memberName, month, amount, status } = req.body;
    const newFee = new SportFee({ houseNumber, memberName, month, amount, status });
    await newFee.save();
    res.status(201).json({ success: true, message: "ගෙවීම සාර්ථකයි!", fee: newFee });
  } catch (error) {
    console.error("Fee save error:", error);
    res.status(500).json({ message: "ගෙවීම් සටහන් කිරීම අසාර්ථක විය." });
  }
});

// ==========================================
// 3. INVENTORY MODEL & ROUTES (New Database Collection)
// ==========================================
const inventorySchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  condition: String
});

const SportInventory = mongoose.models.SportInventory || mongoose.model("SportInventory", inventorySchema, "sportsinventories");

app.get("/api/sports/inventory", async (req, res) => {
  try {
    const items = await SportInventory.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "දත්ත ලබාගැනීම අසාර්ථක විය." });
  }
});

app.post("/api/sports/inventory", async (req, res) => {
  try {
    const { itemName, quantity, condition } = req.body;
    const newItem = new SportInventory({ itemName, quantity, condition });
    await newItem.save();
    res.status(201).json({ success: true, message: "උපකරණය එකතු විය!", item: newItem });
  } catch (error) {
    console.error("Inventory save error:", error);
    res.status(500).json({ message: "උපකරණ එකතු කිරීම අසාර්ථක විය." });
  }
});
// PUT & DELETE ROUTES FOR YOUTH MEMBERS, FEES, INVENTORY
app.put("/api/sports/members/:id", async (req, res) => {
  const updated = await YouthMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, updated });
});
app.delete("/api/sports/members/:id", async (req, res) => {
  await YouthMember.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.put("/api/sports/fees/:id", async (req, res) => {
  const updated = await SportFee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, updated });
});
app.delete("/api/sports/fees/:id", async (req, res) => {
  await SportFee.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.put("/api/sports/inventory/:id", async (req, res) => {
  const updated = await SportInventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, updated });
});
app.delete("/api/sports/inventory/:id", async (req, res) => {
  await SportInventory.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});



// GET VILLAGERS BY HOUSE NUMBER
app.get("/api/villagers", async (req, res) => {
  try {
    const { houseNumber } = req.query;
    const db = mongoose.connection.db;
    
    if (!db) {
      return res.status(500).json({ message: "Database connection not found" });
    }

    let query = {};
    if (houseNumber) {
      // Case-insensitive ලෙස house number එක සෙවීම
      query = { houseNumber: { $regex: new RegExp(`^${houseNumber.trim()}$`, "i") } };
    }

    const villagers = await db.collection("villagers").find(query).toArray();
    res.json(villagers);
  } catch (error) {
    console.error("Error fetching villagers:", error);
    res.status(500).json({ message: "ගම්වැසියන්ගේ දත්ත ලබාගැනීම අසාර්ථක විය." });
  }
});

/* =========================================================
   WELFARE MEMBER ROUTES
========================================================= */
app.post("/api/welfare/register-member", async (req, res) => {
  try {
    const { houseNumber, householdHeadNIC } = req.body;
    if (!houseNumber || !householdHeadNIC) {
      return res.status(400).json({ message: "House Number සහ NIC අංකය අනිවාර්ය වේ." });
    }

    const cleanHouseNo = houseNumber.trim();
    const cleanNIC = householdHeadNIC.trim();

    const existing = await WelfareMember.findOne({ houseNumber: cleanHouseNo });
    if (existing) {
      return res.status(400).json({ message: "මෙම ගෘහ අංකය දැනටමත් සුබසාධක අංශයේ ලියාපදිංචි වී ඇත." });
    }

    const db = mongoose.connection.db;
    let villagerData = null;
    if (db) {
      villagerData = await db.collection("villagers").findOne({
        $or: [
          { houseNumber: { $regex: new RegExp(`^${cleanHouseNo}$`, "i") } },
          { nic: cleanNIC },
          { householdHeadNIC: cleanNIC },
        ],
      });
    }

    const newWelfareMember = new WelfareMember({
      houseNumber: cleanHouseNo,
      householdHeadNIC: cleanNIC,
      fullName: villagerData?.fullName || villagerData?.username || "Welfare Member",
      phone: villagerData?.phone || villagerData?.contactNo || "N/A",
      welfareStatus: "Registered in Welfare",
    });

    await newWelfareMember.save();

    res.json({
      success: true,
      message: "සුබසාධක සාමාජිකයා සාර්ථකව ලියාපදිංචි විය!",
      data: newWelfareMember,
    });
  } catch (error) {
    console.error("Welfare Registration Error:", error);
    res.status(500).json({ message: "ලියාපදිංචි කිරීමේදී දෝෂයක් සිදු විය." });
  }
});

app.get("/api/welfare/members", async (req, res) => {
  try {
    const members = await WelfareMember.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "දත්ත ලබාගැනීමට නොහැකි විය." });
  }
});

app.put("/api/welfare/members/:id", async (req, res) => {
  try {
    const { fullName, phone } = req.body;
    const updated = await WelfareMember.findByIdAndUpdate(req.params.id, { fullName, phone }, { new: true });
    res.json({ success: true, message: "තොරතුරු සාර්ථකව Update විය!", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Update කිරීම අසාර්ථක විය." });
  }
});

app.delete("/api/welfare/members/:id", async (req, res) => {
  try {
    await WelfareMember.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "සාමාජිකයා සාර්ථකව ඉවත් කළා." });
  } catch (error) {
    res.status(500).json({ message: "ඉවත් කිරීම අසාර්ථක විය." });
  }
});

/* =========================================================
   ERROR HANDLER
========================================================= */
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ message: `Upload error: ${error.message}` });
  }
  res.status(500).json({ message: error.message || "Internal server error." });
});

/* =========================================================
   START SERVER
========================================================= */
async function startServer() {
  try {
    await createDefaultPortalUsers();
    app.listen(PORT, "0.0.0.0", () => {
      console.log("================================");
      console.log(`GramaLK backend running on port ${PORT}`);
      console.log(`Local: http://localhost:${PORT}`);
      console.log(`Network: http://0.0.0.0:${PORT}`);
      console.log("MongoDB: Atlas");
      console.log("Portals: Enabled");
      console.log("================================");
    });
  } catch (error) {
    console.error("SERVER STARTUP ERROR:", error);
    process.exit(1);
  }
}

startServer();