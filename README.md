# This Readme file is written by using github copilot.

# Typing Punjabi ⌨️

A modern, interactive typing practice application for Punjabi language learners. Master your typing skills with engaging exercises, real-time feedback, and comprehensive progress tracking.

**Live Demo:** [typingpunjabi.vercel.app](https://typingpunjabi.vercel.app)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- A Supabase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prabhjotsingh-dev/typingpunjabi.git
   cd typingpunjabi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 16 - React-based framework for production-grade applications
- **Language:** TypeScript - Type-safe development experience
- **Styling:** 
  - Tailwind CSS - Utility-first CSS framework
  - Shadcn UI - High-quality React components
  - Class Variance Authority - CSS class composition
- **UI Components & Icons:**
  - Lucide React - Beautiful, consistent icon library
  - Base UI React - Unstyled, accessible component primitives

### State & Forms
- **React Hook Form** - Performant form validation and management
- **Sonner** - Toast notifications for user feedback

### Backend & Authentication
- **Supabase** - Open-source Firebase alternative
  - PostgreSQL database for data persistence
  - Row-level security for data protection
  - Built-in authentication system
- **Supabase SSR** - Server-side rendering with authentication

### Utilities
- **Next Themes** - Theme management (light/dark mode)
- **Tailwind Merge** - Merge Tailwind CSS classes intelligently
- **TW Animate CSS** - Animation utilities

### Development
- **TypeScript** - Static type checking
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS transformations
- **Autoprefixer** - Automatic vendor prefixes

---

## 📁 Project Structure

```
typingpunjabi/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page
│   └── ...                 # Other pages
├── components/             # Reusable React components
│   ├── ui/                 # Shadcn UI components
│   └── ...                 # Custom components
├── lib/                    # Utility functions and helpers
├── styles/                 # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.ts          # Next.js configuration
```

---

## 🎯 Usage

### For Learners

1. **Sign Up/Login** - Create an account to track your progress
2. **Select Exercise** - Choose from available typing exercises
3. **Type Along** - Follow the Punjabi text and type accurately
4. **Review Results** - Check your WPM, accuracy, and mistakes
5. **Track Progress** - Monitor improvements in your stats dashboard

---

## 📊 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:3000 |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Get these values from your [Supabase project settings](https://app.supabase.com).

---

## 🤝 Contributing

Contributions are welcome! Whether you want to:
- Improve the UI/UX
- Fix bugs
- Add new features

Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🙏 Support

- 🐛 Found a bug? [Open an issue](https://github.com/prabhjotsingh-dev/typingpunjabi/issues)
- 💡 Have a suggestion? Share your ideas in [discussions](https://github.com/prabhjotsingh-dev/typingpunjabi/discussions)
- ⭐ Like the project? Give it a star!

---

## 📧 Contact

- **Author:** [Prabhjot Singh](https://github.com/prabhjotsingh-dev)
- **Website:** [typingpunjabi.vercel.app](https://typingpunjabi.vercel.app)

---

**Made with ❤️ for Punjabi language enthusiasts**