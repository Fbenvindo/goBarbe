import express, { response } from 'express';

const app = express();

app.listen(3334, () => {
    console.log('Server started on port 3334');
});