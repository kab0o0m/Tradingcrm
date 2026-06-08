# Trading CRM

A full-stack trading journal and account management application built with **Next.js**, **FastAPI**, and **MySQL**. The platform allows traders to record trades, track performance, monitor account growth, and analyze trading statistics through a modern dashboard.

## Features

### Authentication

* User registration and login
* JWT-based authentication
* Protected API endpoints
* User-specific trade records

### Trade Management

* Create new trades
* View all trades
* Edit existing trades
* Delete trades
* Record:

  * Trading Pair
  * Direction (Long / Short)
  * Session (London / New York)
  * Strategy
  * Risk Amount
  * Profit & Loss (PnL)
  * Status
  * Comments

### Dashboard Analytics

* Current Account Balance
* Total Trades
* Win Rate
* Total Wins
* Total PnL

### Account Management

* Starting Balance
* Current Balance
* Automatic balance updates when trades are created, edited, or deleted

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* SQLAlchemy
* JWT Authentication
* Pydantic

### Database

* MySQL

## Project Structure

```bash
trade/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── types/
│   │   └── services/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── schemas/
│   ├── utils/
│   ├── database.py
│   └── main.py
│
└── README.md
```

## Installation

### Backend

Create a virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI:

```bash
uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

### Frontend

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

## API Endpoints

### Authentication

```http
POST /register
POST /login
```

### Trades

```http
GET    /trades
GET    /trades/{id}
POST   /trades
PUT    /trades/{id}
DELETE /trades/{id}
```

### Dashboard

```http
GET /dashboard
```

## Future Improvements

* Trade screenshots
* Equity curve chart
* Monthly performance analytics
* Profit factor calculations
* Risk-to-reward analysis
* Trading psychology journal
* Strategy performance breakdown
* Cloud deployment
* Mobile responsive dashboard

## Author

John Ang

Built as a personal project to improve full-stack development skills while creating a practical tool for tracking trading performance.
