import express from 'express'
import bodyParser from 'body-parser'
import Routes from './routes/router.js';
import cors from  'cors'
import ConnectDB from './database/connectDB.js'

const app = express()
var PORT = process.env.PORT;

app.use(cors());

ConnectDB();

app.use("/",Routes);


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });