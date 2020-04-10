const http = require('http');
const logger = require('morgan');
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.resolve(__dirname, '../dist/client')
const oneHour = 3600000;
const staticFiles = express.static(publicPath,{ maxAge: oneHour });
const port = process.argv.slice(3)[0] || 3000;
app.use(logger('dev'));
app.use('/', staticFiles);

app.use((req:any, res:any) => {
  res.status(404);
  res.send('File not found');
})

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`)
});


