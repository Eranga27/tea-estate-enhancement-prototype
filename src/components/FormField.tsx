import React from 'react';

type FieldTone = 'light' | 'dark';

interface FieldShellProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
  error?: string;
  tone?: FieldTone;
  className?: string;
}

function FieldShell({ label, htmlFor, children, hint, error, tone = 'light', className = '' }: FieldShellProps) {
  const isDark = tone === 'dark';
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={htmlFor} className={`u-eyebrow text-[10px] ${isDark ? 'text-ivory/70' : 'text-ink-faint'}`}>
        {label}
      </label>
      <div className="mt-2.5">{children}</div>
      {error ?
      <p className="mt-2 font-serif text-sm italic text-[#8C3A2B]">{error}</p> :
      hint ?
      <p className={`mt-2 font-serif text-sm italic ${isDark ? 'text-ivory/50' : 'text-ink-faint'}`}>{hint}</p> :
      null}
    </div>);

}

function controlClasses(tone: FieldTone, invalid?: boolean) {
  const base =
  'w-full rounded-none border bg-white px-4 py-3.5 font-sans text-[15px] text-ink placeholder:text-ink-faint/70 transition-colors duration-200 ease-estate focus:outline-none';
  const dark =
  'w-full rounded-none border bg-transparent px-4 py-3.5 font-sans text-[15px] text-ivory placeholder:text-ivory/40 transition-colors duration-200 ease-estate focus:outline-none';
  const border = invalid ?
  'border-[#8C3A2B]' :
  tone === 'dark' ?
  'border-ivory/25 focus:border-gold-light' :
  'border-black/10 focus:border-gold';
  return `${tone === 'dark' ? dark : base} ${border}`;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  tone?: FieldTone;
  wrapperClassName?: string;
}

export function Input({ label, id, hint, error, tone = 'light', wrapperClassName, ...rest }: InputProps) {
  return (
    <FieldShell label={label} htmlFor={id} hint={hint} error={error} tone={tone} className={wrapperClassName}>
      <input id={id} aria-invalid={error ? true : undefined} {...rest} className={controlClasses(tone, !!error)} />
    </FieldShell>);

}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  tone?: FieldTone;
  wrapperClassName?: string;
}

export function Textarea({ label, id, hint, error, tone = 'light', wrapperClassName, ...rest }: TextareaProps) {
  return (
    <FieldShell label={label} htmlFor={id} hint={hint} error={error} tone={tone} className={wrapperClassName}>
      <textarea
        id={id}
        rows={5}
        aria-invalid={error ? true : undefined}
        {...rest}
        className={`${controlClasses(tone, !!error)} resize-y leading-relaxed`} />
      
    </FieldShell>);

}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: {value: string;label: string;}[];
  hint?: string;
  error?: string;
  tone?: FieldTone;
  wrapperClassName?: string;
}

export function Select({
  label,
  id,
  options,
  hint,
  error,
  tone = 'light',
  wrapperClassName,
  ...rest
}: SelectProps) {
  return (
    <FieldShell label={label} htmlFor={id} hint={hint} error={error} tone={tone} className={wrapperClassName}>
      <select id={id} aria-invalid={error ? true : undefined} {...rest} className={controlClasses(tone, !!error)}>
        {options.map((option) =>
        <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )}
      </select>
    </FieldShell>);

}