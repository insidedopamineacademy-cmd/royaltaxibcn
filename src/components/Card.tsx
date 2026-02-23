import {ReactNode} from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({children, className = ""}: CardProps) {
  return (
    <article
      className={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      {children}
    </article>
  );
}
