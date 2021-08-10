const { urlencoded } = require("express");
const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;
const api = require("./routes");

require('dotenv').config();

app.use(urlencoded({extended: true}));
app.use(express.json());
app.use('/api/v1', api);

db.sequelize.sync().then(() => {
    app.listen(PORT, ()=>{
        console.log(`listening on port : http://localhost:${PORT}`);
    });
});