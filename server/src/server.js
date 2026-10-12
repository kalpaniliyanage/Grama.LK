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

// Optional portal route import
import gnRoutes from "./routes/gnRoutes.js";

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config();

/* =========================================================
   APP CONFIGURATION
========================================================= */

const app = express();

const PORT = process.env.PORT || 5000;

const ROOT = process.cwd();

const JWT_SECRET =
  process.env.JWT_SECRET || "gramalk-development-secret";

/* =========================================================
   GEMINI SETUP
========================================================= */

const geminiApiKey =
  process.env.GEMINI_API_KEY?.trim();

const gemini = geminiApiKey
  ? new GoogleGenAI({
      apiKey: geminiApiKey,
    })
  : null;

console.log(
  `Gemini API key loaded: ${Boolean(gemini)}`
);


/* =========================================================
<<<<<<< HEAD
   MONGODB CONNECTION
=======
   MONGODB ATLAS CONFIGURATION
>>>>>>> kalpani-server-fix
========================================================= */

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;
const mongoDatabase = process.env.MONGO_DATABASE || "gramalk";

const mongoURI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  (mongoUsername && mongoPassword && mongoCluster
    ? `mongodb+srv://${encodeURIComponent(
        mongoUsername
      )}:${encodeURIComponent(
        mongoPassword
      )}@${mongoCluster}/${mongoDatabase}?authSource=admin`
    : null);

if (!mongoURI) {
  console.error(
    "MongoDB environment variables are missing."
  );
<<<<<<< HEAD
  process.exit(1);
}

=======

  process.exit(1);
}

const mongoURI =
  `mongodb+srv://${encodeURIComponent(
    mongoUsername
  )}:` +
  `${encodeURIComponent(
    mongoPassword
  )}@${mongoCluster}/` +
  `${mongoDatabase}?authSource=admin`;

>>>>>>> kalpani-server-fix
/* =========================================================
   DIRECTORIES
========================================================= */

const complaintUploadDir =
  path.join(
    ROOT,
    "uploads",
    "complaints"
  );

const formUploadDir =
  path.join(
    ROOT,
    "uploads",
    "forms"
  );

fs.mkdirSync(
  complaintUploadDir,
  {
    recursive: true,
  }
);

fs.mkdirSync(
  formUploadDir,
  {
    recursive: true,
  }
);

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  "/uploads",
  express.static(
    path.join(
      ROOT,
      "uploads"
    )
  )
);

/* =========================================================
   MULTER - COMPLAINT IMAGE UPLOAD
========================================================= */

const complaintStorage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        complaintUploadDir
      );
    },

    filename: (
      req,
      file,
      cb
    ) => {
      const extension =
        path.extname(
          file.originalname
        );

      const filename =
        `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${extension}`;

      cb(
        null,
        filename
      );
    },
  });

const complaintUpload =
  multer({
    storage:
      complaintStorage,

    limits: {
      fileSize:
        5 * 1024 * 1024,
    },
  });

/* =========================================================
   MULTER - FORM PDF UPLOAD
========================================================= */

const formStorage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        formUploadDir
      );
    },

    filename: (
      req,
      file,
      cb
    ) => {
      const extension =
        path.extname(
          file.originalname
        );

      const filename =
        `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${extension}`;

      cb(
        null,
        filename
      );
    },
  });

const formUpload =
  multer({
    storage:
      formStorage,

    limits: {
      fileSize:
        15 * 1024 * 1024,
    },

    fileFilter: (
      req,
      file,
      cb
    ) => {
      const extension =
        path.extname(
          file.originalname
        ).toLowerCase();

      if (
        extension === ".pdf"
      ) {
        cb(
          null,
          true
        );
      } else {
        cb(
          new Error(
            "Only PDF files are allowed."
          )
        );
      }
    },
  });

/* =========================================================
   USER SCHEMA
========================================================= */

const userSchema =
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        default: "family",
      },

      houseNumber: {
        type: String,
        default: "",
      },

      fullName: {
        type: String,
        default: "",
      },

      email: {
        type: String,
        default: "",
      },

      /*
         Portal fields are supported.
         strict:false also allows existing
         portal fields already stored in MongoDB.
      */
      portal: {
        type: String,
        default: "",
      },

      assignedPortal: {
        type: String,
        default: "",
      },

      portalType: {
        type: String,
        default: "",
      },
    },

    {
      timestamps: true,
      strict: false,
    }
  );

const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    userSchema
  );

<<<<<<< HEAD
// Family Portal uses the same villagers collection used by the GN Portal
const FamilyVillager =
  mongoose.models.FamilyVillager ||
  mongoose.model(
    "FamilyVillager",
    new mongoose.Schema(
      {},
      {
        strict: false,
        timestamps: true,
      }
    ),
    "villagers"
=======
/* =========================================================
   DEFAULT PORTAL USERS
========================================================= */

async function createDefaultPortalUsers() {
  const portalUsers = [
    {
      username: "gnadmin",
      password: "ChangeMe123!",
      role: "gnadmin",
      fullName: "GN Officer",
      email: "gnadmin@gramalk.lk",
      houseNumber: "",
    },

    {
      username: "welfare",
      password: "ChangeMe123!",
      role: "welfare",
      fullName: "Welfare Officer",
      email: "welfare@gramalk.lk",
      houseNumber: "",
    },

    {
      username: "health",
      password: "ChangeMe123!",
      role: "health",
      fullName: "Health Officer",
      email: "health@gramalk.lk",
      houseNumber: "",
    },

    {
      username: "deathaid",
      password: "ChangeMe123!",
      role: "deathaid",
      fullName: "Death Aid Officer",
      email: "deathaid@gramalk.lk",
      houseNumber: "",
    },

    {
      username: "family001",
      password: "1234",
      role: "family",
      fullName: "Family User",
      email: "family001@gramalk.lk",
      houseNumber: "H001",
    },
  ];

  for (const account of portalUsers) {
    const existingUser =
      await User.findOne({
        username:
          account.username,
      });

    const hashedPassword =
      await bcrypt.hash(
        account.password,
        10
      );

    if (!existingUser) {
      await User.create({
        username:
          account.username,

        password:
          hashedPassword,

        role:
          account.role,

        fullName:
          account.fullName,

        email:
          account.email,

        houseNumber:
          account.houseNumber,
      });

      console.log(
        `Created portal user: ${account.username}`
      );
    } else {
      existingUser.password =
        hashedPassword;

      existingUser.role =
        account.role;

      existingUser.fullName =
        account.fullName;

      existingUser.email =
        account.email;

      existingUser.houseNumber =
        account.houseNumber;

      await existingUser.save();

      console.log(
        `Updated portal user: ${account.username}`
      );
    }
  }

  console.log(
    "Portal user setup completed."
>>>>>>> kalpani-server-fix
  );

<<<<<<< HEAD
// =========================================================
// FAMILY APPOINTMENT MODELS
// =========================================================

// GN appointments
const FamilyGNAppointment =
  mongoose.models.FamilyGNAppointment ||
  mongoose.model(
    "FamilyGNAppointment",
    new mongoose.Schema(
      {},
      {
        strict: false,
        timestamps: true,
      }
    ),
    "appointments"
  );

// PHI and Midwife appointments
const FamilyHealthAppointment =
  mongoose.models.FamilyHealthAppointment ||
  mongoose.model(
    "FamilyHealthAppointment",
    new mongoose.Schema(
      {},
      {
        strict: false,
        timestamps: true,
      }
    ),
    "healthappointments"
  );

=======
>>>>>>> kalpani-server-fix
/* =========================================================
   OTHER SCHEMAS
========================================================= */

const officeSchema =
  new mongoose.Schema(
    {},
    {
      timestamps: true,
      strict: false,
    }
  );

const Office =
  mongoose.models.Office ||
  mongoose.model(
    "Office",
    officeSchema
  );

const governmentOfficeSchema =
  new mongoose.Schema(
    {},
    {
      timestamps: true,
      strict: false,
    }
  );

const GovernmentOffice =
  mongoose.models.GovernmentOffice ||
  mongoose.model(
    "GovernmentOffice",
    governmentOfficeSchema,
    "governmentoffices"
  );

const formSchema =
  new mongoose.Schema(
    {},
    {
      timestamps: true,
      strict: false,
    }
  );

const Form =
  mongoose.models.Form ||
  mongoose.model(
    "Form",
    formSchema
  );

const announcementSchema =
  new mongoose.Schema(
    {},
    {
      timestamps: true,
      strict: false,
    }
  );

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model(
    "Announcement",
    announcementSchema,
    "announcements"
  );

const complaintSchema =
  new mongoose.Schema(
    {},
    {
      timestamps: true,
      strict: false,
    }
  );

const Complaint =
  mongoose.models.Complaint ||
  mongoose.model(
    "Complaint",
    complaintSchema,
    "complaints"
  );

const chatSchema =
  new mongoose.Schema(
    {},
    {
      timestamps: true,
      strict: false,
    }
  );

const Chat =
  mongoose.models.Chat ||
  mongoose.model(
    "Chat",
    chatSchema,
    "chats"
  );

const officerSchema =
  new mongoose.Schema(
    {},
    {
      timestamps: true,
      strict: false,
    }
  );

const Officer =
  mongoose.models.Officer ||
  mongoose.model(
    "Officer",
    officerSchema,
    "officers"
  );

<<<<<<< HEAD
=======
/* =========================================================
   VILLAGE ACTIVITIES MODEL
========================================================= */

>>>>>>> kalpani-server-fix
const villageActivitySchema =
  new mongoose.Schema(
    {
      title: {
        en: {
          type: String,
          required: true,
          trim: true,
        },

        si: {
          type: String,
          required: true,
          trim: true,
        },

        ta: {
          type: String,
          required: true,
          trim: true,
        },
      },

      description: {
        en: {
          type: String,
          required: true,
          trim: true,
        },

        si: {
          type: String,
          required: true,
          trim: true,
        },

        ta: {
          type: String,
          required: true,
          trim: true,
        },
      },

      category: {
        type: String,
        required: true,
        trim: true,
      },

      date: {
        type: Date,
        required: true,
      },

      location: {
        type: String,
        required: true,
        trim: true,
      },

      createdBy: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        default: "Published",
        trim: true,
      },

      image: {
        type: String,
        default: "",
      },
    },

    {
      timestamps: true,
    }
  );

const VillageActivity =
  mongoose.models.VillageActivity ||
  mongoose.model(
    "VillageActivity",
    villageActivitySchema,
    "village_activities"
  );

/* =========================================================
<<<<<<< HEAD
   PORTAL RESOLUTION
========================================================= */

/*
   This is the important fix.

   It supports portal information already stored
   in MongoDB and also automatically maps the
   user's role to the correct portal.

   Therefore Youth & Sports:
   role = "youthsports"

   becomes:

   portal = "Youth & Sports"
*/

function getPortalForUser(user) {
  const existingPortal =
    user.portal ||
    user.assignedPortal ||
    user.portalType ||
    "";

  if (existingPortal) {
    return String(
      existingPortal
    ).trim();
  }

  const role =
    String(
      user.role || ""
    )
      .trim()
      .toLowerCase();

  const portalMap = {
    gnadmin: "GN",
    welfare: "Welfare",
    health: "Health",
    youthsports: "Youth & Sports",
    deathaid: "Death Aid",
    family: "Family",
  };

  return (
    portalMap[role] ||
    ""
  );
=======
   SEED DEFAULT VILLAGE ACTIVITIES
========================================================= */

async function seedVillageActivities() {
  try {
    const count =
      await VillageActivity.countDocuments();

    if (count > 0) {
      console.log(
        `Village activities already exist. Count: ${count}`
      );

      return;
    }

    const activities = [
      {
        title: {
          en: "Village Clean-Up Programme",

          si: "ගම් පිරිසිදු කිරීමේ වැඩසටහන",

          ta: "கிராம சுத்தப்படுத்தும் நிகழ்ச்சி",
        },

        description: {
          en: "Residents work together to keep the village clean and beautiful.",

          si: "ගමේ පිරිසිදුකම සහ අලංකාරය පවත්වා ගැනීමට ප්‍රදේශවාසීන් එක්ව කටයුතු කරයි.",

          ta: "கிராமத்தை சுத்தமாகவும் அழகாகவும் வைத்திருக்க மக்கள் ஒன்றிணைந்து செயல்படுகின்றனர்.",
        },

        category: "Community",

        date: new Date(
          "2026-10-05"
        ),

        location: "Village",

        createdBy: "gnadmin",

        status: "Published",

        image:
          "/images/activity1.jpg",
      },

      {
        title: {
          en: "Community Health Programme",

          si: "ප්‍රජා සෞඛ්‍ය වැඩසටහන",

          ta: "சமூக சுகாதார நிகழ்ச்சி",
        },

        description: {
          en: "Local residents participate in community health activities.",

          si: "ප්‍රදේශවාසීන් ප්‍රජා සෞඛ්‍ය කටයුතුවලට සහභාගී වේ.",

          ta: "உள்ளூர் மக்கள் சமூக சுகாதார நடவடிக்கைகளில் பங்கேற்கின்றனர்.",
        },

        category: "Health",

        date: new Date(
          "2026-10-10"
        ),

        location:
          "Community Hall",

        createdBy: "gnadmin",

        status: "Published",

        image:
          "/images/activity2.jpg",
      },

      {
        title: {
          en: "Village Cleaning Programme",

          si: "ගම් පිරිසිදු කිරීමේ වැඩසටහන",

          ta: "கிராம சுத்தப்படுத்தும் நிகழ்ச்சி",
        },

        description: {
          en: "Local residents work together to maintain the cleanliness of the village.",

          si: "ගමේ පිරිසිදුකම පවත්වා ගැනීමට ප්‍රදේශවාසීන් එක්ව කටයුතු කරයි.",

          ta: "கிராமத்தின் தூய்மையைப் பராமரிக்க உள்ளூர் மக்கள் ஒன்றிணைந்து செயல்படுகின்றனர்.",
        },

        category: "Environment",

        date: new Date(
          "2026-10-15"
        ),

        location:
          "Village Area",

        createdBy: "gnadmin",

        status: "Published",

        image:
          "/images/activity3.jpg",
      },

      {
        title: {
          en: "Community Awareness Programme",

          si: "ප්‍රජා දැනුවත් කිරීමේ වැඩසටහන",

          ta: "சமூக விழிப்புணர்வு நிகழ்ச்சி",
        },

        description: {
          en: "Community members take part in programmes that improve village knowledge and awareness.",

          si: "ගමේ දැනුම හා දැනුවත්භාවය වැඩිදියුණු කරන වැඩසටහන් සඳහා ප්‍රජා සාමාජිකයින් සහභාගී වේ.",

          ta: "கிராம மக்களின் அறிவையும் விழிப்புணர்வையும் மேம்படுத்தும் நிகழ்ச்சிகளில் சமூக உறுப்பினர்கள் பங்கேற்கின்றனர்.",
        },

        category: "Awareness",

        date: new Date(
          "2026-10-20"
        ),

        location:
          "Community Hall",

        createdBy: "gnadmin",

        status: "Published",

        image:
          "/images/activity4.jpg",
      },

      {
        title: {
          en: "Aid Distribution Programme",

          si: "සහනාධාර ලබාදීමේ වැඩසටහන",

          ta: "நிவாரண உதவி வழங்கும் நிகழ்ச்சி",
        },

        description: {
          en: "Aid and support are provided to families who need assistance.",

          si: "ආධාර අවශ්‍ය පවුල් සඳහා සහනාධාර සහ උපකාර ලබා දේ.",

          ta: "உதவி தேவைப்படும் குடும்பங்களுக்கு நிவாரண உதவிகள் வழங்கப்படுகின்றன.",
        },

        category: "Welfare",

        date: new Date(
          "2026-10-25"
        ),

        location:
          "GN Office",

        createdBy: "gnadmin",

        status: "Published",

        image:
          "/images/activity5.png",
      },

      {
        title: {
          en: "Women's Self-Employment Awareness Programme",

          si: "කාන්තා ස්වයං රැකියා පිළිබඳ දැනුවත් කිරීමේ වැඩසටහන",

          ta: "பெண்களுக்கான சுயதொழில் விழிப்புணர்வு நிகழ்ச்சி",
        },

        description: {
          en: "Awareness programmes on self-employment are conducted for women in the village.",

          si: "ගමේ කාන්තාවන් සඳහා ස්වයං රැකියා පිළිබඳ දැනුවත් කිරීමේ වැඩසටහන් පැවැත්වේ.",

          ta: "கிராம பெண்களுக்காக சுயதொழில் தொடர்பான விழிப்புணர்வு நிகழ்ச்சிகள் நடத்தப்படுகின்றன.",
        },

        category: "Women",

        date: new Date(
          "2026-10-30"
        ),

        location:
          "Community Hall",

        createdBy: "gnadmin",

        status: "Published",

        image:
          "/images/activity6.png",
      },

      {
        title: {
          en: "Tree Planting Programme",

          si: "රුක් රෝපණ වැඩසටහන",

          ta: "மர நடுகை நிகழ்ச்சி",
        },

        description: {
          en: "Residents participate in tree planting activities to improve the village environment.",

          si: "ගමේ පරිසරය වැඩිදියුණු කිරීම සඳහා ප්‍රදේශවාසීන් රුක් රෝපණ කටයුතුවලට සහභාගී වේ.",

          ta: "கிராம சுற்றுச்சூழலை மேம்படுத்த மக்கள் மர நடுகை நடவடிக்கைகளில் பங்கேற்கின்றனர்.",
        },

        category: "Environment",

        date: new Date(
          "2026-11-05"
        ),

        location:
          "Village Area",

        createdBy: "gnadmin",

        status: "Published",

        image:
          "/images/activity7.png",
      },
    ];

    await VillageActivity.insertMany(
      activities
    );

    console.log(
      "7 default village activities inserted into MongoDB."
    );
  } catch (error) {
    console.error(
      "Village activity seed error:",
      error
    );
  }
>>>>>>> kalpani-server-fix
}

/* =========================================================
   AUTHENTICATION
========================================================= */

function createToken(user) {
  const portal =
    getPortalForUser(user);

  return jwt.sign(
    {
      id: user._id,

      username:
        user.username,
<<<<<<< HEAD

      role:
        user.role,

      portal:

        portal,

=======
      role:
        user.role,
>>>>>>> kalpani-server-fix
      houseNumber:
        user.houseNumber || "",
      passwordVersion: user.passwordVersion || 0,
    },

    JWT_SECRET,

    {
      expiresIn: "7d",
    }
  );
}

function requiresPasswordChange(user) {
  return user?.mustChangePassword === true ||
    user?.mustChangePassword === "true";
}

async function authMiddleware(
  req,
  res,
  next
) {
  try {
    const authorization =
      req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message:
          "Authentication required.",
      });
    }

    const parts =
      authorization.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {
      return res.status(401).json({
        message:
          "Invalid authorization format.",
      });
    }

    req.user =
      jwt.verify(
        parts[1],
        JWT_SECRET
      );

    if (req.user.role === "family") {
      const current = await User.findById(req.user.id);
      if (!current || current.role !== "family") return res.status(401).json({ message: "Account not found." });
      if ((current.passwordVersion || 0) !== (req.user.passwordVersion || 0)) return res.status(401).json({ message: "Session expired. Log in again." });
      if (requiresPasswordChange(current) && req.path !== "/api/family/change-password") {
        return res.status(403).json({ message: "Change temporary password first.", mustChangePassword: true });
      }
      req.user.houseNumber = current.houseNumber;
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message:
        "Invalid or expired token.",
    });
  }
}

function roleMiddleware(
  ...roles
) {
  return (
    req,
    res,
    next
  ) => {
    if (!req.user) {
      return res.status(401).json({
        message:
          "Authentication required.",
      });
    }

    if (
      !roles.includes(
        req.user.role
      )
    ) {
      return res.status(403).json({
        message:
          "You do not have permission.",
      });
    }

    next();
  };
}

/* =========================================================
   DEFAULT PORTAL USERS
========================================================= */

async function createDefaultPortalUsers() {
  // Existing users are NEVER updated by this function.
  // No family account is auto-seeded here; existing family001 is preserved in MongoDB.
  const staff = [
    ["gnadmin", "GN", "GN Officer"],
    ["welfare", "Welfare", "Welfare Officer"],
    ["health", "Health", "Health Officer"],
    ["youthsports", "Youth & Sports", "Youth Sports Officer"],
    ["deathaid", "Death Aid", "Death Aid Officer"]
  ];
  for (const [username, portal, fullName] of staff) {
    const existing = await User.findOne({ username });
    if (existing) continue;
    // Do not silently create staff accounts with known hardcoded passwords.
    console.warn(`Missing staff account: ${username}. No account created.`);
  }
}

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,

      message:
        "GramaLK backend is running.",

      database:
        mongoose.connection
          .readyState === 1
          ? "connected"
          : "disconnected",

      gemini:
        Boolean(gemini),
    });
  }
);

/* =========================================================
   LOGIN
========================================================= */

app.post(
  "/api/login",
  async (
    req,
    res
  ) => {
    try {
      const {
        username = "",
        password = "",
        houseNumber = "",
      } = req.body;

      const loginUsername =
        String(
          username
        ).trim();

      const loginHouseNumber =
        String(
          houseNumber
        ).trim();

      if (
        !loginUsername &&
        !loginHouseNumber
      ) {
        return res.status(400).json({
          message:
            "Username or house number is required.",
        });
      }

      if (!password) {
        return res.status(400).json({
          message:
            "Password is required.",
        });
      }

      let user = null;

<<<<<<< HEAD
=======
      /* USERNAME LOGIN */

>>>>>>> kalpani-server-fix
      if (loginUsername) {
        user =
          await User.findOne({
            username:
              loginUsername,
          });
      }

<<<<<<< HEAD
=======
      /* HOUSE NUMBER LOGIN */

>>>>>>> kalpani-server-fix
      if (
        !user &&
        loginHouseNumber
      ) {
        user =
          await User.findOne({
            houseNumber:
              loginHouseNumber,
          });
      }

      if (!user) {
        return res.status(401).json({
          message:
            "Invalid username, house number or password.",
        });
      }

<<<<<<< HEAD
=======
      /* PASSWORD */

>>>>>>> kalpani-server-fix
      const passwordMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!passwordMatch) {
        return res.status(401).json({
          message:
            "Invalid username, house number or password.",
        });
      }

<<<<<<< HEAD
      /*
         Resolve portal from MongoDB / role.
      */
      const portal =
        getPortalForUser(user);
=======
      /* TOKEN */
>>>>>>> kalpani-server-fix

      /*
         Create JWT with portal.
      */
      const token =
        createToken(user);

<<<<<<< HEAD
      /*
         IMPORTANT:
         Portal information is now sent
         to the frontend.
      */

=======
>>>>>>> kalpani-server-fix
      return res.json({
        success: true,

        message:
          "Login successful.",

        token,

        user: {
          id:
            user._id,

          username:
            user.username,

          role:
            user.role,

          portal:
            portal,

          assignedPortal:
            portal,

          portalType:
            portal,

          houseNumber:
            user.houseNumber || "",
          mustChangePassword: requiresPasswordChange(user),

          fullName:
            user.fullName || "",

          email:
            user.email || "",
        },
      });
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Login failed.",
      });
    }
  }
);

/* =========================================================
   FAMILY PASSWORD CHANGE
========================================================= */

app.post(
  "/api/family/change-password",
  authMiddleware,
  async (req, res) => {
    try {
      if (req.user.role !== "family") {
        return res.status(403).json({
          message: "Family account required.",
        });
      }

      const {
        currentPassword = "",
        newPassword = "",
      } = req.body || {};

      if (
        typeof currentPassword !== "string" ||
        typeof newPassword !== "string" ||
        newPassword.length < 6 ||
        newPassword.length > 72
      ) {
        return res.status(400).json({
          message: "New password must contain 6-72 characters, including at least one letter and one number.",
        });
      }

      if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
        return res.status(400).json({
          message: "New password must include at least one letter and one number.",
        });
      }

      const user = await User.findById(req.user.id);

      if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
        return res.status(401).json({
          message: "Current password is incorrect.",
        });
      }

      if (currentPassword === newPassword) {
        return res.status(400).json({
          message: "Choose a different password.",
        });
      }

      const updated = await User.updateOne(
        { _id: user._id, password: user.password },
        {
          $set: {
            password: await bcrypt.hash(newPassword, 12),
            mustChangePassword: false,
            passwordVersion: (user.passwordVersion || 0) + 1,
          },
        }
      );

      if (updated.modifiedCount !== 1) {
        return res.status(409).json({
          message: "Password was changed elsewhere. Please log in again.",
        });
      }

      return res.json({
        success: true,
        message: "Password changed. Please log in again.",
      });
    } catch (error) {
      console.error("Family password change failed:", error);
      return res.status(500).json({
        message: "Password change failed.",
      });
    }
  }
);

/* =========================================================
   CURRENT USER
========================================================= */

app.get(
  "/api/me",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select(
          "-password"
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found.",
        });
      }

      const portal =
        getPortalForUser(user);

      return res.json({
        success: true,

        user: {
          ...user.toObject(),

          portal:
            portal,

          assignedPortal:
            portal,

          portalType:
            portal,
        },
      });
    } catch (error) {
      console.error(
        "Get current user error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to load user.",
      });
    }
  }
);

/* =========================================================
   OFFICES
========================================================= */

app.get(
  "/api/offices",
  async (
    req,
    res
  ) => {
    try {
      const offices =
        await Office.find()
          .sort({
            createdAt: -1,
          })
          .lean();

      return res.json(
        offices
      );
    } catch (error) {
      console.error(
        "Get offices error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to load offices.",
      });
    }
  }
);

app.post(
  "/api/offices",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const office =
        await Office.create(
          req.body
        );

      return res.status(201).json(
        office
      );
    } catch (error) {
      console.error(
        "Create office error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to create office.",
      });
    }
  }
);

/* =========================================================
   GOVERNMENT OFFICES
========================================================= */

app.get(
  "/api/government-offices",
  async (
    req,
    res
  ) => {
    try {
      const offices =
        await GovernmentOffice
          .find()
          .sort({
            createdAt: -1,
          })
          .lean();

      return res.json(
        offices
      );
    } catch (error) {
      console.error(
        "Get government offices error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to load government offices.",
      });
    }
  }
);

/* =========================================================
   FORMS
========================================================= */

app.get(
  "/api/forms",
  async (
    req,
    res
  ) => {
    try {
      const forms =
        await Form.find()
          .sort({
            createdAt: -1,
          })
          .lean();

      return res.json(
        forms
      );
    } catch (error) {
      console.error(
        "Get forms error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to load forms.",
      });
    }
  }
);

app.post(
  "/api/forms",
  authMiddleware,
  formUpload.single(
    "file"
  ),
  async (
    req,
    res
  ) => {
    try {
      const data = {
        ...req.body,
      };

      if (req.file) {
        data.fileName =
          req.file.filename;

        data.fileUrl =
          `/uploads/forms/${req.file.filename}`;
      }

      data.createdBy =
        req.user.username;

      const form =
        await Form.create(
          data
        );

      return res.status(201).json(
        form
      );
    } catch (error) {
      console.error(
        "Create form error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to create form.",
      });
    }
  }
);

/* =========================================================
   ANNOUNCEMENTS
========================================================= */

app.get(
  "/api/announcements",
  async (
    req,
    res
  ) => {
    try {
      const announcements =
        await Announcement
          .find()
          .sort({
            createdAt: -1,
          })
          .lean();

      return res.json(
        announcements
      );
    } catch (error) {
      console.error(
        "Get announcements error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to load announcements.",
      });
    }
  }
);

app.post(
  "/api/announcements",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const announcement =
        await Announcement.create(
          req.body
        );

      return res.status(201).json(
        announcement
      );
    } catch (error) {
      console.error(
        "Create announcement error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to create announcement.",
      });
    }
  }
);

/* =========================================================
   COMPLAINTS
   PUBLIC - NO LOGIN REQUIRED
========================================================= */

app.post(
  "/api/complaints",
<<<<<<< HEAD
  complaintUpload.single(
    "image"
  ),
=======
  complaintUpload.single("image"),
>>>>>>> kalpani-server-fix
  async (
    req,
    res
  ) => {
    try {
      const {
        type = "",
        officer = "",
        location = "",
        description = "",
        houseNumber = "",
      } = req.body;

<<<<<<< HEAD
        status:
          req.body.status ||
          "Pending",
      };
=======
      /* VALIDATION */

      if (
        !type.trim() ||
        !officer.trim() ||
        !location.trim() ||
        !description.trim()
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Please fill all required complaint fields.",
        });
      }

      /* REFERENCE NUMBER */

      const referenceNo =
        "CMP-" +
        Date.now() +
        "-" +
        Math.floor(
          1000 +
            Math.random() *
              9000
        );

      /* IMAGE */

      let imageUrl = "";
>>>>>>> kalpani-server-fix

      if (req.user) {
        data.username =
          req.user.username;

        data.houseNumber =
          req.body.houseNumber ||
          req.user.houseNumber ||
          "";
      } else {
        data.username =
          req.body.username ||
          "Anonymous";

        data.houseNumber =
          req.body.houseNumber ||
          "";
      }

      if (req.file) {
        imageUrl =
          `/uploads/complaints/${req.file.filename}`;

        data.imageName =
          req.file.originalname;
      }

      /* SAVE */

<<<<<<< HEAD
=======
      const complaint =
        await Complaint.create({
          referenceNo,

          type:
            type.trim(),

          officer:
            officer.trim(),

          location:
            location.trim(),

          description:
            description.trim(),

          houseNumber:
            houseNumber.trim(),

          imageUrl,

          status:
            "Pending",

          isAnonymous:
            true,

          submittedBy:
            "Public User",
        });

      console.log(
        "================================"
      );

      console.log(
        "COMPLAINT SAVED TO MONGODB"
      );

      console.log(
        "Reference:",
        complaint.referenceNo
      );

      console.log(
        "================================"
      );

>>>>>>> kalpani-server-fix
      return res.status(201).json({
        success: true,

        message:
          "Complaint submitted successfully.",

<<<<<<< HEAD
=======
        referenceNo:
          complaint.referenceNo,

>>>>>>> kalpani-server-fix
        complaint,
      });
    } catch (error) {
      console.error(
<<<<<<< HEAD
        "Create complaint error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to submit complaint.",
      });
    }
  }
);

/* =========================================================
   COMPLAINT LIST
========================================================= */

app.get(
  "/api/complaints",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const staffRoles = [
        "gnadmin",
        "welfare",
        "health",
        "youthsports",
        "deathaid",
      ];

      let complaints;

      if (
        staffRoles.includes(
          req.user.role
        )
      ) {
        complaints =
          await Complaint
            .find()
            .sort({
              createdAt: -1,
            })
            .lean();
      } else {
        complaints =
          await Complaint
            .find({
              username:
                req.user.username,
            })
            .sort({
              createdAt: -1,
            })
            .lean();
      }

      return res.json(
        complaints
      );
    } catch (error) {
      console.error(
        "Get complaints error:",
        error
      );

      return res.status(500).json({
=======
        "COMPLAINT SAVE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

>>>>>>> kalpani-server-fix
        message:
          "Failed to save complaint to database.",

        error:
          error.message,
      });
    }
  }
);

/* =========================================================
   CHATS
========================================================= */

app.get(
  "/api/chats",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const chats =
        await Chat.find({
          $or: [
            {
              username:
                req.user.username,
            },

            {
              userId:
                req.user.id,
            },
          ],
        }).sort({
          createdAt: 1,
        });

      return res.json(
        chats
      );
    } catch (error) {
      console.error(
        "Get chats error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to load chats.",
      });
    }
  }
);

app.post(
  "/api/chats",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const chat =
        await Chat.create({
          ...req.body,

          username:
            req.user.username,

          userId:
            req.user.id,
        });

      return res.status(201).json(
        chat
      );
    } catch (error) {
      console.error(
        "Create chat error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to save chat.",
      });
    }
  }
);

/* =========================================================
   OFFICERS
========================================================= */

app.get(
  "/api/officers",
  async (
    req,
    res
  ) => {
    try {
      const officers =
        await Officer.find()
          .sort({
            createdAt: -1,
          })
          .lean();

      return res.json(
        officers
      );
    } catch (error) {
      console.error(
        "Get officers error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to load officers.",
      });
    }
  }
);

app.post(
  "/api/officers",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const officer =
        await Officer.create(
          req.body
        );

      return res.status(201).json(
        officer
      );
    } catch (error) {
      console.error(
        "Create officer error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to create officer.",
      });
    }
  }
);

/* =========================================================
   VILLAGE ACTIVITIES API
========================================================= */

/* GET - PUBLIC */

app.get(
  "/api/village-activities",
  async (
    req,
    res
  ) => {
    try {
      const activities =
        await VillageActivity
          .find({
            status: "Published",
          })
          .sort({
<<<<<<< HEAD
            createdAt: -1,
          })
          .lean();
=======
            date: 1,
          });
>>>>>>> kalpani-server-fix

      return res.json(
        activities
      );
    } catch (error) {
      console.error(
        "Get village activities error:",
        error
      );

<<<<<<< HEAD
      return res.status(500).json({
=======
      res.status(500).json({
        success: false,

>>>>>>> kalpani-server-fix
        message:
          "Failed to load village activities.",
      });
    }
  }
);

/* POST - LOGIN REQUIRED */

app.post(
  "/api/village-activities",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const {
        title,
        description,
        category,
        date,
        location,
        status,
        image,
      } = req.body;

<<<<<<< HEAD
      return res.status(201).json(
        activity
      );
=======
      if (
        !title?.en ||
        !title?.si ||
        !title?.ta ||
        !description?.en ||
        !description?.si ||
        !description?.ta ||
        !category ||
        !date ||
        !location
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Please fill all required activity fields.",
        });
      }

      const activity =
        await VillageActivity.create({
          title,

          description,

          category:
            category.trim(),

          date:
            new Date(date),

          location:
            location.trim(),

          createdBy:
            req.user.username,

          status:
            status?.trim() ||
            "Published",

          image:
            image?.trim() || "",
        });

      res.status(201).json({
        success: true,

        message:
          "Village activity created successfully.",

        activity,
      });
>>>>>>> kalpani-server-fix
    } catch (error) {
      console.error(
        "Create village activity error:",
        error
      );

<<<<<<< HEAD
      return res.status(500).json({
=======
      res.status(500).json({
        success: false,

>>>>>>> kalpani-server-fix
        message:
          "Failed to create village activity.",

        error:
          error.message,
      });
    }
  }
);

/* =========================================================
   WELFARE FUNDS
========================================================= */

app.get(
  "/api/welfare/funds",
  async (
    req,
    res
  ) => {
    try {
      const welfareFunds =
        mongoose.connection.db
          ? await mongoose.connection
              .db
              .collection(
                "welfarefunds"
              )
              .find({})
              .sort({
                createdAt: -1,
              })
              .toArray()
          : [];

      return res.json(
        welfareFunds
      );
    } catch (error) {
      console.error(
        "Get welfare funds error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to load welfare funds.",
      });
    }
  }
);

/* =========================================================
   GEMINI WEBSITE CONTEXT
========================================================= */

async function getWebsiteContext() {
  try {
    const [
      offices,
      governmentOffices,
      forms,
      announcements,
      officers,
      activities,
    ] =
      await Promise.all([
        Office.find().lean(),

        GovernmentOffice
          .find()
          .lean(),

        Form.find().lean(),

        Announcement
          .find()
          .lean(),

        Officer.find().lean(),

        VillageActivity
          .find()
          .lean(),
      ]);

    return {
      offices,

      governmentOffices,

      forms,

      announcements,

      officers,

      activities,
    };
  } catch (error) {
    console.error(
      "Website context error:",
      error
    );

    return {
      offices: [],

      governmentOffices: [],

      forms: [],

      announcements: [],

      officers: [],

      activities: [],
    };
  }
}

/* =========================================================
   GEMINI
========================================================= */

async function tryGemini(
  message,
  context
) {
  if (!gemini) {
    return null;
  }

  const prompt = `
You are the GramaLK government services assistant.

Answer clearly and simply.

Use ONLY the information available in the
GramaLK database when answering questions
about GramaLK services.

Do not invent offices, officers, forms,
announcements, activities, contacts,
or government information.

If the requested information is not available,
say:

"That information is not currently available
in the GramaLK database."

Do not guess.

OFFICES:
${JSON.stringify(
  context.offices,
  null,
  2
)}

GOVERNMENT OFFICES:
${JSON.stringify(
  context.governmentOffices,
  null,
  2
)}

FORMS:
${JSON.stringify(
  context.forms,
  null,
  2
)}

ANNOUNCEMENTS:
${JSON.stringify(
  context.announcements,
  null,
  2
)}

OFFICERS:
${JSON.stringify(
  context.officers,
  null,
  2
)}

VILLAGE ACTIVITIES:
${JSON.stringify(
  context.activities,
  null,
  2
)}

USER QUESTION:
${message}
`;

  try {
    const response =
      await gemini.models.generateContent({
        model:
          "gemini-2.5-flash",

        contents:
          prompt,
      });

    if (
      response &&
      response.text
    ) {
      return response.text;
    }

    return null;
  } catch (error) {
    console.error(
      "Gemini error:",
      error.message
    );

    return null;
  }
}

/* =========================================================
   CHATBOT
========================================================= */

app.post(
  "/api/chat",
  async (
    req,
    res
  ) => {
    try {
      const message =
        req.body.message;

      if (
        !message ||
        !message.trim()
      ) {
        return res.status(400).json({
          message:
            "Message is required.",
        });
      }

      const context =
        await getWebsiteContext();

      const answer =
        await tryGemini(
          message.trim(),
          context
        );

      if (answer) {
        return res.json({
          success: true,

          reply:
            answer,
        });
      }

      return res.json({
        success: false,

        reply:
          "Sorry, I could not process your request right now. Please try again.",
      });
    } catch (error) {
      console.error(
        "Chat error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Chat service failed.",
      });
    }
  }
);

/* =========================================================
   GN ROUTES
========================================================= */

app.post(
  "/api/gn/villagers",
  authMiddleware,
  roleMiddleware("gnadmin"),
  async (req, res) => {
    let createdAccountId;
    try {
      const houseNumber =
        typeof req.body?.houseNumber === "string"
          ? req.body.houseNumber.trim()
          : "";

      if (!houseNumber || houseNumber.length > 32) {
        return res.status(400).json({
          message: "Enter a valid house number (1-32 characters).",
        });
      }

      const matchingAccount = await User.findOne({
        $or: [
          { houseNumber },
          { username: houseNumber },
        ],
      });

      if (matchingAccount && matchingAccount.role !== "family") {
        return res.status(409).json({
          message: "This house number is already assigned to a non-family account.",
        });
      }

      let familyAccount;
      if (!matchingAccount) {
        const passwordHash = await bcrypt.hash(houseNumber, 12);
        const account = await User.create({
          username: houseNumber,
          houseNumber,
          role: "family",
          portal: "Family",
          assignedPortal: "Family",
          password: passwordHash,
          mustChangePassword: true,
          passwordVersion: 0,
        });
        createdAccountId = account._id;
        familyAccount = {
          username: houseNumber,
          temporaryPassword: houseNumber,
        };
      }

      const villager = await FamilyVillager.create({
        ...req.body,
        houseNumber,
      });

      return res.status(201).json({
        ...villager.toObject(),
        ...(familyAccount ? { familyAccount } : {}),
      });
    } catch (error) {
      if (createdAccountId) {
        try {
          await User.deleteOne({ _id: createdAccountId });
        } catch (rollbackError) {
          console.error("Failed to roll back family account after villager registration error:", rollbackError);
        }
      }
      console.error("GN villager registration failed:", error);
      return res.status(500).json({
        message: "Failed to register villager and family account.",
      });
    }
  }
);

if (gnRoutes) {
  app.use(
    "/api/gn",
    gnRoutes
  );
}

/* =========================================================
   FAMILY PORTAL ROUTES
========================================================= */

// Get family members belonging to the logged-in household
app.get(
  "/api/family/members",
  authMiddleware,
  roleMiddleware("family"),
  async (req, res) => {
    try {
      // House number comes from the logged-in user's JWT token
      const houseNumber = req.user.houseNumber;

      if (!houseNumber) {
        return res.status(400).json({
          success: false,
          message: "House number is not available.",
        });
      }

      // Get only villagers who belong to this house
      const members = await FamilyVillager.find({
        houseNumber: houseNumber,
      })
        .sort({ fullName: 1 })
        .lean();

      return res.json({
        success: true,
        houseNumber: houseNumber,
        members: members,
      });
    } catch (error) {
      console.error(
        "Family members load error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to load family members.",
      });
    }
  }
);

/* =========================================================
   FAMILY MEMBER MANAGEMENT
========================================================= */

// Add a new member to the logged-in household
app.post(
  "/api/family/members",
  authMiddleware,
  roleMiddleware("family"),
  async (req, res) => {
    try {
      const houseNumber = req.user.houseNumber;

      const member = await FamilyVillager.create({
        ...req.body,

        // Never trust a house number sent from the browser
        houseNumber: houseNumber,
      });

      res.status(201).json({
        success: true,
        member,
      });
    } catch (error) {
      console.error("Add family member error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to add family member.",
      });
    }
  }
);

// Edit a member only if that member belongs to this house
app.put(
  "/api/family/members/:id",
  authMiddleware,
  roleMiddleware("family"),
  async (req, res) => {
    try {
      const houseNumber = req.user.houseNumber;

      const member =
        await FamilyVillager.findOneAndUpdate(
          {
            _id: req.params.id,
            houseNumber: houseNumber,
          },
          {
            ...req.body,
            houseNumber: houseNumber,
          },
          {
            new: true,
          }
        );

      if (!member) {
        return res.status(404).json({
          success: false,
          message: "Family member not found.",
        });
      }

      res.json({
        success: true,
        member,
      });
    } catch (error) {
      console.error("Update family member error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update family member.",
      });
    }
  }
);

// Delete only a member belonging to the logged-in house
app.delete(
  "/api/family/members/:id",
  authMiddleware,
  roleMiddleware("family"),
  async (req, res) => {
    try {
      const houseNumber = req.user.houseNumber;

      const member =
        await FamilyVillager.findOneAndDelete({
          _id: req.params.id,
          houseNumber: houseNumber,
        });

      if (!member) {
        return res.status(404).json({
          success: false,
          message: "Family member not found.",
        });
      }

      res.json({
        success: true,
        message: "Family member deleted.",
      });
    } catch (error) {
      console.error("Delete family member error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete family member.",
      });
    }
  }
);


/* =========================================================
   CREATE FAMILY APPOINTMENT
========================================================= */

app.post(
  "/api/family/appointments",
  authMiddleware,
  roleMiddleware("family"),
  async (req, res) => {
    try {
      const {
        memberId,
        provider,
        date,
        time,
        purpose,
        description,
      } = req.body;

      // Check required fields
      if (
        !memberId ||
        !provider ||
        !date ||
        !time ||
        !purpose
      ) {
        return res.status(400).json({
          success: false,
          message: "Please complete all required fields.",
        });
      }

      // Make sure the selected family member
      // belongs to the logged-in household
      const member = await FamilyVillager.findOne({
        _id: memberId,
        houseNumber: req.user.houseNumber,
      });

      if (!member) {
        return res.status(404).json({
          success: false,
          message: "Family member not found.",
        });
      }

      // ================= GN APPOINTMENT =================
      if (provider === "GN Officer") {
        const appointment =
          await FamilyGNAppointment.create({
            // MongoDB validator requires an ObjectId
            userId: member._id,

            // MongoDB validator requires Date type
            date: new Date(date),

            time: time,
            purpose: purpose,

            // Optional additional information
            description: description || "",

            // Allowed by existing MongoDB validator
            status: "Pending",
          });

        return res.status(201).json({
          success: true,
          appointment,
        });
      }

      // ================= PHI / MIDWIFE =================
      // These are stored separately because the existing
      // GN appointments collection is specifically for GN.
      const healthAppointment =
        await FamilyHealthAppointment.create({
          userId: member._id,

          villagerName: member.fullName,

          houseNumber: req.user.houseNumber,

          provider: provider,

          date: new Date(date),

          time: time,

          purpose: purpose,

          description: description || "",

          status: "Pending",

          requestedBy: req.user.username,
        });

      return res.status(201).json({
        success: true,
        appointment: healthAppointment,
      });
    } catch (error) {
      console.error(
        "Create family appointment error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to create appointment.",
      });
    }
  }
);

/* =========================================================
   GET FAMILY APPOINTMENTS
========================================================= */

app.get(
  "/api/family/appointments",
  authMiddleware,
  roleMiddleware("family"),
  async (req, res) => {
    try {
      const houseNumber = req.user.houseNumber;

      // Get all members belonging to this household
      const familyMembers = await FamilyVillager.find({
        houseNumber: houseNumber,
      }).lean();

      const memberIds = familyMembers.map(
        (member) => member._id
      );

      // GN appointments are linked using userId
      const gnAppointments =
        await FamilyGNAppointment.find({
          userId: { $in: memberIds },
        })
          .sort({ createdAt: -1 })
          .lean();

      // Add information needed by Family Portal UI
      const formattedGNAppointments =
        gnAppointments.map((appointment) => {
          const member = familyMembers.find(
            (item) =>
              String(item._id) ===
              String(appointment.userId)
          );

          return {
            ...appointment,

            provider: "GN Officer",

            villagerName:
              member?.fullName || "Family Member",

            houseNumber: houseNumber,
          };
        });

      // PHI / Midwife requests
      const healthAppointments =
        await FamilyHealthAppointment.find({
          houseNumber: houseNumber,
        })
          .sort({ createdAt: -1 })
          .lean();

      const formattedHealthAppointments =
        healthAppointments.map((appointment) => ({
          ...appointment,

          villagerName:
            appointment.villagerName ||
            familyMembers.find(
              (item) =>
                String(item._id) ===
                String(appointment.userId)
            )?.fullName ||
            "Family Member",
        }));

      // Send both types to the frontend
      const appointments = [
        ...formattedGNAppointments,
        ...formattedHealthAppointments,
      ].sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      return res.json({
        success: true,
        appointments,
      });
    } catch (error) {
      console.error(
        "Load family appointments error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to load appointments.",
      });
    }
  }
);


/* =========================================================
   HEALTH PORTAL API
========================================================= */

// Health staff-only access
function healthStaffOnly(req, res, next) {
  const role = String(req.user?.role || "").toLowerCase();
  const portal = String(req.user?.portal || "").toLowerCase();

  if (
    role !== "health" &&
    portal !== "health"
  ) {
    return res.status(403).json({
      success: false,
      message: "Health Portal access required.",
    });
  }

  next();
}

// GET: Health Portal dashboard data
app.get(
  "/api/health-portal/dashboard",
  authMiddleware,
  healthStaffOnly,
  async (req, res) => {
    try {
      const [mothers, requests, announcements] = await Promise.all([
        FamilyVillager.find({
          $or: [
            { category: /mother/i },
            { relationship: /mother/i },
            { isMother: true },
            { pregnancyStatus: { $exists: true, $ne: "" } },
          ],
        }).lean(),

        FamilyHealthAppointment.find({})
          .sort({ createdAt: -1 })
          .lean(),

        Announcement.find({
          $or: [
            { portal: /health/i },
            { audience: /health/i },
            { category: /health/i },
            { portal: { $exists: false } },
          ],
        })
          .sort({ createdAt: -1 })
          .lean(),
      ]);

      res.json({
        success: true,
        stats: {
          mothers: mothers.length,
          totalRequests: requests.length,
          pendingRequests: requests.filter(
            (item) => item.status === "Pending"
          ).length,
          announcements: announcements.length,
        },
        mothers,
        requests,
        announcements,
      });
    } catch (error) {
      console.error("Health dashboard error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to load Health Portal dashboard.",
      });
    }
  }
);

// GET: All PHI / Midwife appointment requests
app.get(
  "/api/health-portal/requests",
  authMiddleware,
  healthStaffOnly,
  async (req, res) => {
    try {
      const requests = await FamilyHealthAppointment.find({})
        .sort({ createdAt: -1 })
        .lean();

      res.json({
        success: true,
        requests,
      });
    } catch (error) {
      console.error("Health requests error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to load health requests.",
      });
    }
  }
);

// PUT: Update appointment request status
app.put(
  "/api/health-portal/requests/:id",
  authMiddleware,
  healthStaffOnly,
  async (req, res) => {
    try {
      const allowedStatuses = [
        "Pending",
        "Approved",
        "Resolved",
        "Rejected",
      ];

      const status = String(req.body?.status || "");

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid request status.",
        });
      }

      const request = await FamilyHealthAppointment.findByIdAndUpdate(
        req.params.id,
        { $set: { status } },
        { new: true, runValidators: true }
      );

      if (!request) {
        return res.status(404).json({
          success: false,
          message: "Appointment request not found.",
        });
      }

      res.json({
        success: true,
        message: "Request status updated.",
        request,
      });
    } catch (error) {
      console.error("Update health request error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update request.",
      });
    }
  }
);

// POST: Create a Health Portal announcement
app.post(
  "/api/health-portal/announcements",
  authMiddleware,
  healthStaffOnly,
  async (req, res) => {
    try {
      const title = String(req.body?.title || "").trim();
      const message = String(
        req.body?.message || req.body?.description || ""
      ).trim();

      if (!title || !message) {
        return res.status(400).json({
          success: false,
          message: "Title and message are required.",
        });
      }

      const announcement = await Announcement.create({
        title,
        message,
        description: message,
        portal: "Health",
        audience: "Health",
        category: "Health",
        createdBy: req.user.username,
        createdAt: new Date(),
      });

      res.status(201).json({
        success: true,
        message: "Announcement published.",
        announcement,
      });
    } catch (error) {
      console.error("Create health announcement error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to publish announcement.",
      });
    }
  }
); 

/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "Server error:",
      error
    );

    if (
      error instanceof
      multer.MulterError
    ) {
      return res.status(400).json({
        success: false,

        message:
          `Upload error: ${error.message}`,

        field:
          error.field || "",
      });
    }

    if (
      error &&
      error.message ===
        "Only PDF files are allowed."
    ) {
      return res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }

<<<<<<< HEAD
    return res.status(500).json({
=======
    res.status(500).json({
>>>>>>> kalpani-server-fix
      success: false,

      message:
        error.message ||
        "Internal server error.",
    });
  }
);

/* =========================================================
   START SERVER
========================================================= */

async function startServer() {
  try {
<<<<<<< HEAD
    await mongoose.connect(
      mongoURI
    );

    console.log(
      "================================"
    );

    console.log(
      "MongoDB Atlas Connected Successfully!"
    );

    console.log(
      "Database:",
      mongoDatabase
    );

    console.log(
      "================================"
    );

    await createDefaultPortalUsers();

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          "================================"
        );

        console.log(
          `GramaLK backend running on port ${PORT}`
        );

        console.log(
          `Local: http://localhost:${PORT}`
        );

        console.log(
          `Network: http://0.0.0.0:${PORT}`
        );

        console.log(
          "MongoDB: Atlas"
        );

        console.log(
          `Gemini: ${Boolean(gemini)}`
        );

        console.log(
          "Portals: Enabled"
        );

        console.log(
          "================================"
        );
      }
    );
  } catch (error) {
    console.error(
      "================================"
    );

    console.error(
      "SERVER STARTUP ERROR:"
    );

    console.error(
      error.message
=======
    /* ---------------------------------------------
       CONNECT TO MONGODB
    --------------------------------------------- */

    await mongoose.connect(
      mongoURI
    );

    console.log(
      "================================="
    );

    console.log(
      "MongoDB Atlas Connected Successfully!"
    );

    console.log(
      "Database:",
      mongoDatabase
    );

    console.log(
      "================================="
    );

    /* ---------------------------------------------
       CREATE / UPDATE DEFAULT USERS
    --------------------------------------------- */

    await createDefaultPortalUsers();

    /* ---------------------------------------------
       INSERT DEFAULT VILLAGE ACTIVITIES
       ONLY IF COLLECTION IS EMPTY
    --------------------------------------------- */

    await seedVillageActivities();

    /* ---------------------------------------------
       START EXPRESS SERVER
    --------------------------------------------- */

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          "================================"
        );

        console.log(
          `GramaLK backend running on port ${PORT}`
        );

        console.log(
          `Local: http://localhost:${PORT}`
        );

        console.log(
          `Network: http://0.0.0.0:${PORT}`
        );

        console.log(
          "MongoDB: Atlas"
        );

        console.log(
          "Portals: Enabled"
        );

        console.log(
          "Complaints: Public"
        );

        console.log(
          "Village Activities: MongoDB"
        );

        console.log(
          "================================"
        );
      }
    );
  } catch (error) {
    console.error(
      "================================"
    );

    console.error(
      "SERVER STARTUP ERROR"
    );

    console.error(
      error
>>>>>>> kalpani-server-fix
    );

    console.error(
      "================================"
    );

    process.exit(1);
  }
}

/* =========================================================
<<<<<<< HEAD
   RUN SERVER
========================================================= */

startServer();
=======
   START
========================================================= */

startServer(); 
>>>>>>> kalpani-server-fix
