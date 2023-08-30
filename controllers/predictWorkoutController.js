import express from 'express';
import { PythonShell } from 'python-shell';
import { fileURLToPath } from 'url';
import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const predictWorkout = async(req,res) => {
//   const user_input = req.body.user_input; // Retrieve the user_input from the request body
//   console.log(user_input)

//   const pythonShellOptions = {
//     mode: 'text',
//     pythonOptions: ['-u'], // unbuffered output
//     scriptPath: path.join(__dirname, '..', 'scripts'),
//     args: [user_input.join(',')] // Pass user_input as argument
//   };
//   console.log('options good')

//   PythonShell.run('predictWorkout.py', pythonShellOptions, (err, results) => {
//     if (err) {
//       console.error('Prediction error:', err);
//       res.status(500).json({ error: 'Prediction error' });
//     } else {
//       console.log("wada bn")
//       const recommendation = JSON.parse(results[0]);
//       console.log(recommendation)
//       res.json({ workout_recommendation: recommendation });
//     }
//   });
//   console.log('run good')
// };


const predictWorkout = async (req, res) => {
  const user_input = req.body.user_input; // Example: [[30, 70, 3, 1500]]

  // Configure the PythonShell
  const options = {
    mode: 'text',
    pythonPath: '../scripts/predictWorkout.py', // Replace with your Python executable path
    pythonOptions: ['-u'], // unbuffered output
    scriptPath: __dirname,
    args: [JSON.stringify(user_input)],
  };

  // Execute the Python script
  PythonShell.run('predictWorkout.py', options, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while running the model.' });
    }

    const recommendation = JSON.parse(results[0]);
    res.json({ recommendation });
  });
};

export default predictWorkout;
