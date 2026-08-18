import React from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'gold' | 'onDark' | 'quiet';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-forest text-ivory border border-forest hover:bg-forest-deep hover:border-forest-deep',
  outline: 'bg-transparent text-forest border border-forest/40 hover:border-forest hover:bg-forest hover:text-ivory',
  gold: 'bg-transparent text-gold-deep border border-gold/60 hover:bg-gold/10 hover:border-gold',
  onDark: 'bg-transparent text-ivory border border-ivory/35 hover:border-gold-light hover:text-gold-light',
  quiet:
  'bg-transparent border-b border-gold/50 text-forest px-0 hover:border-gold hover:text-forest-deep'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-[11px]',
  md: 'px-7 py-3.5 text-xs',
  lg: 'px-9 py-4 text-[13px]'
};

function classesFor({ variant = 'primary', size = 'md', fullWidth, className = '' }: BaseProps) {
  const pad = variant === 'quiet' ? 'pb-1.5 text-xs' : sizes[size];
  return [
  'inline-flex items-center justify-center gap-2.5 rounded-none font-sans font-semibold uppercase tracking-button',
  'transition-colors duration-200 ease-estate',
  variants[variant],
  pad,
  fullWidth ? 'w-full' : '',
  className].

  filter(Boolean).
  join(' ');
}

interface ButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {}

export function Button({ children, variant, size, className, icon, fullWidth, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={classesFor({ children, variant, size, className, fullWidth })}>
      {children}
      {icon ? <span aria-hidden="true" className="shrink-0">{icon}</span> : null}
    </button>);

}

interface ButtonLinkProps extends BaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> {
  href: string;
}

export function ButtonLink({ children, variant, size, className, icon, fullWidth, ...rest }: ButtonLinkProps) {
  return (
    <a {...rest} className={classesFor({ children, variant, size, className, fullWidth })}>
      {children}
      {icon ? <span aria-hidden="true" className="shrink-0">{icon}</span> : null}
    </a>);

}