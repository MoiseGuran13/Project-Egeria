import React, {Suspense, useEffect, useMemo, useRef, useState} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./index.css";
import { BoxGeometry } from "three";

export function WireframeGlobe(vertices?: string) {
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
      }
    }

    document.addEventListener("keypress", handle)
  })

  if (typeof vertices == 'undefined'){
    return(
      <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
        <sphereGeometry args={[15, 20]} />
        <meshBasicMaterial wireframe={true} color={"red"} />
      </mesh>
    )
  }
  else{
    return(
      <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
        <sphereGeometry args={[15, 20]} />
        <meshBasicMaterial wireframe={true} color={vertices} />
      </mesh>
    )
  }
  
  // Memoize the geometry
  // const geometry = <sphereGeometry args={[15, 20]} />;
    
  // })
  

}


function ShowGlobe(){
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45}/>

      <PerspectiveCamera makeDefault fov={50} position={[0, 30, 50]}/>

      <WireframeGlobe vertices={"yellow"}/>
    </>
  )
}

function App(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Canvas>
        <ShowGlobe />
      </Canvas>
    </Suspense>
  )
}

export default App;