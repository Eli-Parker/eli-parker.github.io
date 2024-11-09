# Three-JS and R3F portfolio

An interactive 3D portfolio site, built using React and Three.js with React Three Fiber (R3F). Serves as a personal deep-dive into React and R3F

The site showcases a floating laptop model housing an interactive iFrame of my standard website, along with various other interactive 3D elements.

**Multiple pages** are now included, with a projects and contact specific page which swap between one another using GSAP animations!

A **Title bar** is now also included, which exists as a part of the scene and gracefully hides when an element is focused on. Great care was taken to integrate the bar as a part of the 3-D experience.



## Features

- **Interactive 3D Model**: Showcases a floating laptop with text.
- **Toggle View Button**: A button that allows users to toggle the camera view closer to or away from the laptop.
- **Loading Screen**: A custom loading screen displayed while the 3D assets are being loaded.
- **Responsive Design**: The site is optimized for both desktop and mobile devices, with a warning for mobile users about the experience.
- **Magic Cube**: A 3D box with various geometries on its sides, showcasing the power and design capability within three-js. | How does it work? *Magic*.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Three.js & React-Three Fiber**: A 3D library that makes WebGL simpler.
- **React-Three Drei**: Helper components for R3F
- **GSAP**: Employed for smooth animations of the camera.
- **NPM and Vite**: Configured as the build tools for fast development and optimized production.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/eli-parker/eli-parker.github.io.git
    ```
2. Navigate to the project directory:
    ```bash
    cd eli-parker.github.io
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm start
    ```
2. Open your browser and visit the link in the terminal to see the project in action.

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Feel free to reach out if you have any questions or suggestions! I'm always trying to improve and learn more.

- Email: [EliParkDev@icloud.com](mailto:EliParkDev@icloud.com)
- GitHub: [eli-parker](https://github.com/eli-parker)

## Credits

### Social media chiclets

"Social Media Icons" (https://skfb.ly/pq8S8) by Daniel.Riches is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

### Computer monitor used in projects

"Computer Monitor Lowpoly Model" (https://skfb.ly/6WPqT) by Marco Zakaria is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

### ThreeJS Journey

This project was created with the help of three-js journey with major personal touches added,
but the base idea came from bruno simon and id like to thank him for teaching me three-js and
for his incredible work! If youd like to make apps like this, check out his program.
