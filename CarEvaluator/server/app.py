from dataclasses import replace
from flask import Flask, request, jsonify
app = Flask(__name__)
from xgboost import XGBRegressor
import sys
from flask_cors import CORS

CORS(app, resources={r'/*': { 'origins': ['*']}})



MODEL = XGBRegressor()
MODEL.load_model('./linear_model.json')
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
    
    print(replace_booleans, file=sys.stderr)
            
  


    return jsonify({ 'status': '200', 'message': 'Data Received' })


if __name__ == '__main__':
    app.run(debug=True)
