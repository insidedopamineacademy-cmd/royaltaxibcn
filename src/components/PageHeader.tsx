import {ReactNode} from "react";

type PageHeaderProps = {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function PageHeader({title, description, action, className = ""}: PageHeaderProps) {
  return (
    <header className={className}>
      <h1 className="max-w-4xl text-3xl md:text-4xl">{title}</h1>
      <p className="mt-4 max-w-prose text-base leading-7 text-[var(--color-muted)] md:text-lg">
        {description}
      </p>
      {action ? <div className="mt-8">{action}</div> : null}
    </header>
  );
}
