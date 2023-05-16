function GradientSVG() {
    const idCSS = "gradient";
    const gradientTransform = `rotate(90)`;
    return (
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={idCSS} gradientTransform={gradientTransform}>
            <stop offset="18%" stopColor="#DB2322" />
            <stop offset="90%" stopColor="#092C4C" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  
  export default GradientSVG;