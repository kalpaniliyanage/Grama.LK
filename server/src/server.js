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

const geminiApiKey = process.env.GEMINI_API_KEY?.trim();

const gemini = geminiApiKey
  ? new GoogleGenAI({
      apiKey: geminiApiKey,
    })
  : null;

console.log(
  `Gemini API key loaded: ${Boolean(gemini)}`
);

/* =========================================================
   MONGODB ATLAS
========================================================= */

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;
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
  `mongodb+srv://${encodeURIComponent(mongoUsername)}:` +
  `${encodeURIComponent(mongoPassword)}@${mongoCluster}/` +
  `${mongoDatabase}?authSource=admin`;

try {
  await mongoose.connect(mongoURI);

  console.log("=================================");
  console.log(
    "MongoDB Atlas Connected Successfully!"
  );
  console.log("Database:", mongoDatabase);
  console.log("=================================");
} catch (error) {
  console.error("MongoDB Connection Failed:");
  console.error(error.message);
  process.exit(1);
}

/* =========================================================
   DIRECTORIES
========================================================= */

const complaintUploadDir = path.join(
  ROOT,
  "uploads",
  "complaints"
);

const formUploadDir = path.join(
  ROOT,
  "uploads",
  "forms"
);

fs.mkdirSync(complaintUploadDir, {
  recursive: true,
});

fs.mkdirSync(formUploadDir, {
  recursive: true,
});

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
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
  express.static(path.join(ROOT, "uploads"))
);

/* =========================================================
   MULTER
========================================================= */

const complaintStorage =
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, complaintUploadDir);
    },

    filename: (req, file, cb) => {
      const extension =
        path.extname(file.originalname);

      cb(
        null,
        `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${extension}`
      );
    },
  });

const complaintUpload = multer({
  storage: complaintStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const formStorage =
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, formUploadDir);
    },

    filename: (req, file, cb) => {
      const extension =
        path.extname(file.originalname);

      cb(
        null,
        `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${extension}`
      );
    },
  });

const formUpload = multer({
  storage: formStorage,

  limits: {
    fileSize: 15 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const extension =
      path.extname(file.originalname)
        .toLowerCase();

    if (extension === ".pdf") {
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
   USER
========================================================= */

const userSchema = new mongoose.Schema(
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
  mongoose.model("User", userSchema);

/* =========================================================
   OFFICE
========================================================= */

const officeSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
    strict: false,
  }
);

const Office =
  mongoose.models.Office ||
  mongoose.model("Office", officeSchema);

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

const formSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
    strict: false,
  }
);

const Form =
  mongoose.models.Form ||
  mongoose.model("Form", formSchema);

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
   VILLAGE ACTIVITIES
========================================================= */

const villageActivitySchema =
  new mongoose.Schema(
    {},
    {
      timestamps: true,
      strict: false,
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
   AUTH
========================================================= */

function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
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

    req.user = jwt.verify(
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

function roleMiddleware(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message:
          "Authentication required.",
      });
    }

    if (
      !roles.includes(req.user.role)
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
   HEALTH
========================================================= */

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "GramaLK backend is running.",
      database:
        mongoose.connection.readyState ===
        1
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
  async (req, res) => {
    try {
      const {
        username,
        password,
      } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message:
            "Username and password are required.",
        });
      }

      const user =
        await User.findOne({
          username:
            username.trim(),
        });

      if (!user) {
        return res.status(401).json({
          message:
            "Invalid username or password.",
        });
      }

      const passwordMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!passwordMatch) {
        return res.status(401).json({
          message:
            "Invalid username or password.",
        });
      }

      const token =
        createToken(user);

      res.json({
        success: true,
        token,

        user: {
          id: user._id,
          username:
            user.username,
          role: user.role,
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

      res.status(500).json({
        message:
          "Login failed.",
      });
    }
  }
);

/* =========================================================
   OFFICES
========================================================= */

app.get(
  "/api/offices",
  async (req, res) => {
    try {
      const offices =
        await Office.find().sort({
          createdAt: -1,
        });

      res.json(offices);
    } catch (error) {
      console.error(error);

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
  async (req, res) => {
    try {
      const office =
        await Office.create(
          req.body
        );

      res.status(201).json(
        office
      );
    } catch (error) {
      console.error(error);

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
  async (req, res) => {
    try {
      const offices =
        await GovernmentOffice
          .find()
          .sort({
            createdAt: -1,
          });

      res.json(offices);
    } catch (error) {
      console.error(error);

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
  async (req, res) => {
    try {
      const forms =
        await Form.find().sort({
          createdAt: -1,
        });

      res.json(forms);
    } catch (error) {
      console.error(error);

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
  async (req, res) => {
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
        await Form.create(data);

      res.status(201).json(
        form
      );
    } catch (error) {
      console.error(error);

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
  async (req, res) => {
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
      console.error(error);

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
  async (req, res) => {
    try {
      const announcement =
        await Announcement.create(
          req.body
        );

      res.status(201).json(
        announcement
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to create announcement.",
      });
    }
  }
);

/* =========================================================
   COMPLAINTS
========================================================= */

app.post(
  "/api/complaints",
  authMiddleware,
  complaintUpload.single("image"),
  async (req, res) => {
    try {
      const data = {
        ...req.body,

        username:
          req.user.username,

        houseNumber:
          req.body.houseNumber ||
          req.user.houseNumber ||
          "",

        status:
          req.body.status ||
          "Pending",
      };

      if (req.file) {
        data.imageUrl =
          `/uploads/complaints/${req.file.filename}`;
      }

      const complaint =
        await Complaint.create(
          data
        );

      res.status(201).json({
        success: true,
        complaint,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to submit complaint.",
      });
    }
  }
);

app.get(
  "/api/complaints",
  authMiddleware,
  async (req, res) => {
    try {
      let complaints;

      if (
        [
          "gnadmin",
          "welfare",
          "health",
          "deathaid",
        ].includes(
          req.user.role
        )
      ) {
        complaints =
          await Complaint
            .find()
            .sort({
              createdAt: -1,
            });
      } else {
        complaints =
          await Complaint
            .find({
              username:
                req.user.username,
            })
            .sort({
              createdAt: -1,
            });
      }

      res.json(complaints);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to load complaints.",
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
  async (req, res) => {
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
  async (req, res) => {
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
  async (req, res) => {
    try {
      const officers =
        await Officer.find().sort({
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
  async (req, res) => {
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
   VILLAGE ACTIVITIES
========================================================= */

app.get(
  "/api/village-activities",
  async (req, res) => {
    try {
      const activities =
        await VillageActivity
          .find()
          .sort({
            createdAt: -1,
          });

      res.json(activities);
    } catch (error) {
      console.error(
        "Get village activities error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to load village activities.",
      });
    }
  }
);

app.post(
  "/api/village-activities",
  authMiddleware,
  async (req, res) => {
    try {
      const activity =
        await VillageActivity.create(
          req.body
        );

      res.status(201).json(
        activity
      );
    } catch (error) {
      console.error(
        "Create village activity error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to create village activity.",
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
      GovernmentOffice.find().lean(),
      Form.find().lean(),
      Announcement.find().lean(),
      Officer.find().lean(),
      VillageActivity.find().lean(),
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
You are the GramaLK government services
assistant.

Answer clearly and simply.

Use only the information available
in the GramaLK database when answering
questions about GramaLK services.

Do not invent offices, officers,
forms, announcements, activities,
contacts or government information.

If information is not available,
say that it is not currently available
in the GramaLK database.

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

  const models = [
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
  ];

  for (const model of models) {
    try {
      const response =
        await gemini.models.generateContent(
          {
            model,
            contents: prompt,
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
        `Gemini ${model} failed:`,
        error.message
      );
    }
  }

  return null;
}

/* =========================================================
   CHATBOT
========================================================= */

app.post(
  "/api/chat",
  async (req, res) => {
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
          reply: answer,
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
  (error, req, res, next) => {
    console.error(
      "Server error:",
      error
    );

    if (
      error instanceof
      multer.MulterError
    ) {
      return res.status(400).json({
        message:
          `Upload error: ${error.message}`,
      });
    }

    res.status(500).json({
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
    app.listen(
      PORT,
      () => {
        console.log(
          "================================"
        );

        console.log(
          `GramaLK backend running on port ${PORT}`
        );

        console.log(
          `http://localhost:${PORT}`
        );

        console.log(
          "================================"
        );
      }
    );
  } catch (error) {
    console.error(
      "SERVER STARTUP ERROR:"
    );

    console.error(error);

    process.exit(1);
  }
}

startServer();
