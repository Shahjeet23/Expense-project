
## Tech Stack
- **Frontend**: React.js, Redux Toolkit, React Query, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Tools**: Vite, Zod (Validation), PG (PostgreSQL client)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### 1. Database Setup

1. Open your PostgreSQL interface (pgAdmin or CLI).
2. Create a new database named `expense_tracker`:
   ```sql
   CREATE DATABASE expense_tracker;
   ```
3. connect to the database and run the following queries to create the tables:



### 2. Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with your database credentials:
   ```env
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=expense_tracker
   ```
4. Start the server:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### 3. Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`.



- **backend/**: Contains the Node.js Express server.
  - `config/`: Database connection.
  - `controllers/`: Request handlers.
  - `routes/`: API route definitions.
  - `service/`: Business logic and database queries.
  - `validation/`: Zod schemas for input validation.
- **frontend/**: Contains the React application.
  - `src/components/`: Reusable UI components.
  - `src/pages/`: Main views (Dashboard, Stats).
  - `src/features/`: Redux slices and logic.
  - `src/layout/`: App layout wrapper.

