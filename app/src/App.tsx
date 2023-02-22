import { Suspense, useContext, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./index.css";
import GlobeContext from "./GlobeContext";
import Globe, { WireframeGlobe } from "./Globe";
import { AmbientLight } from "three";

function ShowGlobe(){
  const {path, setPath} = useContext(GlobeContext)
  
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45}/>

      <PerspectiveCamera makeDefault fov={50} position={[0, 30, 50]}/>

      <ambientLight intensity={0.5}/>

      <pointLight position={[-45, 35, -30]} />

      <Suspense fallback={<WireframeGlobe />}>

        <Globe />
      
      </Suspense>
    </>
  )
}


function App(){
  const [path, setPath] = useState(undefined)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobeContext.Provider value={{path, setPath}}>
          <Canvas>
            <ShowGlobe />
          </Canvas>
      </GlobeContext.Provider>
    </Suspense>
  )
}

export default App;