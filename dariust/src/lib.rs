use std::f64::consts::PI;
use std::convert::TryInto;
// use image::GenericImageView;
use wasm_bindgen::prelude::*;
// use js_sys::JsString;
use js_sys::Number;
use js_sys::Float64Array;   

fn coord_to_angle(coord: f64, max_coord: f64) -> f64 {
    return ((coord/max_coord) -0.5) * PI;
    // return ((2 * coord / max_coord) as f64 - 1.0) * 2.0 * PI;
}

// #[no_mangle]
// fn lengthofvec3(vec3: [f64; 3]) -> f64 {
//    return (vec3[0] * vec3[0] + vec3[1] * vec3[1] + vec3[2] * vec3[2]).sqrt();
// }

// #[no_mangle]
// fn printvec3(vec3: [f64; 3]) {
//     println!("x:{}; y:{}; z:{};     L:{}", vec3[0], vec3[1], vec3[2], lengthofvec3(vec3));
// }

fn copy_onto_vector(vector: &mut Vec<f64>, vec3: [f64; 3]) {
    vector.push(vec3[0]);
    vector.push(vec3[1]);
    vector.push(vec3[2]);
}

fn image_to_vetices(pixels: Vec<f64>, w: usize, h: usize) -> Vec<[f64; 3]>{
    const RADIUS: f64 = 10.0;

    // let img = image::open(path).unwrap();
    // let (w, h) = img.dimensions();
    let width = w as i32;
    let height = h as i32; 
    // println!("{}", width);    
    // println!("{}", height);
    let mut verts = Vec::with_capacity((width * height).try_into().unwrap());
    let mut coords: [f64; 3] = [0.0, 0.0, 1.0];

    verts.push([0.0, RADIUS + (pixels[0] as f64/51.0), 0.0]);

    for y in 1..height-1{
        let alpha = coord_to_angle(y as f64, height as f64 - 1.0); 

        for x in 0..width{
            // let pix = img.get_pixel(x as u32, y as u32);
            let altitude = RADIUS + (pixels[x as usize + y as usize * w] as f64/51.0); 
            let beta = coord_to_angle(x as f64, width as f64  - 1.0); 

            coords[0] = alpha.cos() * beta.sin() * altitude;
            coords[1] = -alpha.sin() * altitude;
            coords[2] = alpha.cos() * beta.cos() * altitude;

            verts.push(coords);
        }
    }

    verts.push([0.0, -RADIUS - (pixels[w*h-1] as f64/51.0), 0.0]);

    // printvec3(verts[0]);
    // printvec3(verts[1]);
    // printvec3(verts[131187600/2]);
    // printvec3(verts[verts.len() - 1]);
    // // printvec3(verts[16200]);
    // // printvec3(verts[4050 * 16200 + 8100]);
    // // printvec3(verts[131219999]);

    // println!("{}", width);
    // println!("{}", height);

    // printvec3(verts[w-1]);
    // printvec3(verts[w*h/4]);

    // println!("{}", verts[0]);
    // println!("{}", verts[width-1]);
    // println!("{}", verts[height*width/4]);

    return verts;
}

fn draw_up_model(verts: Vec<[f64; 3]>, width: usize, height: usize) -> Vec<f64> {
    let mut edges = Vec::<f64>::with_capacity((width * (height - 2) * 18).try_into().unwrap());
    // let len = verts.len();
    let spole = width * height - 2 * width + 1;

    for c in 1..width {
        copy_onto_vector(&mut edges, verts[0]);
        copy_onto_vector(&mut edges, verts[c]);
        copy_onto_vector(&mut edges, verts[c + 1]);
        
        copy_onto_vector(&mut edges, verts[spole]);
        copy_onto_vector(&mut edges, verts[spole - c]);
        copy_onto_vector(&mut edges, verts[spole - c - 1]);
    }

    copy_onto_vector(&mut edges, verts[0]);
    copy_onto_vector(&mut edges, verts[width]);
    copy_onto_vector(&mut edges, verts[1]);

    copy_onto_vector(&mut edges, verts[spole]);
    copy_onto_vector(&mut edges, verts[spole - width]);
    copy_onto_vector(&mut edges, verts[spole - 1]);

    for y in 1..(height-3){
        let cedge = 1 + width * y;
        copy_onto_vector(&mut edges, verts[cedge]);
        copy_onto_vector(&mut edges, verts[cedge + width - 1]);
        copy_onto_vector(&mut edges, verts[cedge + 2 * width - 1]);
        copy_onto_vector(&mut edges, verts[cedge + 2 * width - 1]);
        copy_onto_vector(&mut edges, verts[cedge + width]);
        copy_onto_vector(&mut edges, verts[cedge]);
        
        for x in 1..width{
            let corner = 1 + x + y * width;
            copy_onto_vector(&mut edges, verts[corner]);
            copy_onto_vector(&mut edges, verts[corner - 1]);
            copy_onto_vector(&mut edges, verts[corner - 1 + width]);
            copy_onto_vector(&mut edges, verts[corner - 1 + width]);
            copy_onto_vector(&mut edges, verts[corner + width]);
            copy_onto_vector(&mut edges, verts[corner]);
        }
    }

    return edges;
}

#[wasm_bindgen]
pub fn try_path(pixels: Float64Array, w: Number, h: Number) -> Number {
    // let img = image::open(path).unwrap();
    // let (w, h) = img.dimensions();
    let width = <Number as Into<f64>>::into(w) as usize;
    let height = <Number as Into<f64>>::into(h) as usize; 

    return Number::from((pixels.to_vec().len()/(width*height-1)) as i32);

    // let vertices = image_to_vetices(pixels.to_vec(), width, height);
    // return draw_up_model(vertices, width, height);
}   


#[wasm_bindgen]
pub unsafe fn solve_mercator(pixels: Float64Array, w: Number, h: Number) -> Float64Array {
    // let img = image::open(path).unwrap();
    // let (w, h) = img.dimensions();
    let width = <Number as Into<f64>>::into(w) as usize;
    let height = <Number as Into<f64>>::into(h) as usize; 

    let vertices = image_to_vetices(pixels.to_vec(), width, height);
    return Float64Array::view(&draw_up_model(vertices, width, height));
}   

// #[test]
// fn path_test() {
//     let jspath: JsString = JsString::from("/Project-Egeria/app/src/assets/Normal.jpg");
//     let path: &str = &(<JsString as Into<String>>::into(jspath))[..];
//     let img = image::open(path).unwrap();
//     let (w, _) = img.dimensions();
//     println!("{}", w);
// }