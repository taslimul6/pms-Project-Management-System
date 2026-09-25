import { useState } from "react";
import EmptyCard from "./EmptyCard";
import Filter from "./Filter";
import Form from "./Form";
import Projects from "./Projects";
import Search from "./Search";
import Stats from "./Stats";

const DashBoard = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: "hablu Mamar bari ",
      clientName: "Hablu",
      projectUrl: "https://bablu.com",
      category: "Bari design",
      budget: "500",
      isFav: false,
      isCompleted: false,
      qty: 1,
      totalBudget: "500",
    },
  ]);
  const [editingProject, setEditingProject] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("default");
  const [star, setStar] = useState(false);

  const handleAddProject = (newProject) => {
    const project = {
      ...newProject,
      id: crypto.randomUUID(),
    };

    setProjects((previous) => [...previous, project]);
  };

  const handleFev = (pro) => {
    setProjects((previous) =>
      previous.map((p) => (p.id === pro.id ? { ...p, isFav: !p.isFav } : p)),
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleReset = () => {
    setInputValue("");
    setSearchTerm("");
    setCategory("ALL");
    setStatus("ALL");
    setStar(false);
    setSort("default");
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.projectName
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesCategory = category === "ALL" || project.category === category;

    const matchesStatus =
      status === "ALL" ||
      (status === "Pending" && project.isCompleted === false) ||
      (status === "Completed" && project.isCompleted === true);

    const matchesStar = !star || project.isFav === true;

    return matchesSearch && matchesCategory && matchesStatus && matchesStar;
  });

  if (sort === "name-asc") {
    filteredProjects.sort((a, b) => a.projectName.localeCompare(b.projectName));
  } else if (sort === "name-desc") {
    filteredProjects.sort((a, b) => b.projectName.localeCompare(a.projectName));
  } else if (sort === "budget-asc") {
    filteredProjects.sort((a, b) => Number(a.budget) - Number(b.budget));
  } else if (sort === "budget-desc") {
    filteredProjects.sort((a, b) => Number(b.budget) - Number(a.budget));
  }

  // Project handling logic

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((previous) =>
      previous.map((project) =>
        project.id === updatedProject.id
          ? {
              ...project,
              projectName: updatedProject.projectName,
              clientName: updatedProject.clientName,
              projectUrl: updatedProject.projectUrl,
              category: updatedProject.category,
              budget: updatedProject.budget,
              totalBudget: updatedProject.budget * project.qty,
            }
          : project,
      ),
    );

    setEditingProject(null);
  };

  const handleQuantity = (selectedProject, change) => {
    setProjects((previous) =>
      previous.map((project) => {
        if (project.id !== selectedProject.id) return project;

        const qty = Math.max(1, Number(project.qty) + change);
        const totalBudget = Number(project.budget) * qty;

        if (!Number.isSafeInteger(qty) || !Number.isFinite(totalBudget)) {
          return project;
        }

        return {
          ...project,
          qty,
          totalBudget,
        };
      }),
    );
  };

  const handleStatus = (selectedProject) => {
    setProjects((previous) =>
      previous.map((project) =>
        project.id === selectedProject.id
          ? { ...project, isCompleted: !project.isCompleted }
          : project,
      ),
    );
  };

  const handleDelete = (pro) => {
    setProjects((previous) =>
      previous.filter((project) => project.id !== pro.id),
    );

    if (editingProject?.id === pro.id) {
      setEditingProject(null);
    }
  };

  return (
    <>
      <Stats projects={projects} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <Form
          key={editingProject ? `edit-${editingProject.id}` : "create"}
          editingProject={editingProject}
          onAddProject={handleAddProject}
          onUpdateProject={handleUpdateProject}
          onCancelEdit={handleCancelEdit}
        />

        <section className="lg:col-span-8 w-full space-y-4 sm:space-y-6">
          <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-sm">
            <Search
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSearch={handleSearch}
              displayedCount={filteredProjects.length}
              totalCount={projects.length}
            />

            <Filter
              category={category}
              setCategory={setCategory}
              status={status}
              setStatus={setStatus}
              star={star}
              setStar={setStar}
              sort={sort}
              setSort={setSort}
              onReset={handleReset}
            />
          </div>

          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Projects
                key={project.id}
                project={project}
                handleFev={handleFev}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleQuantity={handleQuantity}
                handleStatus={handleStatus}
              />
            ))
          ) : (
           <EmptyCard onReset={handleReset} />
          )}
        </section>
      </div>
    </>
  );
};

export default DashBoard;
