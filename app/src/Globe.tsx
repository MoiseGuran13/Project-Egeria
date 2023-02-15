import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import GlobeContext from "./GlobeContext"

export function Globe() {
    const {path, setPath} = useContext(GlobeContext)
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
          case " ":{
            if(isRevolving) 
              startRevolving(false)
            else
              startRevolving(true)
            }
          case "f":{
            console.log(path)
          }
        }
      }
  
      document.addEventListener("keypress", handle)
    })
  
    return useMemo(() => {
      if (typeof path == 'string'){
        return(
        <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
          <sphereGeometry args={[15, 20]} />
          <meshBasicMaterial wireframe={true} color={path} />
        </mesh>)
      }else{
        return(
        <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
          <sphereGeometry args={[15, 20]} />
          <meshBasicMaterial wireframe={true} color={"red"} />
        </mesh>)}
    }, path)
  }

  export default Globe;