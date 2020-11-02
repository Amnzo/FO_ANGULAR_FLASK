from flask import Flask, jsonify,request
from datetime import datetime
from flask_cors import CORS, cross_origin

from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
   get_jwt_identity
)



import  pymysql.cursors


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)






@app.route('/login', methods=['POST'])
def login():
    msg = '' 
    print(request.authorization)
    print(request.get_json()['login'])


    connection = pymysql.connect(host='79.137.40.57',
                             user='traceo',
                             password='traceo12102009',
                             db='arval',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            login= request.get_json()['login']
            pwd=request.get_json()['pwd']
            cursor.execute('SELECT * FROM users WHERE login = % s AND password = % s', (login, pwd, )) 
            account = cursor.fetchone()
            if account:
                access_token = create_access_token(identity=login)
                # return jsonify(account,access_token)
                msg = 'Logged in successfully !'
                account["api_token"] = access_token
                return jsonify(account)
            else:
                msg = 'Incorrect username / password !'
                return jsonify(account)
    finally:
        connection.close()


@app.route('/entreprise', methods=['GET'])
@jwt_required
def entreprise():
    msg = '' 

    connection = pymysql.connect(host='79.137.40.57',
                             user='traceo',
                             password='traceo12102009',
                             db='arval',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT nom_client FROM clients where code_inscription='"+request.args.get('code')+"'")
            account = cursor.fetchone()
            if account:
                msg = 'Logged in successfully !'
            else:
                msg = 'Incorrect username / password !'



            return jsonify(account)
    finally:
        connection.close()






@app.route('/resa', methods=['GET'])
@jwt_required

def reservations():
    msg = '' 
    result = []


    connection = pymysql.connect(host='79.137.40.57',
                             user='traceo',
                             password='traceo12102009',
                             db='arval',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            cursor.execute("select id_reservation,nom_modele,nom_vehicule,nom_parking,date_depart_prevue,date_retour_prevue from  reservations join vehicules using(id_vehicule) join modeles using(id_modele) " + \
                " join parkings using(id_parking) where id_utilisateur="+request.args.get('user')+" and (id_etat_reservation='0' or id_etat_reservation='1')  ")
            reservations = cursor.fetchall()
            result.append(reservations)
            cursor.execute("select id_reservation,nom_modele,nom_vehicule,nom_parking,date_depart_prevue,date_retour_prevue from  reservations join vehicules using(id_vehicule) join modeles using(id_modele) " + \
                " join parkings using(id_parking) where id_utilisateur="+request.args.get('user')+" and  id_etat_reservation=3")
            reservations2 = cursor.fetchall()
            result.append(reservations2)
            cursor.execute("select id_reservation,nom_modele,nom_vehicule,nom_parking,date_depart_prevue,date_retour_prevue from  reservations join vehicules using(id_vehicule) join modeles using(id_modele) " + \
                " join parkings using(id_parking) where id_utilisateur="+request.args.get('user')+"  and id_etat_reservation in(4,6,7)")
            reservations3 = cursor.fetchall()
            result.append(reservations3)
            if reservations:
                msg = 'Logged in successfully !'
            else:
                msg = 'Incorrect username / password !'



            return jsonify(result)
    finally:
        connection.close()

@app.route('/users', methods=['GET'])
@jwt_required
def users():
    msg = '' 

    connection = pymysql.connect(host='79.137.40.57',
                             user='traceo',
                             password='traceo12102009',
                             db='arval',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            cursor.execute("select id_utilisateur,firstName,lastName,nom_client from  users join clients using(id_client) order by id_utilisateur desc limit 1000")
            users = cursor.fetchall()
            if users:
                msg = 'Logged in successfully !'
            else:
                msg = 'Incorrect username / password !'



            return jsonify(users)
    finally:
        connection.close()

@app.route('/resabyid', methods=['GET'])
@jwt_required
def resabyid():
    msg = '' 

    connection = pymysql.connect(host='79.137.40.57',
                             user='traceo',
                             password='traceo12102009',
                             db='arval',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            cursor.execute("select id_reservation,nom_modele,nom_vehicule,nom_parking,date_depart_prevue,date_retour_prevue,login," + \
                " year(date_depart_prevue)as year_d,month(date_depart_prevue) as month_d,day(date_depart_prevue) as day_d,"+ \
                " year(date_retour_prevue)as year_f,month(date_retour_prevue) as month_f,day(date_retour_prevue) as day_f " + \
             " from  reservations join vehicules using(id_vehicule) join modeles using(id_modele) " + \
                " join parkings using(id_parking) where id_reservation="+request.args.get('id_reservation'))
            one_reservation = cursor.fetchone()
            if one_reservation:
                msg = 'Logged in successfully !'
            else:
                msg = 'Incorrect username / password !'



            return jsonify(one_reservation)
    finally:
        connection.close()






@app.route('/formulepro', methods=['GET'])
@jwt_required
def formulepro():
    msg = '' 

    connection = pymysql.connect(host='79.137.40.57',
                             user='traceo',
                             password='traceo12102009',
                             db='arval',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            print("fetching")
            req="amnzo"
            print(req)
            cursor.execute("SELECT id_contrat_pro,id_formule,nom_formule FROM contratsformules join contrats using(id_contrat) join users " + \
            " on contrats.id_contrat=users.id_contrat_pro where id_utilisateur="+request.args.get('user'))
            formules = cursor.fetchall()
            if formules:
                msg = 'Logged in successfully !'
            else:
                msg = 'Incorrect username / password !'



            return jsonify(formules)
    finally:
        connection.close()



@app.route('/parkings', methods=['GET'])
@jwt_required
def parkings():
    msg = '' 

    connection = pymysql.connect(host='79.137.40.57',
                             user='traceo',
                             password='traceo12102009',
                             db='arval',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT id_parking,nom_parking FROM formulesparkings join parkings using(id_parking) " + \
            " where id_formule="+request.args.get('formule'))
            parkings = cursor.fetchall()
            if parkings:
                msg = 'Logged in successfully !'
            else:
                msg = 'Incorrect username / password !'



            return jsonify(parkings)
    finally:
        connection.close()



@app.route('/vehicules', methods=['GET'])
@jwt_required
def vehicules():
    msg = '' 

    connection = pymysql.connect(host='79.137.40.57',
                             user='traceo',
                             password='traceo12102009',
                             db='arval',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT nom_vehicule,id_vehicule,id_formule FROM formulesvehicules join vehicules using(id_vehicule) " + \
            " where id_formule="+request.args.get('formule'))
            parkings = cursor.fetchall()
            if parkings:
                msg = 'Logged in successfully !'
            else:
                msg = 'Incorrect username / password !'



            return jsonify(parkings)
    finally:
        connection.close()


if __name__ == '__main__':
    app.run(port=5000,debug=True)