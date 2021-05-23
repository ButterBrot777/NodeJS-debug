const express = require('express');
const PORT = process.env.PORT || 5433
const app = express();
const bodyParser = require('body-parser');

const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const session = require('./middleware/validate-session');

app.use(bodyParser.json());

app.use('/api/auth', user);
app.use(session);
app.use('/api/game', game);

app.listen(PORT,function() {
    console.log(`App is listening on ${PORT}`);
})
