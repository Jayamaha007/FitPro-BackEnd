// import fs from 'fs';
// import path from 'path';
// import { PythonShell } from 'python-shell';
// import config from '../config.js';



// const getModelPath = () => {
//   const scriptUrl = import.meta.url; // Get the URL of the current module
//   const scriptDir = path.dirname(new URL(scriptUrl).pathname); // Extract the directory path
//   return path.join(scriptDir, '..', 'files', 'workoutmodel.pkl');
// };

// const loadModel = () => {
//   try {
//     const modelPath = getModelPath();
//     if (fs.existsSync(modelPath)) {
//       return modelPath;
//     }
//     return null;
//   } catch (error) {
//     console.error('Error loading model:', error);
//     return null;
//   }
// };

// export default loadModel;
