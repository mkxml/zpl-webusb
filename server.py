import BaseHTTPServer
import SimpleHTTPServer
import ssl

httpd = BaseHTTPServer.HTTPServer(
    ('localhost', 4443), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(
    httpd.socket, certfile='./cert.pem', keyfile='./key.pem', server_side=True)
httpd.serve_forever()
