import { resolveItemIcon } from "../data/itemRegistry";

export default function ItemIcon({ item, size = 72, className = "" }) {
  const src = resolveItemIcon(item);
  return (
    <span className={`item-icon-frame ${className}`} style={{ width: size, height: size }}>
      <img
        src={src}
        alt={item?.name || "Item"}
        width={size}
        height={size}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = "/assets/items/materials/cristal_de_eter.png";
        }}
      />
    </span>
  );
}
