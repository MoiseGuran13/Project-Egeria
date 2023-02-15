import { Suspense, useContext, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./index.css";
// import { BoxGeometry } from "three";
// import { updateCamera } from "@react-three/fiber/dist/declarations/src/core/utils";
import GlobeContext from "./GlobeContext";
import Globe, { WireframeGlobe } from "./Globe";
import Background from "./Background.png"

function ShowGlobe(){
  const {path, setPath} = useContext(GlobeContext)
  
  useEffect(() => {
    function handle(event: any){
      if (event.key == "f")
        setPath("green")
        // console.log(path)
    }
  
    document.addEventListener("keypress", handle)
  })
  
  // console.log(require('./assets/Background.png'))
   return (
    <>
      <div>
        <img src={Background} alt={"Background"}/>
      </div>
      
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45}/>

      <PerspectiveCamera makeDefault fov={50} position={[0, 30, 50]}/>


      <WireframeGlobe />
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