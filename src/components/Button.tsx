import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "gold" | "whatsapp" | "outline";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
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
    "border border-[var(--color-navy)] bg-[var(--color-navy)] !text-white hover:-translate-y-0.5 hover:bg-[var(--color-navy-strong)] hover:shadow-soft",
  secondary:
    "border border-[var(--color-navy)] bg-white !text-[var(--color-navy)] hover:bg-gray-100",
  gold:
    "border border-[var(--color-gold)] bg-[var(--color-gold)] !text-[var(--color-ink)] hover:-translate-y-0.5 hover:bg-[#b69545] hover:shadow-soft",
  whatsapp:
    "border border-[var(--color-whatsapp)] bg-[var(--color-whatsapp)] !text-white hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-soft",
  outline:
    "border border-[var(--color-navy)] bg-white !text-[var(--color-navy)] hover:bg-gray-100",
};

const baseStyle =
  "inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] disabled:cursor-not-allowed disabled:opacity-70";

export function Button(props: AnchorButtonProps): ReactElement;
export function Button(props: NativeButtonProps): ReactElement;
export function Button(props: ButtonProps): ReactElement {
  const {variant = "primary", className = "", children, leftIcon} = props;
  const buttonClassName = `${baseStyle} ${styles[variant]} ${className}`;

  if ("href" in props) {
    const anchorProps = props as AnchorButtonProps;
    const {
      href,
      variant: _variant,
      className: _className,
      children: _children,
      leftIcon: _leftIcon,
      ...restAnchorProps
    } = anchorProps;

    return (
      <a href={href} className={buttonClassName} {...restAnchorProps}>
        {leftIcon ? <span className="mr-2 inline-flex h-4 w-4 items-center justify-center">{leftIcon}</span> : null}
        <span>{children}</span>
      </a>
    );
  }

  const nativeProps = props as NativeButtonProps;
  const {
    variant: _variant,
    className: _className,
    children: _children,
    leftIcon: _leftIcon,
    ...restButtonProps
  } = nativeProps;

  return (
    <button className={buttonClassName} {...restButtonProps}>
      {leftIcon ? <span className="mr-2 inline-flex h-4 w-4 items-center justify-center">{leftIcon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
