import express from 'express';
import sendgrid from '@sendgrid/mail';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { signUp } from './services/signUp/signUp.js';
import { confirmEmail } from './services/confirmEmail/confirmEmail.js';

dotenv.config();
await mongoose.connect(process.env.MONGO);
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/signup', signUp);
app.post('/confirm-email', confirmEmail);

app.listen(process.env.PORT);
