import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/weather.json');

const router = express.Router();

function getWeatherData() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

function saveWeatherData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET /api/weather - Returns full weather payload (matches query: place_id, language, unit)
router.get('/', (req, res) => {
  try {
    const weather = getWeatherData();
    const { place_id, language, unit } = req.query;

    res.json({
      success: true,
      query: {
        place_id: place_id || weather.request?.place_id || 'pune',
        language: language || weather.request?.language || 'en',
        unit: unit || weather.request?.unit || 'metric',
      },
      ...weather,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch weather data' });
  }
});

// GET /api/weather/current - Returns only current live observation
router.get('/current', (req, res) => {
  try {
    const weather = getWeatherData();
    res.json({
      success: true,
      place_id: 'pune',
      timezone: weather.timezone,
      units: weather.units,
      current: weather.current,
      todaySummary: weather.daily?.summary,
      astro: weather.daily?.astro,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch current weather' });
  }
});

// POST /api/weather - Update or sync live weather payload
router.post('/', (req, res) => {
  try {
    const newPayload = req.body;
    if (!newPayload || !newPayload.current) {
      return res.status(400).json({ success: false, error: 'Invalid weather payload structure' });
    }

    saveWeatherData(newPayload);
    res.json({ success: true, message: 'Weather telemetry updated successfully', data: newPayload });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save weather data' });
  }
});

export default router;
