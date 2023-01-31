use std::f64::consts::PI;
use image::GenericImageView;

fn coord_to_angle(coord: i32, max_coord: i32) -> f64 {
    return (max_coord * (coord - max_coord / 2)) as f64 * PI;
}

pub fn image_to_vetices(path: &str) -> Vec<[f64; 3]>{
    const RADIUS: f64 = 10.0;

    let img = image::open(path).unwrap();
    let (w, h) = img.dimensions();
    let width = w as i32;
    let height = h as i32; 
    // println!("{}", width);    
    // println!("{}", height);
    let mut verts = Vec::with_capacity((width * height).try_into().unwrap());


    for y in 0..height{
        for x in 0..width{
            let pix = img.get_pixel(x as u32, y as u32);
            let altitude = RADIUS + (pix[0]/51) as f64; 

            let mut coords: [f64; 3] = [0.0, 0.0, 1.0];

            let alpha = coord_to_angle(x, width);  // -1
            let beta = coord_to_angle(y, height);  // -1

            coords[0] = alpha.sin() * altitude;
            // let z = alpha.cos();
            coords[1] = alpha.cos() * beta.sin() * altitude;
            coords[2] = alpha.cos() * beta.cos() * altitude;

            verts.push(coords);
        }
    }
    return verts;
}
