import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[13px] text-destructive">{message}</p>;
}

export function FormAlert({
  ok,
  message,
}: {
  ok: boolean;
  message: string;
}) {
  if (!message) return null;
  return (
    <p
      className={cn(
        "rounded-2xl px-4 py-3 text-[15px]",
        ok ? "bg-green-500/10 text-green-700" : "bg-destructive/10 text-destructive"
      )}
      role="status"
    >
      {message}
    </p>
  );
}

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  options: readonly { value: string; label: string }[];
  error?: string;
};

export function SelectField({
  id,
  name,
  label,
  defaultValue,
  options,
  error,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition-[border-color,box-shadow] focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}

export function FormCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 space-y-1">
        <h3 className="text-xl font-bold tracking-tight text-slate-900">{title}</h3>
        {description ? (
          <p className="text-sm leading-relaxed text-slate-500">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
