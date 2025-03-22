import express, { urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { mainRouter } from './routers/main';
import 'dotenv/config';
import { errorHandler, requestErrorHandler } from './routers/errors';

const server = express();
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true}));
server.use(express.json());

server.use("/", mainRouter);
server.use(requestErrorHandler);
server.use(errorHandler);

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})