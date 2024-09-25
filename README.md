# Build-Project-JSON-Graph-Visualizer

## Features
- **Navigation Menu**: You can navigate between the home and JSON viewer pages through the menu.
- **JSON Viewer**: You can use the JSON viewer to visualize the hierarchical structure of the JSON data

## Functionalities
- **Upload**: Upload JSON file to visualize its data
- **Visualize**: Visualize the hierarchical structure of the JSON data including the attribute names and data type using MaterialUI Tree View
- **Hierarchical Level**: Inspect the hierarchical level of specific data attribute by hovering on it
- **Expand**: Expand a specific level of JSON hierarchy in the visualization
- **Expand All**: Expand all the levels of JSON hierarchy in the visualization
- **Collapse**: Collapse a specific level of JSON hierarchy in the visualization
- **Collapse All**: Collapse all the levels of JSON hierarchy in the visualization
- **Clear Data**: Clear the JSON content
- Future Development:
  - **More Visualize**: Visualization using D3 Tidy Tree/Clustering Tree
  - **Live Server Deployment**: Deploy to live service with choices of Glitch, Netlify, or Render
  - **Data Persistence**: Store the data using a key-value store or a document-oriented database
  - **State Management**: Manage states across components leveraging Redux

## Tech Stack
- Front-end:
  - HTML, CSS, Typescript, JSX
  - React, React-router, React-spring
  - MaterialUI

## Available Scripts

In the project directory, you can run the JSON Graph Visualizer App in the following environments

### In the Development Environment
1. `npm start`
2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### In the Testing Environment
1. `npm test`
2. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### In the Production Environment
1. `npm run build`
2. It correctly bundles React in production mode and optimizes the build for the best performance.
3. The build is minified and the filenames include the hashes.
4. Your app is ready to be deployed!
5. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Re-configure and Re-build the app
1. **Note: this is a one-way operation. Once you `eject`, you can’t go back!**:
2. `npm run eject`
3. If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
4. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
5. You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

### About My Source Code
- [**public/**](https://github.com/StevenG777/BuildProject-JSON-Graph-Visualizer/tree/main/public): Contains static assets
  - [**index.html**](https://github.com/StevenG777/BuildProject-JSON-Graph-Visualizer/blob/main/public/index.html): Websites layout
  - [**favicon.ico**](https://github.com/StevenG777/BuildProject-JSON-Graph-Visualizer/blob/main/public/favicon.ico): Browser tab icon image
  - [**robot.txt**](https://github.com/StevenG777/BuildProject-JSON-Graph-Visualizer/blob/main/public/robots.txt): Rules for web crawlers and scrapers
- [**src/**](https://github.com/StevenG777/BuildProject-JSON-Graph-Visualizer/tree/main/src): Contains source code for react components
  - [**index.tsx**](https://github.com/StevenG777/BuildProject-JSON-Graph-Visualizer/blob/main/src/index.tsx): Entry point of the React application, define the root component and attach it to HTML document
[**index.css**](https://github.com/StevenG777/BuildProject-JSON-Graph-Visualizer/blob/main/src/index.css): Global styling for the whole application
  - [**app.tsx**](https://github.com/StevenG777/BuildProject-JSON-Graph-Visualizer/blob/main/src/App.tsx): Define the routing to Home page and JSON Viewer page components
  - [**app.css**](https://github.com/StevenG777/BuildProject-JSON-Graph-Visualizer/blob/main/src/App.css): Glocal styling for the main components
  - [**components/**](https://github.com/StevenG777/BuildProject-JSON-Graph-Visualizer/tree/main/src/Components): Contains children components under Home page and JSON Viewer page
    - 
 

### About Building React App
3. You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
4. To learn React, check out the [React documentation](https://reactjs.org/).

## My Reflection on This Project
The JSON Graph Visualizer is a web application I developed under the guidance of [Sanjeev Vijayara](https://www.linkedin.com/in/sanjeev-vijayaraj/) through the Open Avenues Build Project Program. This project not only enhanced my skills in web development but also introduced me to new technologies like TypeScript, React Router, and Material UI.

The application has two main pages: the Home page and the JSON Viewer page. The Home page includes a customizable title, an image, a counter, and a toggle section. The JSON Viewer page features a file upload component that visualizes the hierarchical structure of JSON files using the Material UI Tree View. The Navigation Menu allows seamless transitions between these pages, demonstrating my proficiency in React, React Router, and Material UI.

This experience has been invaluable in refining my understanding of TypeScript, particularly in declaring types and interfaces to minimize bugs caused by type errors. Additionally, Material UI streamlined the creation of aesthetically pleasing components. Leveraging my prior experience with React, I successfully built an industry-standard front-end application.

Looking ahead, I plan to incorporate libraries like D3.js or Cytoscape.js to provide diverse visual perspectives on JSON data. I also aim to host the application on platforms such as Netlify or Render for public access. To enhance user experience, I will integrate a persistent data store, eliminating the need for repeated JSON uploads. As the application grows, I intend to use Redux for efficient state management.

I am grateful to Sanjeev and the Open Avenues Build Project Program for their support and guidance. This project has significantly strengthened my web development skills, and I am excited to continue building more advanced features to create a seamless user experience.
