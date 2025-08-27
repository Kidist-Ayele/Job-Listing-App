# Job Listing Application

A modern, responsive job listing application built with Next.js, featuring a beautiful welcome landing page, user authentication, and comprehensive job browsing experience.

## 🚀 Features

### Core Functionality

- **Welcome Landing Page**: Beautiful, responsive landing page for unauthenticated users
- **User Authentication**: Secure sign-in/sign-up with NextAuth.js
- **Job Listings**: Browse and search through job opportunities (authenticated users only)
- **Bookmark System**: Save and manage favorite job postings
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Job Details**: Detailed view of individual job postings

### User Experience

- **Landing Page**: Engaging welcome page with call-to-action buttons
- **Authentication Flow**: Seamless sign-in/sign-up process
- **Protected Routes**: Job listings only accessible to authenticated users
- **Smart Navigation**: Context-aware navigation based on authentication status

### Technical Features

- **Redux State Management**: Global state management with Redux Toolkit
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, responsive styling with beautiful gradients
- **Comprehensive Testing**: Unit tests (Jest) and E2E tests (Cypress)
- **NextAuth.js Integration**: Secure authentication with session management

## 📱 Screenshots

### Welcome Landing Page

![Welcome Landing Page](screenshots/landing-page.png)
_Beautiful landing page with hero section, features, and call-to-action buttons_

### Job Listings Dashboard

![Job Listings Dashboard](screenshots/job-listings.png)
_Main dashboard showing job cards with bookmark buttons and responsive design_

### Job Detail Page

![Job Detail Page](screenshots/job-detail-page.png)
_Detailed view of a job posting with bookmark functionality_

### Authentication Pages

![Sign In Page](screenshots/signin-page.png)
_User authentication with responsive design_

![Sign Up Page](screenshots/signup-page.png)
_User registration form with email verification_

### Mobile Responsive Design

![Mobile View](screenshots/mobile-responsive.png)
_Mobile-optimized interface with touch-friendly interactions_

## 🛠️ Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom gradients
- **Redux Toolkit** - State management
- **NextAuth.js** - Authentication and session management
- **Jest + Cypress** - Testing framework
- **Lucide React** - Modern icon library

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Kidist-Ayele/Job-Listing-App.git
   cd Job-Listing-App/Job-Listing-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Unit Tests

Run unit tests with Jest:

```bash
npm test
```

### End-to-End Tests

Run Cypress E2E tests:

```bash
npm run dev

npm run cypress:run
```
