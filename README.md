# Project-Egeria

## A constantly improving tool for generating 3D models of Earth from the most commong projections

This is a personal project meant to help me develop and hone my React and Rust skills. At the time of its initialisation, I did not know Javascript or Rust.

To use it simply visit [the associated website](https://moiseguran13.github.io/Project-Egeria/) and upload your two maps: a shape modifier and a texture. The former will be used to generate the 3D model itself and the ladder to colour it in. For example, the default maps you see when opening the website are the altitude map as the shape modifier and an artistic representation of the globe's climates as texture.

**visual help needed**

### Technical explanation:

This project is intended to be comprised of two parts. A React-built user interface (currently only made with vanilla JavaScript) and a particular Rust library (named Dariust), made and maintained specifically for this project.

### Beyond 1.0

While this project isn't anyway near completion yet, its MVP would be purely functional and for the desktop only. From there, different paths for improvement do exist and this is a list in no particular order:

- A full React Native integration
- An API for creating the 3D model through plain text\code
- Further customizability in terms of model generation
- The ability to use multiple shape modifiers at once
- An extremely accurate representation of Earth (possibly using Nasa's measurements of Earth's gravity)
- Supporting more map projections / Allowing user input map projections
 
