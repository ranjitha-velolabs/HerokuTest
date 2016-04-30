'use strict';

const path = require('path');

module.exports = {
    appName: 'skyfleet',
    port: process.env.SKYFLEET_PORT || '19754',
    //mapBoxToken: process.env['MAPBOX_TOKEN'] || 'pk.eyJ1IjoiYXJhdmluZDc0MSIsImEiOiJjaWtkbnFlaWUwMDFzdWtseXZtNWNtNjB1In0.xbZ6Ok2qvsL3BNwS1eAEwg'
    mapBoxToken: process.env['MAPBOX_TOKEN'] || 'pk.eyJ1IjoiYWNncmVlbjEyMjYiLCJhIjoiOGNiOGJlZTUyZDI1NDkzODhlNmJhMGVmZDU4OTZiMDcifQ.-MtqKH9lyJ2J1JDsxdmDRQ',
    numberOfPoints: 30000,
    filePaths: {
        points: path.join(__dirname, 'files/points.json')
    }
};
