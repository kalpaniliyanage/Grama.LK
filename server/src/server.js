import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
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

const JWT_SECRET =
  process.env.JWT_SECRET || "gramalk-development-secret";

/* =========================================================
   GEMINI
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
   MONGODB ATLAS CONFIGURATION
========================================================= */

const mongoUsername =
  process.env.MONGO_USERNAME;

const mongoPassword =
  process.env.MONGO_PASSWORD;

const mongoCluster =
  process.env.MONGO_CLUSTER;

const mongoDatabase =
  process.env.MONGO_DATABASE || "gramalk";

if (
  !mongoUsername ||
  !mongoPassword ||
  !mongoCluster
) {
  console.error(
    "MongoDB environment variables are missing."
  );

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
    path.join(ROOT, "uploads")
  )
);

/* =========================================================
   MULTER - COMPLAINT UPLOADS
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

      cb(
        null,
        `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${extension}`
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
   MULTER - FORM PDF UPLOADS
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

      cb(
        null,
        `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${extension}`
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
        cb(null, true);
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
   USER MODEL
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
  );
}

/* =========================================================
   OFFICE
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

/* =========================================================
   GOVERNMENT OFFICES
========================================================= */

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

/* =========================================================
   FORM
========================================================= */

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

/* =========================================================
   ANNOUNCEMENT
========================================================= */

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

/* =========================================================
   COMPLAINT
========================================================= */

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

/* =========================================================
   CHAT
========================================================= */

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

/* =========================================================
   OFFICER
========================================================= */

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

/* =========================================================
   VILLAGE ACTIVITIES MODEL
========================================================= */

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
}

/* =========================================================
   AUTHENTICATION
========================================================= */

function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username:
        user.username,
      role:
        user.role,
      houseNumber:
        user.houseNumber || "",
    },

    JWT_SECRET,

    {
      expiresIn: "7d",
    }
  );
}

function authMiddleware(
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
        username.trim();

      const loginHouseNumber =
        houseNumber.trim();

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

      /* USERNAME LOGIN */

      if (loginUsername) {
        user =
          await User.findOne({
            username:
              loginUsername,
          });
      }

      /* HOUSE NUMBER LOGIN */

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

      /* PASSWORD */

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

      /* TOKEN */

      const token =
        createToken(user);

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

          houseNumber:
            user.houseNumber || "",

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

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.error(
        "Get current user error:",
        error
      );

      res.status(500).json({
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
          });

      res.json(offices);
    } catch (error) {
      console.error(
        "Get offices error:",
        error
      );

      res.status(500).json({
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

      res.status(201).json(
        office
      );
    } catch (error) {
      console.error(
        "Create office error:",
        error
      );

      res.status(500).json({
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
          });

      res.json(offices);
    } catch (error) {
      console.error(
        "Get government offices error:",
        error
      );

      res.status(500).json({
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
          });

      res.json(forms);
    } catch (error) {
      console.error(
        "Get forms error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to load forms.",
      });
    }
  }
);

app.post(
  "/api/forms",
  authMiddleware,
  formUpload.single("file"),
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

      res.status(201).json(
        form
      );
    } catch (error) {
      console.error(
        "Create form error:",
        error
      );

      res.status(500).json({
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
          });

      res.json(
        announcements
      );
    } catch (error) {
      console.error(
        "Get announcements error:",
        error
      );

      res.status(500).json({
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

      res.status(201).json(
        announcement
      );
    } catch (error) {
      console.error(
        "Create announcement error:",
        error
      );

      res.status(500).json({
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
  complaintUpload.single("image"),
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

      if (req.file) {
        imageUrl =
          `/uploads/complaints/${req.file.filename}`;
      }

      /* SAVE */

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

      return res.status(201).json({
        success: true,

        message:
          "Complaint submitted successfully.",

        referenceNo:
          complaint.referenceNo,

        complaint,
      });
    } catch (error) {
      console.error(
        "COMPLAINT SAVE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

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

      res.json(chats);
    } catch (error) {
      console.error(
        "Get chats error:",
        error
      );

      res.status(500).json({
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

      res.status(201).json(
        chat
      );
    } catch (error) {
      console.error(
        "Create chat error:",
        error
      );

      res.status(500).json({
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
          });

      res.json(officers);
    } catch (error) {
      console.error(
        "Get officers error:",
        error
      );

      res.status(500).json({
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

      res.status(201).json(
        officer
      );
    } catch (error) {
      console.error(
        "Create officer error:",
        error
      );

      res.status(500).json({
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
            date: 1,
          });

      res.json(
        activities
      );
    } catch (error) {
      console.error(
        "Get village activities error:",
        error
      );

      res.status(500).json({
        success: false,

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
    } catch (error) {
      console.error(
        "Create village activity error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to create village activity.",

        error:
          error.message,
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
    ] = await Promise.all([
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
      "Context error:",
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

Use only the information available in the
GramaLK database when answering questions
about GramaLK services.

Do not invent offices, officers, forms,
announcements, activities, contacts or
government information.

If information is not available, say that
it is not currently available in the
GramaLK database.

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
      await gemini.models.generateContent(
        {
          model:
            "gemini-3.8-flash",

          contents:
            prompt,
        }
      );

    if (
      response &&
      response.text
    ) {
      return response.text;
    }
  } catch (error) {
    console.error(
      "Gemini error:",
      error.message
    );
  }

  return null;
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

      res.json({
        success: true,

        reply:
          "Sorry, I could not process your request right now. Please try again.",
      });
    } catch (error) {
      console.error(
        "Chat error:",
        error
      );

      res.status(500).json({
        message:
          "Chat service failed.",
      });
    }
  }
);

/* =========================================================
   ERROR HANDLER
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

    res.status(500).json({
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
    );

    console.error(
      "================================"
    );

    process.exit(1);
  }
}

/* =========================================================
   START
========================================================= */

startServer(); 