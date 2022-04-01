from flask_cors import CORS
import sys
from xgboost import XGBRegressor
from dataclasses import replace
from flask import Flask, request, jsonify
import pandas as pd
app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': ['*']}})

COLUMN_ORDER = ['mileage',
                'Bluetooth',
                'Backup Camera',
                'Infotainment',
                'Screen',
                'Navigation',
                'Hands Free Calling',
                'Heated Seats',
                'Power Seat Controls',
                'Rear Air Vents',
                'Bed Liner',
                'Tow Hitch',
                'city_mpg',
                'highway_mpg',
                'year',
                'model_cat',
                'make_cat']

MODEL = XGBRegressor()
MODEL.load_model('./static/linear_model.json')
MODEL_RMSE = 3541


@app.route("/")
def load_server():
    data = {'status': 200, 'message': 'Server Ready to accept data'}
    return jsonify(data)


@app.route("/evaluate", methods=["POST"])
def evaluate_car():

    input_data = request.get_json()

    replace_booleans = {}
    for key, value in input_data.items():
        replace_booleans[key] = value

        if(value == True):
            replace_booleans[key] = 1
        if(value == False):
            replace_booleans[key] = 0

    replace_booleans['make_cat'] = int(replace_booleans['make_cat'])
    replace_booleans['model_cat'] = int(replace_booleans['model_cat'])

    input_df = pd.DataFrame(replace_booleans, index=[0])

    input_df = input_df[COLUMN_ORDER]
    prediction = MODEL.predict(input_df)[0]

    return jsonify({'status': '200', 'message': 'Data Received', 'prediction': str(prediction), 'error': MODEL_RMSE})


if __name__ == '__main__':
    app.run(debug=True)
