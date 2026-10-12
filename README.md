
# GramaLK – Smart Village Administration System

GramaLK is a full-stack web application designed to improve access to Grama Niladhari (GN) services and village administration information in Sri Lanka. The system aims to make public information easier to access through a web platform with administrative portals, centralized information, and an AI-powered assistant.

## Table of Contents

- [Overview](#overview)
- [Objectives](#objectives)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [AI-Powered GN Assistant](#ai-powered-gn-assistant)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Overview

Traditional village administration processes may require residents to visit government offices to obtain information about certificates, application procedures, and public services.

GramaLK aims to provide a centralized digital platform where residents can access village-related information and receive guidance about Grama Niladhari services.

The application follows a client-server architecture, with a React frontend, a Node.js and Express backend, a MongoDB Atlas database, and an AI integration for answering user questions.

## Objectives

The main objectives of GramaLK are:

- Improve access to Grama Niladhari service information.
- Help residents understand administrative procedures.
- Provide information about certificates and required documents.
- Centralize announcements, application forms, and office information.
- Support communication between residents and village administration offices.
- Provide AI-powered assistance for GN-related questions.
- Reduce the time required to find relevant public service information.

## Features

### 1. AI-Powered GN Assistant

The AI assistant is designed to answer questions about Grama Niladhari services using natural language.

Example questions:

- How can I obtain a character certificate?
- What documents may be required for a residence certificate?
- How can I contact my Grama Niladhari office?
- What should I do before submitting an application?
- Where can I find information about village services?
- How can I identify my GN division?

The assistant can use available application context to improve the relevance of its answers.

AI-generated guidance should not be treated as an official government decision. Users should confirm uncertain requirements with the relevant GN office or an authoritative government source.

### 2. Village Administration Information

The platform can provide information about:

- Government offices.
- Grama Niladhari services.
- Application forms.
- Public announcements.
- Officers and office details.
- Village activities and community information.

The availability of each feature depends on the implemented modules and database content.

### 3. Administrative Portals

The backend includes portal-related functionality for administrative sections such as:

- GN
- Welfare
- Health
- Youth & Sports
- Death Aid
- Family

Access permissions and available operations depend on the application's authentication and authorization implementation.

### 4. Database Integration

MongoDB Atlas is used to store and retrieve application information.

### 5. REST API

The backend uses Express.js to process HTTP requests, manage application logic, communicate with the database, and integrate with the AI provider.

### 6. Web Interface

The frontend uses React and Vite to provide the application's user interface.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React |
| Frontend tooling | Vite |
| Language | JavaScript / JSX |
| Backend | Node.js |
| Backend framework | Express.js |
| Database | MongoDB Atlas |
| AI integration | Google Gemini API |
| Authentication | JWT, where configured |
| Password hashing | bcrypt, where configured |
| Cross-origin requests | CORS |
| Environment configuration | dotenv |
| Development server | Nodemon |

## System Architecture

```text
+---------------------------+
|          Resident         |
|        Web Browser        |
+-------------+-------------+
              |
              v
+---------------------------+
|      React Frontend       |
|           Vite            |
+-------------+-------------+
              |
         HTTP / JSON
              |
              v
+---------------------------+
|    Node.js + Express      |
|       Backend API         |
+-------------+-------------+
              |
       +------+------+
       |             |
       v             v
+-------------+ +-------------+
| MongoDB     | | Gemini AI   |
| Atlas       | | API         |
+-------------+ +-------------+
```

### Request Flow

1. The user opens the GramaLK web application.
2. The frontend sends requests to the backend.
3. The backend validates and processes the requests.
4. Relevant information is retrieved from MongoDB when necessary.
5. Chatbot requests are forwarded to the configured AI provider.
6. The backend returns a response to the frontend.
7. The frontend displays the response to the user.

## Project Structure

The main project structure is organized into frontend and backend directories.

```text
GramaLK/
|
|-- README.md
|-- .gitignore
|
|-- server/
|   |-- src/
|   |   |-- server.js
|   |   `-- routes/
|   |       `-- gnRoutes.js
|   |-- package.json
|   |-- package-lock.json
|   `-- .env
|
`-- client/
    |-- public/
    |-- src/
    |   |-- main.jsx
    |   |-- App.jsx
    |   |-- components/
    |   `-- assets/
    |-- index.html
    |-- package.json
    |-- package-lock.json
    `-- vite.config.js
```

Note: This is a representative structure. Your actual project may contain additional files and directories. Keep the filenames consistent with your repository.

## Prerequisites

Install the following tools before running the project:

- Node.js (preferably a supported LTS version).
- npm.
- Git.
- MongoDB Atlas account and database.
- Google AI Studio API key if Gemini is enabled.
- Visual Studio Code or another code editor.

Verify your installations:

```bash
node --version
npm --version
git --version
```

## Installation

### Step 1: Clone the Repository

If the project is hosted on GitHub:

```bash
git clone YOUR_REPOSITORY_URL
cd GramaLK
```

Replace `YOUR_REPOSITORY_URL` with your actual repository URL.

If you already have the project locally, open a terminal in the existing `GramaLK` folder.

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3: Configure the Backend Environment

Create a `.env` file inside the `server` directory.

Example configuration:

```env
PORT=5000

MONGO_USERNAME=your_mongodb_username
MONGO_PASSWORD=your_mongodb_password
MONGO_CLUSTER=your_cluster_hostname
MONGO_DATABASE=gramalk

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_available_gemini_model
GEMINI_FALLBACK_MODEL=your_available_fallback_model

JWT_SECRET=replace_with_a_long_random_secret
```

Important:

- Replace example values with your own configuration.
- Use the environment variable names expected by your actual backend code.
- Configure only the variables your application uses.
- Use model names available to your API key.
- Keep API keys and database credentials private.
- Never commit your `.env` file to GitHub.

### Step 4: Install Frontend Dependencies

Open a separate terminal and run:

```bash
cd client
npm install
```

If the frontend uses an environment variable for the backend URL, configure it according to the frontend code.

Example:

```env
VITE_API_URL=http://localhost:5000
```

This variable is only needed if the frontend is configured to read `VITE_API_URL`.

## Environment Variables

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `MONGO_USERNAME` | MongoDB username |
| `MONGO_PASSWORD` | MongoDB password |
| `MONGO_CLUSTER` | MongoDB cluster hostname |
| `MONGO_DATABASE` | Database name |
| `GEMINI_API_KEY` | Gemini API key |
| `GEMINI_MODEL` | Primary AI model |
| `GEMINI_FALLBACK_MODEL` | Alternative AI model |
| `JWT_SECRET` | Secret used for JWT signing, if configured |

The actual environment variables depend on the backend implementation.

## Running the Application

Run the backend and frontend in separate terminals.

### Start the Backend

```bash
cd server
npm run dev
```

The backend is expected to use port `5000` when configured with the default settings.

Check the terminal to confirm that the server starts and the database connection succeeds.

### Start the Frontend

```bash
cd client
npm run dev
```

Vite will display a local development URL, commonly:

```text
http://localhost:5173/
```

Open the URL displayed by Vite in your browser.

### Local Development URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |

These are default development URLs and may differ if the ports are changed.

## AI-Powered GN Assistant

The assistant is designed to understand natural-language questions about Grama Niladhari services.

### Expected Workflow

1. The user submits a question.
2. The backend validates the message.
3. The application obtains relevant website context when available.
4. The AI provider generates an answer.
5. The backend returns the response.
6. The frontend displays the answer.

### Answer Quality

The assistant should:

- Answer the user's actual question.
- Support Sinhala and English when configured.
- Explain procedures clearly.
- Provide document checklists when appropriate.
- Use available website information.
- Avoid inventing official requirements or fees.
- Recommend verification with the relevant GN office when information is uncertain.

### Handling AI Errors

The AI service may occasionally return errors due to service availability, rate limits, invalid API keys, network problems, or unsupported models.

Recommended handling includes:

- Limited retries with delays.
- Appropriate request timeouts.
- Server-side error logging.
- User-friendly fallback messages.
- A supported alternative model or AI provider.
- Predefined answers for selected common questions when the AI service is unavailable.

Predefined answers are not live AI responses and should not be presented as official or universally applicable requirements.

## API Documentation

The backend exposes HTTP endpoints for communication with the frontend.

### POST `/api/chat`

Sends a user's question to the chatbot service.

Example request:

```json
{
  "message": "What documents may be required for a character certificate?"
}
```

Example successful response:

```json
{
  "success": true,
  "reply": "Please confirm the required documents with your local Grama Niladhari office."
}
```

The exact response fields depend on the implemented route.

Other endpoints may support authentication, offices, forms, announcements, officers, village activities, and administrative portals.

Refer to `server/src/server.js` and the route files under `server/src/routes/` for the complete list of implemented endpoints.

## Security

Recommended security practices:

- Store API keys and credentials in environment variables.
- Add `.env` files to `.gitignore`.
- Never publish passwords, API keys, or JWT secrets.
- Validate and sanitize user input.
- Hash passwords securely.
- Verify JWTs on protected endpoints.
- Enforce authorization for administrative operations.
- Restrict CORS to trusted origins in production.
- Protect residents' personal information.
- Avoid logging passwords, tokens, or sensitive data.
- Use HTTPS in production.
- Apply rate limits to public API and AI endpoints.
- Verify AI-generated administrative information against trusted sources.

Review the application's actual security implementation before deployment.

## Troubleshooting

### Frontend Cannot Connect to the Backend

Possible causes:

- The backend is not running.
- The frontend uses the wrong API URL.
- CORS settings block the request.
- The backend uses a different port.

Solutions:

1. Start the backend using `npm run dev`.
2. Check the backend port.
3. Verify the frontend API URL.
4. Check the browser console and Network tab.
5. Review backend logs.

### MongoDB Connection Failure

Possible causes:

- Incorrect credentials.
- Incorrect cluster hostname.
- Network access restrictions.
- Missing environment variables.
- Invalid connection string.

Solutions:

1. Verify the MongoDB Atlas settings.
2. Check the environment variables.
3. Confirm database user permissions.
4. Review network access configuration.
5. Read the backend terminal error.

### Gemini Returns 503 UNAVAILABLE

A 503 error indicates that the requested service or model is temporarily unavailable or experiencing a server-side problem.

Solutions:

1. Verify that the model is available to your API key.
2. Check Google AI Studio and the official Gemini API documentation.
3. Retry with a reasonable delay and limited attempts.
4. Configure timeouts and error handling.
5. Consider a supported alternative model or provider.
6. Provide a graceful fallback if all AI requests fail.

Changing the prompt alone does not resolve provider availability errors.

### Gemini Request Times Out

Possible causes:

- Slow or unavailable AI service.
- Network connectivity issues.
- An overly short timeout.
- A backend operation waiting before the AI request.

Solutions:

1. Log each stage of the chatbot request.
2. Confirm that database context retrieval finishes.
3. Test the AI request independently.
4. Configure reasonable timeouts.
5. Ensure the backend returns a response on failure.

### Chatbot Loading Dots Continue Indefinitely

Possible causes:

- The frontend loading state is not reset.
- The backend request is still pending.
- The backend does not return a response.
- The frontend expects different JSON fields.

Solutions:

- Use `try/catch/finally` in the frontend request handler.
- Reset the loading state in `finally`.
- Check the `/api/chat` request in the browser Network tab.
- Confirm the backend returns a response on both success and failure.
- Check that the frontend reads the correct response field.

### Vite Is Not Recognized

Run these commands inside the `client` directory:

```bash
npm install
npm run dev
```

If the problem persists, verify that Vite is listed in `client/package.json` and that the dependencies installed successfully.

### Git Merge Conflicts

If Git reports conflicts:

1. Run `git status`.
2. Open the conflicted files.
3. Resolve conflict markers without losing required code.
4. Test the application.
5. Stage the resolved files.
6. Commit the changes after resolving all conflicts.

Never commit unresolved conflict markers.

## Future Enhancements

Potential improvements include:

- Better Sinhala and English conversational support.
- A verified knowledge base for GN services.
- Search by GN division.
- Improved document and application guidance.
- Verified government office contact details.
- Chat history and follow-up question support.
- Alternative AI provider integration.
- Improved role-based access control.
- Accessibility and mobile responsiveness.
- Automated backend and frontend tests.
- Production deployment and monitoring.
- User feedback for incorrect AI answers.

These are proposed enhancements and may not be implemented in the current version.

## Contributing

Contributions are welcome.

1. Create a feature branch.
2. Make focused changes.
3. Test the frontend and backend.
4. Check for accidentally included secrets.
5. Commit your changes with a descriptive message.
6. Push your branch and open a pull request.

Example:

```bash
git switch -c feature/improve-gn-assistant
git add .
git commit -m "Improve GN assistant responses"
git push -u origin feature/improve-gn-assistant
```

Follow the repository's review process before merging into `main`.

## License

No license has been specified in this README. Add the appropriate license after confirming the project's ownership and distribution requirements.

---

**GramaLK – Bringing Village Administration Information Closer to the Community.**
