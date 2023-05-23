from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS

res = []
class User():
    def __init__(self, uid):
        self.uid = uid
    def PushText(self):
        text = request.json
        ##add 'text' to doc based on uid with time as key and text as value
        pass
    def DeleteText(self):
        pass


app = Flask(__name__)
CORS(app)



@app.route('/',methods = ["POST", "GET"],)
def processjson():
    data = request.json
  
    res.append(data)
    return jsonify({'res': res})


 









# @app.route('/api')
# def api():
#     with open('data.json', mode='r') as my_file:
#         text = my_file.read()
#         return text
    
if __name__ == "__main__":
    app.run(host='localhost', port=9874)