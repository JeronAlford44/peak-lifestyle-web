from flask import Flask
#RIGHT NOW SCRIPT WILL ONLY WORK FOR LOCAL USER; STILL NEED TO SEE IF THIS CODE WORKS ON MULTUPLE DEVICES AT THE SAME TIME

"""import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import json
import asyncio 








#ONLY ADMIN can access this credential object
cred = credentials.Certificate("../../../peak-lifestyle-web-firebase-adminsdk-fev4n-c7253ed4b0.json") 

firebase_admin.initialize_app(cred)
db = firestore.client()
docs = db.collection('HelpForms').get()"""
#make class to update firestore, delete from firestore, #generate chatbot response to then be put to firestore
app = Flask(__name__)
@app.route('/users')
# class User():
#     def __init__(self) -> None:
        
    
#         pass
def users():
  
    # All_UIDs = {} 
    # recent_MSG = max({'name': 'name'}.keys())
    
    # def test():
    #     return None
    return {"userId": ['user1','user2','user3']}


if __name__ == "__main__":
    app.run(debug = True)