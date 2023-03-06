import { ReactElement, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import GlobeContext from "./GlobeContext"
import texture from "./assets/Albedo-diffuse.jpg"
import normal from "./assets/Normal.jpg"
import { TextureLoader } from "three";
// import init, {solve_mercator, try_path} from "wasm-lib"
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

function calculateBrightness(data: Uint8ClampedArray) {
  let result = new Float64Array(data.length / 4)

  for (let i = 0; i < result.length; i++)
    result[i] = data[i*4+3]/255 * (data[i*4] + data[i*4+1] + data[i*4+2])/765;

  return result
}

interface iGlobe{
  solve_mercator : (pixels: Float64Array, w: number, h: number) => Float64Array
}

export function Globe({ solve_mercator }: iGlobe): ReactElement {
    const {shape, setShape} = useContext(GlobeContext)
    const sphere = useRef<THREE.Mesh>(null!)
    const [isRevolving, startRevolving] = useState(true)
    const [rotationSpeed, setRevolutionSpeed] = useState(0.1)
    

    
    const [ans, setAns] = useState<Float64Array>();
      // useEffect(() => {
      //   // init();
      //   var canvas = document.createElement('canvas');
      //   var context = canvas.getContext('2d');
      //   if (context == undefined)
      //     return;
      //     // else{
      //   canvas.width = shape.width;
      //   canvas.height = shape.height;
      //     // shape.addEventListener('load', function(){
      //   context.drawImage(shape, 0, 0);
      //   const scan = context.getImageData(0, 0, canvas.width, canvas.height);
      //       // const brightness = scan?.data.length
      //   const brightness = calculateBrightness(scan.data)
      //   console.log(scan.data);
      //   console.log(scan.width);
      //   console.log(scan.height);
      //   console.log(brightness);
      //   setAns(solve_mercator(brightness, shape.width, shape.height));   
      //     // }     
      //     // })

      //     // console.log(ans);

      // }, [shape])

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
  
      document.addEventListener("keyup", handle)
    })
  
    const mesh = useMemo(() => {
        // console.log(normal)
        // console.log(ans)
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        if (context == undefined)
          return;
          // else{
        canvas.width = shape.width;
        canvas.height = shape.height;
          // shape.addEventListener('load', function(){
        context.drawImage(shape, 0, 0);
        const scan = context.getImageData(0, 0, canvas.width, canvas.height);
            // const brightness = scan?.data.length
        const brightness = calculateBrightness(scan.data)
        // console.log(scan.data);
        console.log(scan.width);
        console.log(scan.height);
        // console.log(brightness);
        setAns(solve_mercator(brightness, 32, 64));   
        console.log(ans);

        return(
        <mesh ref={sphere} rotation={[0, 0, -0.41]} position={[0, 0, 0]}>
          <sphereGeometry args={[15, 20]} />
          <meshStandardMaterial map={useLoader(TextureLoader, texture)} bumpMap={useLoader(TextureLoader, normal)}/>
        </mesh>)
      }, [shape])
    
    if (mesh == undefined)
      return WireframeGlobe();

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