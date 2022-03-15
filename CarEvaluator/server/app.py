from flask import Flask, request, jsonify
app = Flask(__name__)
from xgboost import XGBRegressor

MODEL = XGBRegressor()
MODEL.load_model('./linear_model.json')
@app.route("/")
def load_server():
    data = {'status': 200, 'message': 'Server Ready to accept data'}
    return jsonify(data)



@app.route("/evaluate", methods=["POST"])
def evaluate_car():
    input_data = request.get_json(force=True)

    print(input_data)

    return jsonify({ 'status': 200, 'message': 'Data Received'})
