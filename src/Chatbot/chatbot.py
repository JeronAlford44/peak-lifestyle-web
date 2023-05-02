import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import json
import asyncio 








#ONLY ADMIN can access this credential object
cred = credentials.Certificate("../../../peak-lifestyle-web-firebase-adminsdk-fev4n-c7253ed4b0.json") 

firebase_admin.initialize_app(cred)
db = firestore.client()
docs = db.collection('HelpForms').get()


# Print the data in each document
for doc in docs:
    print(doc.to_dict())


greetings = ["Welcome!","I hope you are doing well!", "Thanks for joining us today!", "Thanks again for loggin in!", "How are you feeling today?", 'Hi!']

for word in greetings:
    db.collection("greetings").add({"text": word})
