# Andrea Aston Personal Portfolio

A responsive personal portfolio website for Andrea Aston, an Electronics and Computer Engineering student and Robotics Technician.

The site presents an introduction, background information, technical skills, projects, articles, and a contact form. Visitors can also download Andrea's CV from the About page.

## Features

- Responsive layout for desktop, tablet, and mobile screens
- Home, About, Projects, Project Details, Article, and Contact pages
- Light and dark theme support
- GitHub project data integration
- Skills and project sections loaded dynamically
- Contact form powered by EmailJS
- Supabase client integration
- Downloadable CV PDF

## Technologies

- HTML5
- CSS3
- JavaScript
- Vite
- EmailJS
- Supabase
- GitHub API

## Getting Started

### Requirements

- Node.js and npm
- Git

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/andreaAston/personal-site-assignment-andreaAston.git
cd personal-site-assignment-andreaAston
npm install
```

Start the development server:

```bash
npm run dev
```

The site will be available at the local URL shown in the terminal.

## Production Build

Create an optimized production build:

```bash
npm run build
```

The generated files are placed in the `dist` directory. To preview the production build locally:

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the project root for the optional Supabase and EmailJS integrations:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Do not commit `.env` or private credentials to GitHub.

## Deployment

This project can be deployed using Vercel.

Use the following Vercel settings:

```text
Framework Preset: Vite
Root Directory: .
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

The CV is stored in `public/Andrea_Aston_CV_v2.pdf` and is copied into the production build automatically.

## Project Structure

```text
.
├── about.html
├── article.html
├── contact.html
├── index.html
├── project.html
├── projects.html
├── package.json
├── vite.config.js
├── public/
│   └── Andrea_Aston_CV_v2.pdf
└── assets/
	├── css/
	├── images/
	└── js/
```

## Author

Andrea Aston
