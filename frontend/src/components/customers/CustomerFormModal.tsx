import { useState } from "react";
import type { Customer } from "./types";

type CustomerFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Customer, "id">) => void;
  availableTags: string[];
  availableEventTypes: string[];
  availableTimezones: string[];
};

const emptyForm: Omit<Customer, "id"> = {
  name: "",
  email: "",
  phone: "",
  tag: "",
  eventType: "",
  company: "",
  jobTitle: "",
  timezone: "",
};

const CustomerFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  availableTags,
  availableEventTypes,
  availableTimezones,
}: CustomerFormModalProps) => {
  const [form, setForm] = useState<Omit<Customer, "id">>(emptyForm);

  if (!isOpen) return null;

  const handleChange = (
    field: keyof Omit<Customer, "id">,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm(emptyForm);
    onClose();
  };

  const handleCancel = () => {
    setForm(emptyForm);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4"
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full rounded-xl bg-white shadow-xl border border-gray-200 px-6 pt-6 pb-4 space-y-4"
      >
        <h2 className="text-base font-semibold text-gray-900">
          Add customer
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <FormField
            label="Name"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            required
          />
          <FormField
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
            required
          />
          <FormField
            label="Phone number"
            value={form.phone}
            onChange={(v) => handleChange("phone", v)}
          />
          <SelectField
            label="Tag"
            value={form.tag}
            onChange={(v) => handleChange("tag", v)}
            options={availableTags}
            required
          />
          <SelectField
            label="Event type"
            value={form.eventType}
            onChange={(v) => handleChange("eventType", v)}
            options={availableEventTypes}
            required
          />
          <FormField
            label="Company"
            value={form.company}
            onChange={(v) => handleChange("company", v)}
          />
          <FormField
            label="Job title"
            value={form.jobTitle}
            onChange={(v) => handleChange("jobTitle", v)}
          />
          <SelectField
            label="Time zone"
            value={form.timezone}
            onChange={(v) => handleChange("timezone", v)}
            options={availableTimezones}
            required
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-5 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700"
          >
            Add customer
          </button>
        </div>
      </form>
    </div>
  );
};

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

const FormField = ({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: FormFieldProps) => (
  <label className="flex flex-col gap-1 text-xs sm:text-sm text-gray-700">
    <span>{label}</span>
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-300 px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </label>
);

export default CustomerFormModal;

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  required?: boolean;
};

const SelectField = ({
  label,
  value,
  onChange,
  options,
  required,
}: SelectFieldProps) => (
  <label className="flex flex-col gap-1 text-xs sm:text-sm text-gray-700">
    <span>{label}</span>
    <select
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-300 px-2 py-1 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>
        Select {label.toLowerCase()}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);


