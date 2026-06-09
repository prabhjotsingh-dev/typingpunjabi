 This Readme file is written by using github copilot.
 
# Typing Punjabi ⌨️

A Punjabi typing practice app built with Next.js and Supabase. Learn to type Punjabi using romanized input, follow guided lessons, track your performance, and review results in a personalized dashboard.

**Live Demo:** https://typingpunjabi.vercel.app

---

## 🚀 What this app does

- Authenticated login and signup using Supabase
- Punjabi typing lessons with roman-to-Gurmukhi transliteration
- Real-time WPM, accuracy, and mistake tracking
- Lesson result pages with performance summary and navigation
- Personalized dashboard showing recent practice, history.
- Responsive UI built with Tailwind CSS and shadcn components

---

## 🧩 App Pages

- `/` — Home page
- `/about` — About the app
- `/contact` — Contact page
- `/login` — User login
- `/signup` — User registration
- `/dashboard` — Personalized progress dashboard
- `/lesson` — Lesson list
- `/lesson/[id]` — Lesson practice page
- `/lesson/[id]/result` — Lesson result summary

---

## ⚙️ Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project with Auth and database configured

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/prabhjotsingh-dev/typingpunjabi.git
   cd typingpunjabi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint checks |

---

## 🧰 Tech Stack

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- Supabase Auth + Database
- React Hook Form
- shadcn UI
- Lucide React icons
- Sonner toast notifications
- `tw-animate-css`
- `class-variance-authority`

---

## 📁 Project structure

```
typingpunjabi/
├── src/
│   ├── app/                  # Next.js app routes and pages
│   ├── components/           # Reusable UI components
│   ├── comman/               # Shared routes, types, utilities
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Helper functions, transliteration engine
│   ├── supabaseFunctions/    # Data fetching helpers
│   └── supabaseServices/     # Auth and Supabase client logic
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind config
└── next.config.js            # Next.js config
```

---

## 📝 Notes for this app

- Signup uses Supabase server-side admin user creation.
- The typing engine converts romanized input into Punjabi characters.
- Lesson and dashboard data are loaded from Supabase.
- The lesson result page shows stars, WPM, and accuracy.

---

## 🤝 Contributing

Contributions are welcome! You can help with:

- Adding new Punjabi typing lessons
- Improving keyboard and transliteration support
- Enhancing mobile responsiveness
- Fixing bugs or polishing UI

Steps:

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and open a pull request

---

## 📧 Contact

- **GitHub:** https://github.com/prabhjotsingh-dev
- **Demo:** https://typingpunjabi.vercel.app

---

Made with ❤️ for Punjabi learners and typists.
