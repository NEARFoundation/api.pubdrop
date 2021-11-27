import _ from 'dotenv/config.js';
import express from 'express';
import sendgrid from '@sendgrid/mail';
import cors from 'cors';
import mongoose from 'mongoose';
import { getNear } from './helpers/getNear.js';
import { signUp } from './services/signUp/signUp.js';
import { confirmEmail } from './services/confirmEmail/confirmEmail.js';

await mongoose.connect(process.env.MONGO);
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const near = await getNear();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.near = near;
  next();
});

app.post('/signup', signUp);
app.post('/confirm-email', confirmEmail);

app.listen(process.env.PORT);
