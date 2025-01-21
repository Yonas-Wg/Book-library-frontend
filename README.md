# Personal Book Library

A personal book library application built using Next.js and React. This application helps users manage and track their personal book collection.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Manage a personal book library with ease.
- User-friendly interface powered by Material-UI.
- Form validation using Formik and Yup.
- Toast notifications for a seamless user experience.

---

## Tech Stack

### Frontend

- **Next.js**: React framework for server-rendered and static web applications.
- **React**: Component-based library for building interactive UIs.

### UI & Styling

- **Material-UI**: Modern React UI framework with pre-designed components.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Validation & Forms

- **Formik**: Form management library.
- **Yup**: Schema-based validation.

### Notifications

- **React-Toastify**: Notifications with toast messages.

### HTTP Client

- **Axios**: Promise-based HTTP client for API requests.

---

### Getting Started

### Prerequisites

Node.js (v18 or higher recommended)

npm or yarn package manager

### Installation

Clone the repository:

[git clone https://github.com/Yonas-Wg/Book-library-frontend.git]

Navigate to the project directory:

cd personal-book-library

Install dependencies:

npm install

Run the development server:

npm run dev

Open your browser and visit http://localhost:3000.

Scripts

npm run dev # Starts the development server.
npm run build # Builds the application for production.
npm run start # Starts the production server.
npm run lint # Runs lint checks on the codebase.

Folder Structure

personal-book-library/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Next.js pages
│ ├── styles/ # Global styles and Tailwind configurations
│ ├── utils/ # Utility functions
│ ├── hooks/ # Custom React hooks
│ ├── services/ # API services (Axios)
├── package.json # Project metadata and dependencies
├── tailwind.config.js# Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration
