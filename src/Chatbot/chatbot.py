import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import json


firebaseConfig = '{ apiKey: "AIzaSyDjN0OJDW7om1zm7whd5-5rTmbeXDPIzTA",authDomain: "peak-lifestyle-web.firebaseapp.com", projectId: "peak-lifestyle-web", storageBucket: "peak-lifestyle-web.appspot.com",messagingSenderId: "38291866815",appId: "1:38291866815:web:4d2809d4014ee73cf2f20a" }'

# Application Default credentials are automatically created.




cred = credentials.Certificate("../../../peak-lifestyle-web-firebase-adminsdk-fev4n-c7253ed4b0.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
docs = db.collection('HelpForms').get()

# Print the data in each document
for doc in docs:
    print(doc.to_dict())

greetings = {u'greetings' : u'"Welcome!", "I hope you are doing well!", "Thanks for joining us today!", "Thanks again for loggin in!", "How are you feeling today?"'} 
print(json.dumps(greetings))
db.collection(u'Chatbot').document(u'greetings').set((greetings))