import express from 'express';
import cors from 'cors';
import regionsRouter from './routes/regions.js';
import speciesRouter from './routes/species.js';
import climateRouter from './routes/climate.js';
import alertsRouter from './routes/alerts.js';
import sightingsRouter from './routes/sightings.js';
import weatherRouter from './routes/weather.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/regions', regionsRouter);
app.use('/api/species', speciesRouter);
app.use('/api/climate', climateRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/sightings', sightingsRouter);
app.use('/api/weather', weatherRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'Pune BioWatch API',
    region: 'Pune District, Maharashtra, India',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`[Pune BioWatch Server] Running REST API on http://localhost:${PORT}`);
});
