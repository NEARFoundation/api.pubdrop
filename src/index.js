import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { getNear } from './helpers/getNear.js';
import { signUp } from './services/signUp/signUp.js';
import { confirmPhoneNumber } from './services/confirmPhoneNumber/confirmPhoneNumber.js';
import { getKeyStatus } from './services/getKeyStatus/getKeyStatus.js';
import { getCampaignStatus } from './services/getCampaignStatus/getCampaignStatus.js';

await mongoose.connect(process.env.MONGO);
const near = await getNear();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.near = near;
  next();
});

app.post('/signup', signUp);
app.post('/confirm-phone-number', confirmPhoneNumber);
app.get('/key-status', getKeyStatus);
app.get('/campaign-status', getCampaignStatus);

app.listen(process.env.PORT);
