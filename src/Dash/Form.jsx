import { useState } from "react";
import PropTypes from "prop-types";
import FormField, { ErrorMessage } from "./FormField";
import { categories, validateProject } from "./validateProject";

const initialValues = {
  projectName: "",
  clientName: "",
  projectUrl: "",
  category: "",
  budget: "",
  isFav: false,
  isCompleted: false,
  qty: 1,
  totalBudget: "",
};

const inputClass =
  "w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all";

const Form = ({
  editingProject,
  onAddProject,
  onUpdateProject,
  onCancelEdit,
}) => {
  const isEditing = Boolean(editingProject);

  const [values, setValues] = useState(() => ({
    ...initialValues,
    ...(editingProject || {}),
  }));

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasExistingCategory =
    editingProject?.category &&
    !categories.some((item) => item.value === editingProject.category);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "", submit: "" }));
  };

  const clearForm = () => {
    setValues({ ...initialValues });
    setErrors({});
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const newErrors = validateProject(values, editingProject);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const budget = Number(values.budget);
    const qty = Number(values.qty);

    setIsSubmitting(true);

    try {
      const projectData = {
        ...values,
        projectName: values.projectName.trim(),
        clientName: values.clientName.trim(),
        projectUrl: values.projectUrl.trim(),
        budget,
        qty,
        totalBudget: budget * qty,
      };

      if (isEditing) {
        await onUpdateProject({ ...projectData, id: editingProject.id });
      } else {
        await onAddProject(projectData);
        clearForm();
      }
    } catch {
      setErrors({ submit: "Could not save the project. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared props for the text-like inputs.
  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `error-${name}` : undefined,
    required: true,
  });

  return (
    <aside className="lg:col-span-4 w-full lg:sticky lg:top-20 self-start">
      <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        {/* Form Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isEditing ? "bg-amber-400" : "bg-blue-500"
                }`}
              />

              <h3
                id="formTitle"
                className="text-sm sm:text-base font-bold text-white uppercase tracking-tight"
              >
                {isEditing ? "Edit Project" : "Create Project"}
              </h3>
            </div>

            <p id="formSubtitle" className="text-xs text-zinc-400 mt-0.5">
              {isEditing
                ? "Update the selected project details"
                : "Enter details to add a new project"}
            </p>
          </div>

          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
              isEditing
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "bg-zinc-800 text-zinc-300 border-zinc-700"
            }`}
          >
            {isEditing ? "Editing" : "New Entry"}
          </span>
        </div>

        <form
          id="projectForm"
          onSubmit={handleFormSubmit}
          aria-labelledby="formTitle"
          aria-describedby="formSubtitle"
          aria-busy={isSubmitting}
          noValidate
        >
          <fieldset
            disabled={isSubmitting}
            className="min-w-0 space-y-3.5 sm:space-y-4"
          >
            <FormField
              id="projectName"
              label="Project Name"
              error={errors.projectName}
            >
              <input
                type="text"
                placeholder="e.g. NextGen SaaS Dashboard"
                className={inputClass}
                {...fieldProps("projectName")}
              />
            </FormField>

            <FormField
              id="clientName"
              label="Client Name"
              error={errors.clientName}
            >
              <input
                type="text"
                placeholder="e.g. Acme Global Tech"
                className={inputClass}
                {...fieldProps("clientName")}
              />
            </FormField>

            <FormField
              id="projectUrl"
              label="Project URL"
              error={errors.projectUrl}
            >
              <input
                type="url"
                placeholder="https://client-project.com"
                className={`${inputClass} font-mono-code`}
                {...fieldProps("projectUrl")}
              />
            </FormField>

            <FormField id="category" label="Category" error={errors.category}>
              <div className="relative">
                <select
                  className={`${inputClass} pr-10 appearance-none cursor-pointer`}
                  {...fieldProps("category")}
                >
                  <option value="" disabled>
                    Select category...
                  </option>

                  {hasExistingCategory && (
                    <option value={editingProject.category}>
                      {editingProject.category}
                    </option>
                  )}

                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </FormField>

            <FormField
              id="budget"
              label="Unit Budget ($ USD)"
              error={errors.budget}
            >
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 font-mono-code text-xs"
                >
                  $
                </span>

                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="5000"
                  className={`${inputClass} pl-7 font-mono-code`}
                  {...fieldProps("budget")}
                />
              </div>
            </FormField>

            <ErrorMessage id="errorSubmit" message={errors.submit} />

            {/* Buttons */}
            <div className="pt-3 flex items-center gap-2.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 shadow-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>
                  {isSubmitting
                    ? "Saving..."
                    : isEditing
                      ? "Save Changes"
                      : "Add Project"}
                </span>
              </button>

              <button
                type="button"
                onClick={isEditing ? onCancelEdit : clearForm}
                disabled={isSubmitting}
                className="px-3.5 py-2 sm:py-2.5 text-xs font-medium rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isEditing ? "Cancel" : "Clear"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </aside>
  );
};

Form.propTypes = {
  editingProject: PropTypes.object,
  onAddProject: PropTypes.func.isRequired,
  onUpdateProject: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
};

export default Form;
