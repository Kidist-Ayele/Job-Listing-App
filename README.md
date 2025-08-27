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

<img width="1366" height="1284" alt="screencapture-jobbwebbapp-netlify-app-2025-08-27-15_19_37" src="https://github.com/user-attachments/assets/731602e4-5bb5-4c90-b899-1d150328f007" />

_Beautiful landing page with hero section, features, and call-to-action buttons_

### Job Listings Dashboard

<img width="1350" height="638" alt="image" src="https://github.com/user-attachments/assets/c0866dbe-6695-4b40-8771-fa488674d73b" />

_Main dashboard showing job cards with bookmark buttons and responsive design_

### Job Detail Page

<img width="1366" height="947" alt="screencapture-jobbwebbapp-netlify-app-job-65509e9353a7667de6ef5a60-2025-08-27-15_25_52" src="https://github.com/user-attachments/assets/dcc919bd-616d-4daf-afdd-7603a3708e10" />

_Detailed view of a job posting with bookmark functionality_

### Authentication Pages

<img width="1366" height="802" alt="screencapture-jobbwebbapp-netlify-app-auth-signup-2025-08-27-15_27_10" src="https://github.com/user-attachments/assets/6f1a6ce7-c007-4a59-93c3-78cd0bfd20d5" />

<img width="1366" height="641" alt="screencapture-jobbwebbapp-netlify-app-auth-signin-2025-08-27-15_28_04" src="https://github.com/user-attachments/assets/af30bfd0-f86b-426b-858b-220972c03d0a" />


### Mobile Responsive Design

<img width="351" height="553" alt="image" src="https://github.com/user-attachments/assets/fc9f3f3d-44cc-46b1-8e22-1ce2d2395b13" />

<img width="342" height="551" alt="image" src="https://github.com/user-attachments/assets/bdce06e5-8209-44a3-96e6-2cb6bec649d9" />

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
