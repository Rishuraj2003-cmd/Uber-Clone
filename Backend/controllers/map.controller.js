const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

// Get coordinates from address
module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        // Assuming `getAddressCoordinate` is implemented in the mapService
        const coordinates = await mapService.getAddressCoordinate(address);

        if (!coordinates) {
            return res.status(404).json({ message: 'Coordinates not found' });
        }

        res.status(200).json(coordinates);

    } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get distance and time between origin and destination
module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        // Assuming `getDistanceTime` is implemented in the mapService
        const distanceTime = await mapService.getDistanceTime(origin, destination);

        if (!distanceTime) {
            return res.status(404).json({ message: 'Distance and time not found' });
        }

        res.status(200).json(distanceTime);

    } catch (error) {
        console.error('Error calculating distance/time:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get autocomplete suggestions for a given input
module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    try {
        // Assuming `getAutoCompleteSuggestions` is implemented in the mapService
        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        if (!suggestions || suggestions.length === 0) {
            return res.status(404).json({ message: 'No suggestions found' });
        }

        res.status(200).json(suggestions);

    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
