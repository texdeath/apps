const express = require('express');
const app = express();

import * as Heros from './routes/heros';

app.use('/heros',Heros);

app.listen(
    3000,
    () => {
        console.log('app port 3000');
});

export default app;