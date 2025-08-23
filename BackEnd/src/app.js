import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
// import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Allow requests from frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));

app.use(express.json());
app.use('/api', routes);
// app.use(errorHandler); // centralized error handler
app.get('/', (req, res) => {
    res.send('API is working! 🎉');
  });

export default app;
