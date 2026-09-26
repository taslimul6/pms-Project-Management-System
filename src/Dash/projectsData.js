const STORAGE_KEY = "pms-projects";

// Sample projects shown the first time the app is opened.
const createSeedProjects = () => [
  {
    id: crypto.randomUUID(),
    projectName: "E-commerce Storefront",
    clientName: "Northwind Traders",
    projectUrl: "https://northwind.example.com",
    category: "Web Development",
    budget: 4500,
    isFav: true,
    isCompleted: false,
    qty: 1,
    totalBudget: 4500,
  },
  {
    id: crypto.randomUUID(),
    projectName: "Fitness Tracking App",
    clientName: "FitLife Studio",
    projectUrl: "https://fitlife.example.com",
    category: "Mobile App",
    budget: 3200,
    isFav: false,
    isCompleted: true,
    qty: 2,
    totalBudget: 6400,
  },
  {
    id: crypto.randomUUID(),
    projectName: "Brand Identity Refresh",
    clientName: "Bloom Cafe",
    projectUrl: "https://bloomcafe.example.com",
    category: "Branding & Growth",
    budget: 1800,
    isFav: false,
    isCompleted: false,
    qty: 1,
    totalBudget: 1800,
  },
];

// Makes sure numeric fields are always numbers, even for older saved data.
const normalizeProject = (project) => {
  const budget = Number(project.budget) || 0;
  const qty = Number(project.qty) || 1;

  return { ...project, budget, qty, totalBudget: budget * qty };
};

export const loadProjects = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (Array.isArray(saved)) return saved.map(normalizeProject);
  } catch {
    // Storage unavailable or data corrupted: fall back to sample data.
  }

  return createSeedProjects();
};

export const saveProjects = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // Ignore write errors (private mode, quota exceeded).
  }
};
