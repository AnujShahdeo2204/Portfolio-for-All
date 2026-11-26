# Portfolio-for-All

A stunning, responsive, and dynamic portfolio web application built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Sleek design with smooth animations and interactions.
- **Fully Responsive**: Looks great on desktop, tablet, and mobile devices.
- **Fast Performance**: Built with Vite for incredibly fast hot-reloading and optimized production builds.
- **Customizable**: Easy to tweak the content and styling to fit your personal brand.

## 📁 File Structure

```text
Portfolio-for-All/
â”œâ”€â”€ .github/
â”‚   â””â”€â”€ workflows/
â”‚       â””â”€â”€ deploy.yml       # GitHub Actions workflow for GH Pages deployment
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ components/          # Reusable React components (Hero, ContactForm, etc.)
â”‚   â”œâ”€â”€ App.tsx              # Main application component
â”‚   â”œâ”€â”€ firebase.ts          # Firebase app/Auth setup (reads config from .env)
â”‚   â”œâ”€â”€ index.css            # Global Tailwind CSS and custom styles
â”‚   â””â”€â”€ main.tsx             # React entry point
â”œâ”€â”€ .gitignore               # Ignored files for Git
â”œâ”€â”€ index.html               # Main HTML file
â”œâ”€â”€ package.json             # Project metadata and scripts
â”œâ”€â”€ tsconfig.json            # TypeScript configuration
â””â”€â”€ vite.config.ts           # Vite configuration
```

## 🛠ï¸Ž Tech Stack

- **Framework**: [React](https://react.dev/) 19
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)

## ðŸ’» Running Locally

To get a local copy up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AnujShahdeo2204/Portfolio-for-All.git
   cd Portfolio-for-All
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase (for the Admin Portal):**
   ```bash
   cp .env.example .env
   ```
   Fill in the `VITE_FIREBASE_*` values in `.env` from
   Firebase Console > Project settings > Your apps > Web app.
   See [Admin Portal & Firebase Security](#-admin-portal--firebase-security)
   below for the one-time Firebase Console setup. The public portfolio
   still loads without a `.env` file; only admin sign-in and saving
   need it.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000`.

## Admin Portal & Firebase Security

The portfolio content (hero, projects, timeline, resume) is stored in a
Firebase Realtime Database and loaded publicly by the site. The Admin Portal
lets the site owner edit that content. Editing is protected by Firebase
Authentication — there are no passwords or credentials in this repo.

### How it works

- **Public read:** anyone visiting the site can read the portfolio data.
  `App.tsx` fetches it with an unauthenticated GET, so the site works
  for visitors with no login.
- **Admin-only write:** saving or resetting from the Admin Portal sends
  the signed-in admin's Firebase Auth ID token (`?auth=<token>`) with the
  PUT request. The database rules reject writes from anyone else.
- **Admin sign-in:** the Admin Portal signs in with Firebase Auth
  (email/password). The session is kept by Firebase Auth, not by a flag
  in `sessionStorage`, and no credential is ever stored in the code.

### One-time Firebase Console setup

1. **Enable sign-in:** Firebase Console > Build > Authentication >
   Sign-in method > enable **Email/Password**.
2. **Create the admin user:** Authentication > Users > Add user. Use your
   own email and a strong password you have never used anywhere else.
   This is the only admin account — do not share it, and never commit
   the password to the repo.
3. **Copy the web app config:** Project settings > Your apps > Web app.
   Copy the values into a local `.env` file (see `.env.example`):
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`,
   `VITE_FIREBASE_DATABASE_URL`, `VITE_FIREBASE_PROJECT_ID`,
   `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`,
   `VITE_FIREBASE_APP_ID`. The `.env` file is git-ignored.
4. **Lock the database rules:** Realtime Database > Rules, set:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": "auth != null"
     }
   }
   ```
   Then click **Publish**. `.read: true` keeps the public portfolio
   working; `.write: "auth != null"` stops anyone else from overwriting
   or deleting your data. This is what clears Firebase's "insecure rules"
   alert for writes — the alert only complained because both read *and*
   write were open to everyone.

### If you previously used the old admin login

The old login was a hardcoded username/password in `AdminPortal.tsx`
in a public repo, so treat that password as compromised: never reuse it
anywhere, and change it anywhere else you may have used it. Removing it
from the code does not remove it from the repo's git history.

## 🌐 Deployment

This project is configured to be deployed automatically to GitHub Pages using GitHub Actions.
Whenever you push changes to the `main` branch, the workflow in `.github/workflows/deploy.yml` will automatically build and deploy the app!

Make sure your repository Settings -> Pages -> Source is set to **GitHub Actions**.

## ðŸ“„ License

This project is open-source and available under the [MIT License](LICENSE).
