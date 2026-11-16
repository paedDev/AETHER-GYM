# 🏋️ Gym Website & Management Platform (Tagudin)

A modern, full-stack gym management platform tailored for local gyms (e.g., Tagudin), featuring robust authentication, role-based access control (RBAC), member/admin dashboards, and integrated AI capabilities.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js, TypeScript, Better Auth
- **Database:** MongoDB Atlas (Mongoose / Native MongoDB Driver)
- **Frontend:** React / Vite (Client app)
- **AI Layer:** Claude API / LLM integration proxied securely through the backend

---

## ✨ Core Features

1. **Landing Page:**
   - Hero section, gym photos, location map (Tagudin), operating hours, and Facebook/Messenger quick links.
2. **Membership Plans & Pricing:**
   - Monthly, walk-in, and student rates.
3. **Class & Trainer Schedule:**
   - Schedule view with a "Book a slot" interactive button.
4. **Authentication & Access Control:**
   - Online sign-up and member login powered by **Better Auth**.
   - Role-Based Access Control (`member` vs `admin`).
5. **Member Dashboard:**
   - Membership status, expiry date, attendance history, and bookings.
6. **Admin Panel:**
   - Manage members, payments, renewals, announcements, and schedules.
7. **Contact & Inquiry:**
   - Contact form with a direct Facebook Messenger deep link.

---

## 🤖 Planned AI Features

- **AI Gym Chatbot:** Answers inquiries about hours, prices, and promos grounded in gym data (RAG) with Messenger escalation.
- **AI Workout Generator:** Custom weekly workout plans based on goals, experience, available days, and equipment.
- **Filipino Meal & Nutrition Suggestions:** Budget-friendly local meal ideas matched to fitness goals.
- **Progress Tracker & AI Insights:** Log weight, lifts, and measurements with AI summaries and recommendations.
- **Smart Renewal Reminders:** Flags members likely to lapse based on attendance drops.
- **Crowd-Level Prediction:** Check-in analytics showing optimal visiting hours.

---

## 🛠️ Project Structure

```text
GYM WEBSITE/
├── client/          # React frontend application
└── server/          # Express backend API & Better Auth
    ├── src/
    │   ├── config/      # DB, Environment config
    │   ├── lib/         # Better Auth configuration
    │   ├── middlewares/ # Auth & error handling middlewares
    │   ├── controllers/ # Route controllers
    │   ├── routes/      # API routes
    │   ├── app.ts       # Express app setup
    │   └── server.ts    # Server entry point
    ├── .env.example
    └── package.json
```

---

## ⚙️ Getting Started (Backend)

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   BETTER_AUTH_SECRET=your_better_auth_secret_key
   BETTER_AUTH_URL=http://localhost:5000
   CLIENT_URL=http://localhost:5173
   ```
4. Run development server:
   ```bash
   npm run dev
   ```

---

## 📋 Suggested Build Order

1. **Landing Page & Public Info:** Plans, schedule, map, and contact links.
2. **Auth & Dashboards:** Member dashboard, admin panel, and RBAC enforcement.
3. **AI Chatbot:** Quickest AI integration for FAQs and Messenger escalation.
4. **Workout Plan Generator & Progress Tracker:** Personalized member tools and insights.
