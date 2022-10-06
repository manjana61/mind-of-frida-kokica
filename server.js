let express = require('express')
let serveStatic = require('serve-static')
let path = require('path')

let app = express()

app.use('/',serveStatic(path.join(__dirname,'/dist')))

let port = process.env.PORT || 8080

app.listen(port)

/* OVO SAM DODAO I U PACKAGE JSON-u U SCRIPTS OBRISATI "start" liniju */