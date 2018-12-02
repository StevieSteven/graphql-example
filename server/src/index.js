import app from './App';

app.listen({port: 9090}).then(({url}) => {
    console.log(`Server url: ${JSON.stringify(url, null, 2)}`);
});