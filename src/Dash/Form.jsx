"use client";

import { useState } from "react";

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

const categories = [
  { value: "Web Development", label: "Web Development" },
  { value: "Mobile App", label: "Mobile App" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Cloud / DevOps", label: "Cloud / DevOps" },
  { value: "AI & ML", label: "AI & Machine Learning" },
  { value: "Branding & Growth", label: "Branding & Growth" },
];

const inputClass =
  "w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all";

const labelClass =
  "block text-xs font-medium text-zinc-300 mb-1";

const ErrorMessage = ({ id, message }) => {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className="text-[11px] text-rose-400 mt-1 flex items-center gap-1"
    >
      <svg
        className="w-3.5 h-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <span>{message}</span>
    </p>
  );
};

const Form = ({ onAddProject } = {}) => {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      submit: "",
    }));
  };

  const clearForm = () => {
    setValues({ ...initialValues });
    setErrors({});
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const projectName = values.projectName.trim();
    const clientName = values.clientName.trim();
    const projectUrl = values.projectUrl.trim();
    const budget = Number(values.budget);
    const qty = Number(values.qty);
    const totalBudget = budget * qty;

    const newErrors = {};

    if (!projectName) {
      newErrors.projectName = "Project name is required.";
    }

    if (!clientName) {
      newErrors.clientName = "Client name is required.";
    }

    try {
      const url = new URL(projectUrl);

      if (!["http:", "https:"].includes(url.protocol)) {
        newErrors.projectUrl =
          "Please enter an HTTP or HTTPS URL.";
      }
    } catch {
      newErrors.projectUrl = "Please enter a valid URL.";
    }

    if (!categories.some((item) => item.value === values.category)) {
      newErrors.category = "Please select a category.";
    }

    if (
      !String(values.budget).trim() ||
      !Number.isFinite(budget) ||
      budget <= 0
    ) {
      newErrors.budget = "Budget must be a positive number.";
    }

    if (!Number.isSafeInteger(qty) || qty < 1) {
      newErrors.submit = "Quantity must be a positive whole number.";
    } else if (
      !newErrors.budget &&
      !Number.isFinite(totalBudget)
    ) {
      newErrors.budget = "Total budget is too large.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const newProject = {
        ...values,
        id: crypto.randomUUID(),
        projectName,
        clientName,
        projectUrl,
        budget,
        qty,
        totalBudget,
      };

      if (onAddProject) {
        await onAddProject(newProject);
      } else {
        console.log("New project:", newProject);
      }

      clearForm();
    } catch {
      setErrors({
        submit: "Could not add the project. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="lg:col-span-4 w-full lg:sticky lg:top-20 self-start">
      <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        {/* Form Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />

              <h3
                id="formTitle"
                className="text-sm sm:text-base font-bold text-white uppercase tracking-tight"
              >
                Create Project
              </h3>
            </div>

            <p
              id="formSubtitle"
              className="text-xs text-zinc-400 mt-0.5"
            >
              Enter details to add a new project
            </p>
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
            New Entry
          </span>
        </div>

        {/* Form Fields */}
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
            {/* Project Name */}
            <div>
              <label htmlFor="projectName" className={labelClass}>
                Project Name <span className="text-rose-400">*</span>
              </label>

              <input
                type="text"
                id="projectName"
                name="projectName"
                value={values.projectName}
                onChange={handleChange}
                placeholder="e.g. NextGen SaaS Dashboard"
                className={inputClass}
                aria-invalid={Boolean(errors.projectName)}
                aria-describedby={
                  errors.projectName ? "errorProjectName" : undefined
                }
                required
              />

              <ErrorMessage
                id="errorProjectName"
                message={errors.projectName}
              />
            </div>

            {/* Client Name */}
            <div>
              <label htmlFor="clientName" className={labelClass}>
                Client Name <span className="text-rose-400">*</span>
              </label>

              <input
                type="text"
                id="clientName"
                name="clientName"
                value={values.clientName}
                onChange={handleChange}
                placeholder="e.g. Acme Global Tech"
                className={inputClass}
                aria-invalid={Boolean(errors.clientName)}
                aria-describedby={
                  errors.clientName ? "errorClientName" : undefined
                }
                required
              />

              <ErrorMessage
                id="errorClientName"
                message={errors.clientName}
              />
            </div>

            {/* Project URL */}
            <div>
              <label htmlFor="projectUrl" className={labelClass}>
                Project URL <span className="text-rose-400">*</span>
              </label>

              <input
                type="url"
                id="projectUrl"
                name="projectUrl"
                value={values.projectUrl}
                onChange={handleChange}
                placeholder="https://client-project.com"
                className={`${inputClass} font-mono-code`}
                aria-invalid={Boolean(errors.projectUrl)}
                aria-describedby={
                  errors.projectUrl ? "errorProjectUrl" : undefined
                }
                required
              />

              <ErrorMessage
                id="errorProjectUrl"
                message={errors.projectUrl}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className={labelClass}>
                Category <span className="text-rose-400">*</span>
              </label>

              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  className={`${inputClass} pr-10 appearance-none cursor-pointer`}
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={
                    errors.category ? "errorCategory" : undefined
                  }
                  required
                >
                  <option value="" disabled>
                    Select category...
                  </option>

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

              <ErrorMessage
                id="errorCategory"
                message={errors.category}
              />
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className={labelClass}>
                Unit Budget ($ USD){" "}
                <span className="text-rose-400">*</span>
              </label>

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 font-mono-code text-xs"
                >
                  $
                </span>

                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={values.budget}
                  onChange={handleChange}
                  min="0"
                  step="any"
                  placeholder="5000"
                  className={`${inputClass} pl-7 font-mono-code`}
                  aria-invalid={Boolean(errors.budget)}
                  aria-describedby={
                    errors.budget ? "errorBudget" : undefined
                  }
                  required
                />
              </div>

              <ErrorMessage
                id="errorBudget"
                message={errors.budget}
              />
            </div>

            <ErrorMessage
              id="errorSubmit"
              message={errors.submit}
            />

            {/* Buttons */}
            <div className="pt-3 flex items-center gap-2.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 shadow-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
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
                    strokeWidth="2.5"
                    d="M12 4v16m8-8H4"
                  />
                </svg>

                <span>
                  {isSubmitting ? "Adding..." : "Add Project"}
                </span>
              </button>

              <button
                type="button"
                onClick={clearForm}
                disabled={isSubmitting}
                className="px-3.5 py-2 sm:py-2.5 text-xs font-medium rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </aside>
  );
};

export default Form;