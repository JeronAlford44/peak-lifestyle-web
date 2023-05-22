from flask import Flask
from flask import jsonify
from flask import request



app = Flask(__name__)


@app.route('/')
def home():
    return 'Home Page Route'


@app.route('/about')
def about():
    return 'About Page Route'


@app.route('/portfolio')
def portfolio():
    return 'Portfolio Page Route'


@app.route('/contact')
def contact():
    return 'Contact Page Route'



@app.route('/processjson',methods = {['POST']})
def processjson():
    data = request.get_json()
    if data: 
        return jsonify({'data': data})












@app.route('/api')
def api():
    with open('data.json', mode='r') as my_file:
        text = my_file.read()
        return text
    
if __name__ == "__main__":
    app.run(debug = True)