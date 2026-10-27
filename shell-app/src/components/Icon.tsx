import type { AppId } from "@/types/window";

const iconModules = import.meta.glob(
  "../assets/icons/*.{svg,png,jpg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);
const icons = Object.fromEntries(
  Object.entries(iconModules).map(([path, url]) => {
    const fileName = path.split("/").pop() || "unknown";
    const name = fileName.replace(/\.[^.]+$/, "");

    return [name, url];
  })
);

type IconProps = {
  name: AppId;
  size?: number;
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function Icon({
  name,
  size = 24,
  width,
  height,
  className = "",
  alt = "",
  ...props
}: IconProps) {
  const src: any = icons[name];

  if (!src) {
    if (import.meta.env.DEV) {
      console.warn(`Icon "${name}" không tồn tại.`);
    }
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width ?? size}
      height={height ?? size}
      className={className}
      {...props}
    />
  );
}