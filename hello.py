from flask import Flask, request, jsonify
import csv
app = Flask(__name__)

@app.route("/")
def index():
    return peer()

@app.route("/peer", methods=['GET'])
def peer():
    data = {
     "error": 'Please supply a zipcode using the parameter zip',
     "CBSA": "",
     "2014": "",
     "2015": "",
     "name": "",
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
