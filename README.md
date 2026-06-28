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

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`.

## 🌐 Deployment

This project is configured to be deployed automatically to GitHub Pages using GitHub Actions.
Whenever you push changes to the `main` branch, the workflow in `.github/workflows/deploy.yml` will automatically build and deploy the app!

Make sure your repository Settings -> Pages -> Source is set to **GitHub Actions**.

## ðŸ“„ License

This project is open-source and available under the [MIT License](LICENSE).
