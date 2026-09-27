import { useEffect, useState } from "react";
import EmptyCard from "./EmptyCard";
import Filter from "./Filter";
import Form from "./Form";
import Projects from "./Projects";
import Search from "./Search";
import Stats from "./Stats";
import Toast from "./Toast";
import { filterProjects } from "./filterProjects";
import { loadProjects, saveProjects } from "./projectsData";

const Dashboard = () => {
  const [projects, setProjects] = useState(loadProjects);
  const [editingProject, setEditingProject] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("default");
  const [star, setStar] = useState(false);
  const [toast, setToast] = useState(null);

  // Keep projects in localStorage so they survive a refresh.
  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const showToast = (message) => {
    setToast({ id: Date.now(), message });
  };

  const handleAddProject = (newProject) => {
    const project = {
      ...newProject,
      id: crypto.randomUUID(),
    };

    setProjects((previous) => [...previous, project]);
    showToast("Project added");
  };

  const handleFavorite = (pro) => {
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

  const filteredProjects = filterProjects(projects, {
    searchTerm,
    category,
    status,
    star,
    sort,
  });

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
    showToast("Project updated");
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
    if (!window.confirm(`Delete "${pro.projectName}"?`)) return;

    setProjects((previous) =>
      previous.filter((project) => project.id !== pro.id),
    );

    if (editingProject?.id === pro.id) {
      setEditingProject(null);
    }

    showToast("Project deleted");
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
                handleFavorite={handleFavorite}
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

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default Dashboard;
