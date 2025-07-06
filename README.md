#  NGO Food Donation Web App

A full-stack web application built to help NGOs track and manage food donations. This app allows donors to submit food donation requests, and NGO admins to review, manage, and organize pickups/deliveries efficiently.

---

## Tech Stack

### Frontend
- **React** (with Vite)
- **TypeScript**
- **TailwindCSS** (custom theme)
- **ShadCN UI** (UI components)
- **Zod + React Hook Form** (form validation)
- **Zustand** (global state management)
- **TanStack React Query** (data fetching & caching)
- **Lucide Icons**

### Backend
- **Django**
- **Django REST Framework**
- **MySQL**
- **JWT Authentication (SimpleJWT)**
- **CORS, Pagination, Role-based permissions (Groups)**

---

## How to Run Locally

### Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- MySQL
- Git

---

## Project Structure
root/
├── NGO_UI/NGO_UI      → React + Vite Frontend
└── NGO_BE             → Django Backend



---

##  Frontend Setup

### 1. Navigate into NGO_UI/NGO_UI
cd NGO_UI\NGO_UI

### 2. Install dependencies
npm install

### 3. Start development server
npm run dev

App will be running at: http://localhost:5173

Make sure to configure the API base URL inside src/api/axios.ts or donationApis.ts:

export const ngoApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

---
## Backend Setup
### 1. Navigate into backend
cd NGO_BE

### 2. Create virtual env
python -m venv venv
source venv/bin/activate 

### 3. Install dependencies
pip install -r requirements.txt

### 4. Create DB & run migrations
python manage.py migrate

### 5. Run the server
python manage.py runserver

