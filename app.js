const express = require('express');
const PORT = process.env.PORT || 5433
const app = express();
const bodyParser = require('body-parser');

const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')

db.sequelize.sync();
// db.sequelize.sync().then(result=>{
//     console.log(result);
// });
app.use(bodyParser.json());

app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))

app.use('/api/game', game);
app.listen(PORT,function() {
    console.log("App is listening on 4000");
    console.log("PORT: ", PORT);
})
