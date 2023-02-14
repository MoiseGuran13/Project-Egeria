import React, {createContext, Suspense, useContext, useEffect, useMemo, useRef, useState} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./index.css";
import { BoxGeometry } from "three";
import { updateCamera } from "@react-three/fiber/dist/declarations/src/core/utils";

let globePath: string | undefined = undefined;
const GlobeContext = createContext({path: globePath});

export function WireframeGlobe() {
  const path= useContext(GlobeContext)
  const sphere = useRef<THREE.Mesh>(null!)
  const [isRevolving, startRevolving] = useState(true)
  const [rotationSpeed, setRevolutionSpeed] = useState(0.1)
  
  useFrame((state, delta) => {
    if (isRevolving)
      sphere.current.rotateY(rotationSpeed * delta)
  })

  useEffect(() => {
    function handle(event: any){
      switch (event.key){
        case " ":
          if(isRevolving) 
            startRevolving(false)
          else
            startRevolving(true)
        case "f":
          console.log(path)
      }
    }

    document.addEventListener("keypress", handle)
  })

  if (typeof path == 'string'){
    return(
      <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
        <sphereGeometry args={[15, 20]} />
        <meshBasicMaterial wireframe={true} color={path} />
      </mesh>
    )
  }

  return(
    <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
      <sphereGeometry args={[15, 20]} />
      <meshBasicMaterial wireframe={true} color={"red"} />
    </mesh>
  )
  
  // Memoize the geometry
  // const geometry = <sphereGeometry args={[15, 20]} />;
    
  // })
  

}


function ShowGlobe(){
  const {path, updatePath} = useContext(GlobeContext)
  
  useEffect(() => {
    function handle(event: any){
      if (event.key == "f")
        updatePath("green")
        console.log(path)
    }
  
    document.addEventListener("keypress", handle)
  })
  
   return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45}/>

      <PerspectiveCamera makeDefault fov={50} position={[0, 30, 50]}/>

      <WireframeGlobe />
    </>
  )
}

function App(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobeContext.Provider value={globePath}>
        <Canvas>
          <ShowGlobe />
        </Canvas>
      </GlobeContext.Provider>
    </Suspense>
  )
}

export default App;