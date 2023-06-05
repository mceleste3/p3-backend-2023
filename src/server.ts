import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import petSitterRouter from './petsitter.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/petsitter", petSitterRouter)


const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
    console.log(`Dog Sitter API listening on: ${SERVER_PORT}`);
});

