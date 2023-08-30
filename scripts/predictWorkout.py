import joblib
import json

# Load the trained model
model_path = 'files/workoutModel.joblib'  # Relative path to your saved model
model = joblib.load(model_path)

# Get user input from Node.js
user_input = json.loads(input())

# Make a prediction using the loaded model
recommendation = model.predict(user_input).tolist()

# Return the recommendation as JSON
print(json.dumps(recommendation))
