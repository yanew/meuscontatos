const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('Oi mundao de Deus sim!');
});

app.listen(3000, () => console.log('Server iniciou!'));