# Expense Tracker Backend

## Overview
Node.js + Express backend service for the Expense Tracker application. Handles data persistence with PostgreSQL and provides APIs for managing expenses and retrieving statistics.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and provide your PostgreSQL credentials (DB_USER, DB_PASSWORD, etc.).

3. **Database**
   Ensure the `expense_tracker` database exists and tables are created. Refer to the root `README.md` for the schema queries.

4. **Run Server**
   ```bash
   npm start
   # Or for development with nodemon:
   npm run dev
   ```
