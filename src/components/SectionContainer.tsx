import {ReactNode} from "react";
import {Container} from "./Container";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
};

export function SectionContainer({
  children,
  className = "",
  containerClassName = "",
  id,
}: SectionContainerProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
