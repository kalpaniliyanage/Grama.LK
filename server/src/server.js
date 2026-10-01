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
  )}:${encodeURIComponent(
    mongoPassword
  )}@${mongoCluster}/${mongoDatabase}?authSource=admin`;

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

      role:
        user.role,

      portal:

        portal,

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
   DEFAULT PORTAL USERS
========================================================= */

async function createDefaultPortalUsers() {
  const portalUsers = [
    {
      username: "gnadmin",
      password: "ChangeMe123!",
      role: "gnadmin",
      portal: "GN",
      fullName: "GN Officer",
      email: "gnadmin@gramalk.lk",
      houseNumber: "",
    },

    {
      username: "welfare",
      password: "ChangeMe123!",
      role: "welfare",
      portal: "Welfare",
      fullName: "Welfare Officer",
      email: "welfare@gramalk.lk",
      houseNumber: "",
    },

    {
      username: "health",
      password: "ChangeMe123!",
      role: "health",
      portal: "Health",
      fullName: "Health Officer",
      email: "health@gramalk.lk",
      houseNumber: "",
    },

    {
      username: "youthsports",
      password: "ChangeMe123!",
      role: "youthsports",
      portal: "Youth & Sports",
      fullName:
        "Youth Sports Officer",
      email:
        "youthsports@gramalk.lk",
      houseNumber: "",
    },

    {
      username: "deathaid",
      password: "ChangeMe123!",
      role: "deathaid",
      portal: "Death Aid",
      fullName:
        "Death Aid Officer",
      email:
        "deathaid@gramalk.lk",
      houseNumber: "",
    },

    {
      username: "family001",
      password: "1234",
      role: "family",
      portal: "Family",
      fullName: "Family User",
      email:
        "family001@gramalk.lk",
      houseNumber: "H001",
    },
  ];

  for (
    const account of portalUsers
  ) {
    const hashedPassword =
      await bcrypt.hash(
        account.password,
        10
      );

    const existingUser =
      await User.findOne({
        username:
          account.username,
      });

    if (!existingUser) {
      await User.create({
        username:
          account.username,

        password:
          hashedPassword,

        role:
          account.role,

        portal:
          account.portal,

        assignedPortal:
          account.portal,

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
      /*
         IMPORTANT:
         We update the portal information too.
      */

      existingUser.password =
        hashedPassword;

      existingUser.role =
        account.role;

      existingUser.portal =
        account.portal;

      existingUser.assignedPortal =
        account.portal;

      existingUser.fullName =
        account.fullName;

      existingUser.email =
        account.email;

      existingUser.houseNumber =
        account.houseNumber;

      await existingUser.save();

      console.log(
        `Updated portal user: ${account.username} -> ${account.portal}`
      );
    }
  }

  console.log(
    "Portal user setup completed."
  );
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

      if (loginUsername) {
        user =
          await User.findOne({
            username:
              loginUsername,
          });
      }

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

      /*
         Resolve portal from MongoDB / role.
      */
      const portal =
        getPortalForUser(user);

      /*
         Create JWT with portal.
      */
      const token =
        createToken(user);

      /*
         IMPORTANT:
         Portal information is now sent
         to the frontend.
      */

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
========================================================= */

app.post(
  "/api/complaints",
  complaintUpload.single(
    "image"
  ),
  async (
    req,
    res
  ) => {
    try {
      const data = {
        ...req.body,

        status:
          req.body.status ||
          "Pending",
      };

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
        data.imageUrl =
          `/uploads/complaints/${req.file.filename}`;

        data.imageName =
          req.file.originalname;
      }

      const complaint =
        await Complaint.create(
          data
        );

      return res.status(201).json({
        success: true,

        message:
          "Complaint submitted successfully.",

        complaint,
      });
    } catch (error) {
      console.error(
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
   VILLAGE ACTIVITIES
========================================================= */

app.get(
  "/api/village-activities",
  async (
    req,
    res
  ) => {
    try {
      const activities =
        await VillageActivity
          .find()
          .sort({
            createdAt: -1,
          })
          .lean();

      return res.json(
        activities
      );
    } catch (error) {
      console.error(
        "Get village activities error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to load village activities.",
      });
    }
  }
);

app.post(
  "/api/village-activities",
  authMiddleware,
  async (
    req,
    res
  ) => {
    try {
      const activity =
        await VillageActivity.create(
          req.body
        );

      return res.status(201).json(
        activity
      );
    } catch (error) {
      console.error(
        "Create village activity error:",
        error
      );

      return res.status(500).json({
        message:
          "Failed to create village activity.",
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
          reply: answer,
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

if (gnRoutes) {
  app.use(
    "/api/gn",
    gnRoutes
  );
}

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
      });
    }

    return res.status(500).json({
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
    );

    console.error(
      "================================"
    );

    process.exit(1);
  }
}

/* =========================================================
   RUN SERVER
========================================================= */

startServer(); 