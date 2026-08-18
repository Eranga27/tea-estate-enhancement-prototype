import React from 'react';

type Surface = 'ivory' | 'parchment' | 'white' | 'forest' | 'forestDeep';

const surfaces: Record<Surface, string> = {
  ivory: 'bg-ivory text-ink',
  parchment: 'bg-ivory-parchment text-ink',
  white: 'bg-white text-ink',
  forest: 'bg-forest text-ivory',
  forestDeep: 'bg-forest-deep text-ivory'
};

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow';
}

export function Container({ children, className = '', size = 'default' }: ContainerProps) {
  const width = size === 'narrow' ? 'max-w-4xl' : 'max-w-estate';
  return <div className={`mx-auto w-full ${width} px-6 sm:px-8 lg:px-14 ${className}`}>{children}</div>;
}

interface SectionProps {
  children: React.ReactNode;
  surface?: Surface;
  className?: string;
  id?: string;
  spacing?: 'default' | 'tight' | 'loose';
  as?: 'section' | 'div' | 'footer' | 'header';
}

export function Section({
  children,
  surface = 'ivory',
  className = '',
  id,
  spacing = 'default',
  as: Tag = 'section'
}: SectionProps) {
  const pad =
  spacing === 'tight' ?
  'py-14 md:py-16' :
  spacing === 'loose' ?
  'py-24 md:py-36 lg:py-44' :
  'py-20 md:py-28 lg:py-32';
  return (
    <Tag id={id} className={`relative w-full ${surfaces[surface]} ${pad} ${className}`}>
      {children}
    </Tag>);

}