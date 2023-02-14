import { createContext } from "react";

let globePath: string | undefined = undefined;
const GlobeContext = createContext({
  path: globePath,
  setPath: (newPath: any) => {},
});

export default GlobeContext;