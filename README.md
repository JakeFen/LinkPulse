# LinkPulse

A full-stack URL shortening application built with React, TypeScript, Go, and PostgreSQL.

**[Live Demo](https://linkpulse-jake-fen.vercel.app/) · [GitHub](https://github.com/JakeFen/LinkPulse)**

> ### Demo Account
>
> **Email:** `YOUR_DEMO_EMAIL`
> **Password:** `YOUR_DEMO_PASSWORD`

## 🎥 Demo
Soon

## Overview

LinkPulse is a full-stack URL shortener built to explore modern frontend and backend development.

Users can create shortened URLs and use generated short codes to redirect to their original destinations.

## Tech Stack

**Frontend:** React · TypeScript · Vite · React Router · Tailwind CSS · Clerk

**Backend:** Go · Chi · REST API · PostgreSQL · pgx

**Development:** Docker · Docker Compose · Git

## Features

* Create shortened URLs
* Generate unique short codes
* Redirect shortened URLs to their original destinations
* PostgreSQL data persistence
* Go REST API
* React + TypeScript frontend
* User authentication with Clerk
* Dockerized PostgreSQL development environment

## Local Development

### Prerequisites

* Node.js
* Go
* Docker
* Clerk account

### Setup

Clone the repository:

```bash
git clone https://github.com/JakeFen/LinkPulse.git
cd LinkPulse
```

Start the PostgreSQL database:

```bash
docker compose up -d
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Create the required environment variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the frontend:

```bash
npm run dev
```

In a separate terminal, start the backend:

```bash
cd backend
go run .
```

Additional environment variables may be required depending on your local PostgreSQL configuration.

## Future Improvements

* Link analytics and click tracking
* User dashboard
* Custom short URLs
* Link management
* Additional link metrics
