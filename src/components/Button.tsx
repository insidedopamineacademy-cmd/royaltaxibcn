import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "outline" | "whatsapp";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type AnchorButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

const styles: Record<ButtonVariant, string> = {
  primary:
    "border border-[#2563EB] bg-[#2563EB] text-white hover:bg-blue-700",
  outline:
    "border border-[var(--color-ink)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white",
  whatsapp:
    "border border-[#25D366] bg-[#25D366] text-white hover:bg-emerald-500",
};

const baseStyle =
  "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]";

export function Button(props: AnchorButtonProps): ReactElement;
export function Button(props: NativeButtonProps): ReactElement;
export function Button(props: ButtonProps): ReactElement {
  const {variant = "primary", className = "", children} = props;
  const buttonClassName = `${baseStyle} ${styles[variant]} ${className}`;

  if ("href" in props) {
    const anchorProps = props as AnchorButtonProps;
    const {
      href,
      variant: _variant,
      className: _className,
      children: _children,
      ...restAnchorProps
    } = anchorProps;

    return (
      <a href={href} className={buttonClassName} {...restAnchorProps}>
        {children}
      </a>
    );
  }

  const nativeProps = props as NativeButtonProps;
  const {
    variant: _variant,
    className: _className,
    children: _children,
    ...restButtonProps
  } = nativeProps;

  return (
    <button className={buttonClassName} {...restButtonProps}>
      {children}
    </button>
  );
}
