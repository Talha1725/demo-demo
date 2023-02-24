import { useMap } from "react-leaflet";
import "./SvgOverlay.css";

export default function SvgOverlay({ position, size, angle }) {
  const map = useMap();

  const svgStyle = {
    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
    width: size,
    height: size,
  };

  const point = map.latLngToContainerPoint(position);
  const positionStyle = {
    left: point.x,
    top: point.y,
  };

  return (
    <div className="SvgOverlay" style={positionStyle}>
      <svg viewBox="0 0 100 100" style={svgStyle}>
        <circle cx="50" cy="50" r="40" fill="blue" />
      </svg>
    </div>
  );
}


