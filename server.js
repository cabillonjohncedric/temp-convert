const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for temperature conversion
app.get('/convert', (req, res) => {
    const { temp, unit } = req.query;
    const temperature = parseFloat(temp);

    if (isNaN(temperature) || (unit !== 'C' && unit !== 'F')) {
        return res.status(400).json({ error: 'Invalid input. Use ?temp=number&unit=C or F' });
    }

    let convertedTemp, convertedUnit;
    if (unit === 'C') {
        convertedTemp = (temperature * 9/5) + 32;
        convertedUnit = 'F';
    } else {
        convertedTemp = (temperature - 32) * 5/9;
        convertedUnit = 'C';
    }

    res.json({ original: `${temperature}°${unit}`, converted: `${convertedTemp.toFixed(2)}°${convertedUnit}` });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
