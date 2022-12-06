import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import login from './routes/login';
import users from './routes/users';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Api routes
app.use('/api', login);
app.use('/api', users);

app.listen(port, () => console.log(`Server is listening ${port}`));
