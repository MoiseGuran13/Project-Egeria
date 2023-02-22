import { Suspense, useContext, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./index.css";
import GlobeContext from "./GlobeContext";
import Globe, { WireframeGlobe } from "./Globe";
import { Vector3 } from "three";
// import { AmbientLight } from "three";

function ShowGlobe(){
  const {path, setPath} = useContext(GlobeContext)
  const camera = useRef<any>(null!)
  const [position, setPosition] = useState<Vector3|undefined>(new Vector3(0, 30, 50))

  useEffect(() => {
    function handle(event: any){
      switch (event.key){
        case "r" :{
          setPosition(new Vector3(0, 30, 50))
       }
       case "R" :{
        setPosition(new Vector3(0, 30, 50))
       }
      }
    }

    document.addEventListener("keypress", handle)
  })
  
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={10} maxDistance={100} minDistance={16}/>

      <PerspectiveCamera ref={camera} makeDefault fov={50} position={position}/>

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