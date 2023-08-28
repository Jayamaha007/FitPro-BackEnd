import sys
import os
import json
import joblib

def main():
    user_input_str = sys.argv[1]
    user_input = [float(val) for val in user_input_str.split(',')]

    model_path = os.path.join(os.path.dirname(__file__), '..', 'files', 'workoutmodel.joblib')

    model = joblib.load(model_path)

    recommendation = model.predict([user_input])
    print(json.dumps(recommendation.tolist()))

if __name__ == '__main__':
    main()
