import app from './App';

import serverConfig from '../app-config.json';

let port = serverConfig.port ? serverConfig.port : 8080;
app.listen(port, () => {
    console.log(`Server starts on Port: ${port}`);
});