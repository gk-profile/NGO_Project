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

---
## UI Screenshots
### login page
<img width="956" alt="image" src="https://github.com/user-attachments/assets/329748f9-30b5-4bac-a29e-ce9574183df4" />

### register page
<img width="951" alt="image" src="https://github.com/user-attachments/assets/9dd06af7-afe0-42ca-a157-80d6fd398f69" />

### NGO Admin dashboard
<img width="959" alt="image" src="https://github.com/user-attachments/assets/a1923871-5d21-4582-bb48-b5c87e695987" />
<img width="958" alt="image" src="https://github.com/user-attachments/assets/2b95621c-8550-4a2c-930c-c83e8960e08f" />
### view mode
<img width="959" alt="image" src="https://github.com/user-attachments/assets/e96554a3-321a-49a7-b195-6fa6943dfb3e" />

### Edit mode
<img width="958" alt="image" src="https://github.com/user-attachments/assets/920abfb6-b013-46b2-b185-34a47440f101" />

### Delete 
<img width="956" alt="image" src="https://github.com/user-attachments/assets/fab673d7-9d5c-4bb4-9034-11e14ac0178c" />

### Donar dashboard
<img width="956" alt="image" src="https://github.com/user-attachments/assets/9808835c-ee0c-4b7c-b891-180d19b1bc5e" />

<img width="958" alt="image" src="https://github.com/user-attachments/assets/8ffbd409-be2c-4f3a-8d52-eac44979878c" />



