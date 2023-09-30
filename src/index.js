//Imports
const express = require("express");
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const {PORT} = require('./constants');
const routes = require('./router');

//Local variables
const app = express();

//cConfigs
expressConfig(app);
handlebarsConfig(app);

//Roiting
 app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));