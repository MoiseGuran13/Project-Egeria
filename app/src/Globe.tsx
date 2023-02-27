import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import GlobeContext from "./GlobeContext"
import texture from "./assets/Albedo-diffuse.jpg"
import normal from "./assets/Normal.jpg"
import { TextureLoader } from "three";
import init, {try_path} from "wasm-lib"

export function Globe() {
    const {path, setPath} = useContext(GlobeContext)
    const sphere = useRef<THREE.Mesh>(null!)
    const [isRevolving, startRevolving] = useState(true)
    const [rotationSpeed, setRevolutionSpeed] = useState(0.1)
    

    
    const [ans, setAns] = useState<String>();
      useEffect(() => {
        init().then(() => {
          setAns(try_path(normal));        
          // console.log(ans);

        })
      }, [])

    useFrame((_, delta) => {
      if (isRevolving)
        sphere.current.rotateY(rotationSpeed * delta)
    })
  
    useEffect(() => {
      function handle(event: any){
        switch (event.key){
          case " ":{
            if(isRevolving) {
              startRevolving(false)}
            else{
              startRevolving(true)}
  

            console.log(ans)  
            break;
            }
        }
      }
  
      document.addEventListener("keypress", handle)
    })
  
    const mesh = useMemo(() => {
        // console.log(normal)
        // console.log(ans)
        return(
        <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
          <sphereGeometry args={[15, 20]} />
          <meshStandardMaterial color={path} map={useLoader(TextureLoader, texture)} bumpMap={useLoader(TextureLoader, normal)}/>
        </mesh>)
      }, [path])
      return mesh;
  }

export function WireframeGlobe(){
  const sphere = useRef<THREE.Mesh>(null!)
  const [isRevolving, startRevolving] = useState(true)
  const rotationSpeed = 0.1

  useFrame((_, delta) => {
    if (isRevolving)
      sphere.current.rotateY(rotationSpeed * delta)
  })
  
  useEffect(() => {
    function handle(event: any){
      switch (event.key){
        case " ":{
          if(isRevolving) {
            startRevolving(false)}
          else{
            startRevolving(true)}

          break;
          }
      }
    }
  
    document.addEventListener("keypress", handle)
  })

  return(
    <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
      <sphereGeometry args={[15, 20]} />
      <meshBasicMaterial wireframe={true} color={"red"}/>
    </mesh>)
}

export default Globe;