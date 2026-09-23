import { useState } from "react";
import EmptyCard from "./EmptyCard";
import Filter from "./Filter";
import Form from "./Form";
import Projects from "./Projects";
import Search from "./Search";
import Stats from "./Stats";

const DashBoard = () => {
  const [projects, setProjects] = useState([{
  projectName: "hablu Mamar bari ",
  clientName: "Hablu",
  projectUrl: "https://bablu.com",
  category: "Bari design",
  budget: "500",
  isFav: false,
  isCompleted: false,
  qty: 1,
  totalBudget: "500",
}]);


  const handleAddProject = (newProject) => {
    setProjects((previous) => [...previous, newProject]);
  };

  const handleFev = (pro)=>{
    const newProjects = projects.map(p=> p.id === pro.id ? { ...p, isFav: !p.isFav } : p);
    setProjects(newProjects);

  };

  const handleDelete =(pro) =>{
    const newProjects = projects.filter(p=>p.id != pro.id);
    setProjects(newProjects);

  }

  const handleSearch =(term)=>{

    const newProjects = projects.filter(pjt=>pjt.projectName.toLowerCase().includes(term.toLowerCase())  )

    setProjects(newProjects);


  }

  

  return (

    <>

        <Stats projects={projects} />
    
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
      <Form
        project={projects}
        setProject={setProjects}
        onAddProject={handleAddProject}
      />

      <section class="lg:col-span-8 w-full space-y-4 sm:space-y-6">
        {/* <!-- Controls Bar --> */}
        <div class="bg-[#121215] border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-sm">
          <Search onSearch={handleSearch} />
          <Filter />
        </div>

        

        {projects.map(project => <Projects key={project.id} project={project} handleFev={handleFev} handleDelete={handleDelete}  />)}

        
        <EmptyCard />

        
      </section>
    </div>

    {console.log(projects)}
    </>
  );
};

export default DashBoard;
