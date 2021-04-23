
require('dotenv').config();

const app = require('./app');

app.listen(app.get('port'),()=>{
    console.log(`Server on PORT ${app.get('port')}`);
});