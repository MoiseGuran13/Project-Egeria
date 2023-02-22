import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import GlobeContext from "./GlobeContext"
import texture from "./../public/Albedo-diffuse.jpg"
import normal from "./../public/Normal.jpg"
import { TextureLoader } from "three";

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
        }
      }
  
      document.addEventListener("keypress", handle)
    })
  
    return useMemo(() => {
        return(
        <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
          <sphereGeometry args={[15, 20]} />
          <meshStandardMaterial color={path} map={useLoader(TextureLoader, texture)} bumpMap={useLoader(TextureLoader, normal)}/>
        </mesh>)
      }, path)
  }

  export function WireframeGlobe(){
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