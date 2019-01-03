from flask import Flask, request, jsonify, flash, redirect, url_for
from werkzeug import secure_filename
import csv
import os
app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route("/")
def index():
    return peer()

@app.route("/peer", methods=['GET'])
def peer():
    data = {
    "name": "",
     "CBSA": "",
     "population": {},
     "error": 'Please supply a zipcode using the parameter zip'
     }
    zipcode = request.args.get('zip', 0)
    if zipcode != 0:
        data['zipcode'] = zipcode
        with open('zip_to_cbsa.csv', newline='') as csvfile:
            zip_to_cbsa = csv.reader(csvfile, delimiter=',', quotechar='|')
            for row in zip_to_cbsa:
                if row[0] == zipcode:
                    print(row[0])
                    print("row[0]")
                    print(row[1])
                    data['error'] = False
                    data['CBSA'] = row[1]
        if data['CBSA']:
            with open('cbsa_to_msa.csv', newline='', encoding='latin-1') as cbsafile:
                cbsa_to_msa = csv.reader(cbsafile, delimiter=',', quotechar='|')
                for row in cbsa_to_msa:
                    print(row[0])
                    if row[1] == data['CBSA']:
                        data['name'] = row[3]
                        data['CBSA'] = row[0]
                        data['population'] = {
                        "2014": row[11],
                        "2015": row[12]
                        }
                    elif row[0] == data['CBSA']:
                        data['name'] = row[3]
                        data['population'] = {
                        "2014": row[11],
                        "2015": row[12]
                        }

    return jsonify(data)

@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect('/peer')
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect('/peer')
        if file:
            filename = secure_filename(file.filename)
            file.save('cbsa_to_msa.csv')
            flash('File Updated!!!')
    return "File updated!!!"
