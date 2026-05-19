# SourceLink Backend

SourceLink is dependency management for digital content. This backend provides the first API surface for creating approved source objects, generating SourceLink embeds, registering downstream assets, detecting usage drift, simulating source updates, running impact analysis, managing findings, and exporting reports.

## Stack

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas with Mongoose
- Zod validation
- Axios + Cheerio for webpage parsing
- Multer + `pdf-parse` + Mammoth for file parsing
- Pino logging
- Helmet, CORS, rate limiting
- Vitest for tests

## Setup

1. Create a backend env file from [`.env.example`](/Users/dnsingh/Documents/Projects/sourcelink/backend/.env.example).
2. Install dependencies with `npm install` inside [backend](/Users/dnsingh/Documents/Projects/sourcelink/backend).
3. Set `MONGODB_URI` to your MongoDB Atlas connection string.
4. Start the API with `npm run dev`.

Default local API URL: `http://localhost:4000`

## Environment Variables

- `PORT`: API port, defaults to `4000`
- `NODE_ENV`: `development`, `test`, or `production`
- `MONGODB_URI`: MongoDB Atlas connection string
- `CORS_ORIGIN`: frontend origin, defaults to `http://localhost:5173`
- `ENABLE_MOCK_AI`: enables deterministic mock AI behavior
- `UPLOAD_DIR`: upload temp directory
- `MAX_FILE_SIZE_MB`: upload size limit

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run seed`
- `npm run test`
- `npm run lint`

## API List

### Health

- `GET /api/health`

### Sources

- `POST /api/sources`
- `GET /api/sources`
- `GET /api/sources/:sourceObjectId`
- `POST /api/sources/:sourceObjectId/versions`
- `GET /api/sources/:sourceObjectId/versions`
- `POST /api/sources/:sourceObjectId/update`

### Embeds

- `POST /api/embeds/generate`
- `GET /api/embeds/:sourceObjectId`

### Assets

- `POST /api/assets/url`
- `POST /api/assets/upload`
- `GET /api/assets`
- `GET /api/assets/:assetId`

### Usage

- `POST /api/assets/:assetId/detect-usages`
- `GET /api/assets/:assetId/usages`
- `GET /api/sources/:sourceObjectId/usages`

### Impact

- `POST /api/source-events/:eventId/run-impact`
- `GET /api/source-events/:eventId/impact`
- `GET /api/impact/graph`

### Findings

- `GET /api/findings`
- `GET /api/findings/:findingId`
- `PATCH /api/findings/:findingId/status`
- `PATCH /api/findings/:findingId`

### Reports

- `POST /api/reports`
- `GET /api/reports/:reportId`
- `GET /api/reports/:reportId/download`

### Demo

- `POST /api/demo/seed`
- `POST /api/demo/apple-style/create`
- `POST /api/demo/apple-style/run-source-update`
- `GET /api/demo/apple-style/dashboard`

## MongoDB Atlas Notes

- Create a database user with read/write access to the target database.
- Allow your local IP in Atlas network access.
- Use a connection string like `mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority`.
- For local development without Atlas, the backend defaults to `mongodb://127.0.0.1:27017/sourcelink`.

## Demo Seed

- Run `npm run seed` to create the Apple-style demo source and downstream assets.
- Or call `POST /api/demo/seed`.
- The dashboard endpoint will auto-bootstrap a demo update and impact analysis if needed.

## Mock AI Behavior

The V1 backend uses deterministic mock AI services to simulate:

- partner affiliation language checks
- product naming checks
- support claim checks
- missing disclaimer checks
- old logo detection
- finding generation
- suggested fix generation

This keeps the backend stable for frontend integration and demo flows while the contract stays close to a future AI-assisted implementation.

## Replacing Mock AI Later

The AI-facing logic is isolated in [backend/src/services/ai](/Users/dnsingh/Documents/Projects/sourcelink/backend/src/services/ai). To replace mock behavior with a real LLM later:

1. Swap the mock extractors/generators with provider-backed services.
2. Keep the route/controller/service interfaces stable.
3. Add prompt versioning and structured output validation with Zod.
4. Store model metadata and trace IDs on findings for auditability.
5. Add retry, timeout, and fallback behavior for parsing and inference pipelines.

## Security Notes

- Helmet is enabled.
- CORS is origin-scoped.
- API rate limiting is enabled.
- Upload MIME types are restricted to `pdf`, `docx`, `pptx`, and `txt`.
- Full raw document text is redacted from logs in production.

## Testing

The current test suite focuses on core backend behaviors with mocked persistence and file I/O boundaries so the contracts can be validated without a live MongoDB instance.
