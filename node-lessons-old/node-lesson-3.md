*General Questions/ Issues*


"For every HTTP request received by the server, the request callback function will be invoked with new req and res objects. Prior to the callback being triggered, Node will parse the request up through the HTTP headers and provide them as part of the req object. But Node doesn’t start parsing the body of the request until the callback has been fired. This is different from some server-side frameworks, like PHP, where both the headers and the body of the request are parsed before your application logic runs. Node provides this lower-level interface so you can handle the body data as it’s being parsed, if desired." (njia, 73)

### streams
- req and res objects are streams

### Mime Types
- We need mime types to be able to send and receive files with http
- Mime types live in http headers