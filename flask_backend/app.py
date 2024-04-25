from flask import Flask, request, jsonify


import joblib

app = Flask(__name__)

# Load your trained model
model = joblib.load("./classifier.pkl")  # Replace "your_model.pkl" with the path to your model file

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Receive input data
    # Perform any necessary preprocessing on the input data
    prediction = model.predict(data)  # Pass input data to your model for prediction
    return jsonify({'prediction': prediction.tolist()})  # Return predictions as JSON

if __name__ == '__main__':
    app.run(debug=True)
