require('dotenv').config();

const server = require('./api/server');

console.log(process.env.DB_ENV);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
   console.log(`Listening on port ${PORT}...`);
});