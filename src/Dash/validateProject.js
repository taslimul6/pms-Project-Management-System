export const categories = [
  { value: "Web Development", label: "Web Development" },
  { value: "Mobile App", label: "Mobile App" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Cloud / DevOps", label: "Cloud / DevOps" },
  { value: "AI & ML", label: "AI & Machine Learning" },
  { value: "Branding & Growth", label: "Branding & Growth" },
];

// Returns an object of error messages (empty when the values are valid).
export const validateProject = (values, editingProject) => {
  const errors = {};
  const budget = Number(values.budget);
  const qty = Number(values.qty);

  if (!values.projectName.trim()) {
    errors.projectName = "Project name is required.";
  }

  if (!values.clientName.trim()) {
    errors.clientName = "Client name is required.";
  }

  try {
    const url = new URL(values.projectUrl.trim());

    if (!["http:", "https:"].includes(url.protocol)) {
      errors.projectUrl = "Please enter an HTTP or HTTPS URL.";
    }
  } catch {
    errors.projectUrl = "Please enter a valid URL.";
  }

  const validCategory =
    categories.some((item) => item.value === values.category) ||
    (editingProject &&
      values.category &&
      values.category === editingProject.category);

  if (!validCategory) {
    errors.category = "Please select a category.";
  }

  if (
    !String(values.budget).trim() ||
    !Number.isFinite(budget) ||
    budget <= 0
  ) {
    errors.budget = "Budget must be a positive number.";
  }

  if (!Number.isSafeInteger(qty) || qty < 1) {
    errors.submit = "Quantity must be a positive whole number.";
  } else if (!errors.budget && !Number.isFinite(budget * qty)) {
    errors.budget = "Total budget is too large.";
  }

  return errors;
};
