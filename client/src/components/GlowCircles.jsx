import "./GlowCircles.css";

function GlowCircles({ variant = "home" }) {
  return (
    <div className={`glow-circles glow-circles-${variant}`}>
      <div className="circle-circle1"></div>
    </div>
  );
}

export default GlowCircles;