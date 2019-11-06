# Zebra Web USB Demo

This is a POC of Zebra ZPL printing via the [Web USB API](https://wicg.github.io/webusb/).

The cool thing is that you can print ZPL from your browser without user interaction with the browser's
default print dialog.

## How to run this demo

The Web USB API requires HTTPS, so you'll need to serve the `index.html` file over HTTPS.

So first you need a `cert` and `key` for you to spawn a server.

I recommend the [mkcert](https://github.com/FiloSottile/mkcert) tool to generate these, as it will automatically install the local CA in your system.

With the certificate and key in hands, you just need to start an HTTPS server.

One quick way to do that if you have [Python](https://www.python.org/) installed is by running the handy `server.py` script.

Considering you have your certificate and key as `cert.pem` and `key.pem` respectively in your working directory,
you can do as following:

```bash
python server.py
```

## User guide

To use this demo you'll need:

- A printer that understands ZPL/EPL connected over USB;
- Chrome, Opera, Edge 76+, or any browser that supports the Web USB API spec;
- ZPL/EPL payload to send, check the [ZPL docs](https://www.zebra.com/content/dam/zebra/manuals/printers/common/programming/zpl-zbi2-pm-en.pdf) for additional info.

To access the local demo, start your server, and head to `https://localhost:4443` if you started the server using the `server.py` script. Or just go to your server and port if you started the server yourself using another method.

When running the demo for the first time the browser will ask you to specify the printer to give
access permission. You'll need to select your printer and accept it for this demo to work.

## License

[MIT](LICENSE)
