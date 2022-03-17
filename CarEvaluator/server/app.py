from flask import Flask, request, jsonify
app = Flask(__name__)
from xgboost import XGBRegressor
import sys

MODEL = XGBRegressor()
MODEL.load_model('./linear_model.json')
@app.route("/")
def load_server():
    data = {'status': 200, 'message': 'Server Ready to accept data'}
    return jsonify(data)



@app.route("/evaluate", methods=["POST"])
def evaluate_car():
    
    print("Test", file=sys.stdout)
    input_data = request.json()
    print(input_data, file=sys.stderr)

    return jsonify({ 'status': 200, 'message': 'Data Received'})


if __name__ == '__main__':
    app.run(debug=True)
