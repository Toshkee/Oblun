type Variant = "solid" | "outline" | "light";

const variants: Record<Variant, string> = {
  solid: "bg-brown-900 text-white hover:bg-ink",
  outline: "border border-brown-900 text-brown-900 hover:bg-brown-900 hover:text-white",
  light: "bg-white text-brown-900 hover:bg-beige-300",
};

export type ButtonVariant = Variant;

export const buttonClass = (variant: Variant = "solid", extra = "") =>
  `inline-flex min-h-10 min-w-44 items-center justify-center gap-2 px-6 py-2.5 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-white ${variants[variant]} ${extra}`;
