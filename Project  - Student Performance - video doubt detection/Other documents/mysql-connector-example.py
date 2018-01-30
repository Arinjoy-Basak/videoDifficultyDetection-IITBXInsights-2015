import mysql.connector

#cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='IITBxDataAnalytics')
#cnx.close()

cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='6THSEMESTER')

cursor = cnx.cursor()
query = ( "INSERT INTO DEPARTMENT VALUES (%s, %s)" )
data = ( "SECUR", "SECURITY" )
cursor.execute(query, data)
cnx.commit();
cursor.close();
cnx.close()
