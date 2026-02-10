import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [colors, setColors] = useState([]);
  const [copied, setCopied] = useState(null);

  // Generar color aleatorio
  const generateRandomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  // Generar paleta de 5 colores
  const generatePalette = () => {
    const newColors = Array.from({ length: 5 }, () => generateRandomColor());
    setColors(newColors);
  };

  // Generar paleta inicial
  useEffect(() => {
    generatePalette();
  }, []);

  // Copiar color al portapapeles
  const copyToClipboard = (color, index) => {
    navigator.clipboard.writeText(color);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container">
      <div className="content">
        <h1>🎨 Generador de Paletas</h1>
        <p className="subtitle">Haz clic en un color para copiarlo</p>

        <div className="palette">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`color-box ${copied === index ? "copied" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => copyToClipboard(color, index)}
            >
              <div className="color-code">{color}</div>
              <div className="copy-text">
                {copied === index ? "✓ Copiado" : "Copiar"}
              </div>
            </div>
          ))}
        </div>

        <button className="btn-generate" onClick={generatePalette}>
          🔄 Generar Nueva Paleta
        </button>
      </div>
    </div>
  );
}

export default App;
