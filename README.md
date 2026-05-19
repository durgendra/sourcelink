# SourceLink

Source integrity and dependency-tracking platform with a TypeScript backend and a Vite-based frontend.

## About

SourceLink models source objects, downstream assets, usage detection, impact analysis, findings, and reports. The backend uses deterministic mock AI services to keep the integration stable, while the frontend provides the operator workflow for registry, audits, and findings review.

## Key Features

- Source registry and versioning
- Embed generation and asset tracking
- Usage detection and impact analysis
- Findings and report workflows
- Demo seed data and mock AI behavior

## Architecture

- `backend/` is the Express/TypeScript API
- `frontend/` is the Vite + React UI
- `backend/src/services/ai/` contains mock AI logic
- `backend/src/services/lineage/` implements change detection and impact analysis

## Tech Stack

- TypeScript
- Node.js
- Express
- React 19
- Vite
- MongoDB
- Zod
- Pino logging

## Prerequisites

- Node.js
- MongoDB

## Installation

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Configuration

- Backend: `NODE_ENV`, `PORT`, `MONGODB_URI`, `CORS_ORIGIN`, `ENABLE_MOCK_AI`, `UPLOAD_DIR`, `MAX_FILE_SIZE_MB`
- Frontend: `VITE_API_BASE_URL`

## How to Run

```bash
cd backend
npm run dev

cd ../frontend
npm run dev
```

## Example Usage

- Seed demo data
- Register a source and generate an embed
- Run a usage or impact analysis
- Review findings and reports

## Project Structure

- `backend/src/routes/` - API routes
- `backend/src/services/` - parsing, lineage, and reporting services
- `frontend/src/pages/` - page-level routes
- `frontend/src/app/` - API client and types

## Current Status

Looks like a strong publish candidate: the codebase has tests, a clear architecture, and a focused product story.

## Limitations

- No repo-level license
- Backend still needs MongoDB for full execution

## License

No explicit license file was found at the repository root.
