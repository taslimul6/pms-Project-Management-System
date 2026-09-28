<div align="center">

# PMS - Project Management System

A responsive dashboard to manage client projects, budgets, favourites and completion status in one place.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit-2ea44f?style=for-the-badge&logo=vercel&logoColor=white)](https://pms-omega-sandy.vercel.app/)

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## Features

**Project management**
- Create, edit and delete projects (with a delete confirmation).
- Mark projects as favourite, pending or completed.
- Adjust quantity and see the total budget update automatically.

**Search, filter and sort**
- Live search by project name (debounced).
- Filter by category, status and starred projects.
- Sort by project name or budget.
- One-click reset for search and filters, plus an empty state when nothing matches.

**Experience**
- Form validation with clear error messages.
- Toast notifications after add, update and delete.
- Currency formatting (`$4,500.00`).
- Data is saved in the browser (`localStorage`) and survives a refresh.
- Fully responsive for desktop and mobile.

## Tech Stack

| Tool | Purpose |
| --- | --- |
| React 19 | UI components and state |
| Vite | Dev server and build tool |
| Tailwind CSS v4 | Styling |
| React Compiler | Automatic render optimisation |
| PropTypes | Props type checking |
| ESLint | Code linting |

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/pms-Project-Management-System.git
cd pms-Project-Management-System

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── App.jsx              # Page layout (Nav, Dashboard, Footer)
├── Nav.jsx
├── Footer.jsx
└── Dash/
    ├── Dashboard.jsx    # Main container: state and handlers
    ├── Stats.jsx        # Summary cards
    ├── Form.jsx         # Create / edit form
    ├── FormField.jsx    # Label + error wrapper for inputs
    ├── Search.jsx
    ├── Filter.jsx
    ├── Projects.jsx     # Project card
    ├── EmptyCard.jsx    # "No projects found" state
    ├── Toast.jsx        # Notification message
    ├── filterProjects.js   # Search, filter and sort logic
    ├── validateProject.js  # Form validation and categories
    ├── projectsData.js     # Sample data and localStorage helpers
    └── formatCurrency.js   # Currency formatter
```

## How to Use

1. Fill in the form and click **Add Project**.
2. Use the card buttons to favourite, edit, delete, change quantity or toggle status.
3. Search, filter or sort to find projects quickly.
4. Click **Reset** to clear search and filters.

## Author

**Taslimul Hasan**

© 2026 Taslimul Hasan. All rights reserved.
