// Applies search, filters and sorting. Returns a new array.
export const filterProjects = (
  projects,
  { searchTerm, category, status, star, sort },
) => {
  const term = searchTerm.trim().toLowerCase();

  const result = projects.filter((project) => {
    const matchesSearch = project.projectName.toLowerCase().includes(term);
    const matchesCategory = category === "ALL" || project.category === category;
    const matchesStatus =
      status === "ALL" ||
      (status === "Pending" && !project.isCompleted) ||
      (status === "Completed" && project.isCompleted);
    const matchesStar = !star || project.isFav;

    return matchesSearch && matchesCategory && matchesStatus && matchesStar;
  });

  if (sort === "name-asc") {
    result.sort((a, b) => a.projectName.localeCompare(b.projectName));
  } else if (sort === "name-desc") {
    result.sort((a, b) => b.projectName.localeCompare(a.projectName));
  } else if (sort === "budget-asc") {
    result.sort((a, b) => Number(a.budget) - Number(b.budget));
  } else if (sort === "budget-desc") {
    result.sort((a, b) => Number(b.budget) - Number(a.budget));
  }

  return result;
};
