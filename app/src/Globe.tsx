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
  
    let result: JSX.Element
    if (typeof path == 'string'){
      result = useMemo(() =>{
        // console.log("Expensed")
        return <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
          <sphereGeometry args={[15, 20]} />
          <meshBasicMaterial wireframe={true} color={path} />
        </mesh>
      }, path)
      
    }else{
      // console.log("Ooops")
      result = 
        <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
          <sphereGeometry args={[15, 20]} />
          <meshBasicMaterial wireframe={true} color={"red"} />
        </mesh>
    }
  
    return result
    
    // Memoize the geometry
    // const geometry = <sphereGeometry args={[15, 20]} />;
      
    // })
    
  
  }

  export default Globe;