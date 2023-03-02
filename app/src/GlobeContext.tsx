import { createContext } from "react";
import normal from "./assets/Normal.jpg"

let globeShape = new Image();
globeShape.src = normal;

const GlobeContext = createContext({
  shape: globeShape,
  setShape: (newPath: any) => {},
});

export default GlobeContext;