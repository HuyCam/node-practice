const axios = require('axios');
const comments = require('./comments');

const WEATHER_API = 'b92ce92b69643daa1acda2b01f98c2a8';
const API = 'AIzaSyD6Et1_AGfi3hzsK4603YgfweXM4zR3418';

const getLoc = (address) => {
    const encodeddAddress = encodeURIComponent(address);
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${API}&address=${encodeddAddress}`)
        .then((res) => {
            if (res.data.status === 'ZERO_RESULTS') {
                console.log('Unable to find that address');
            } else {
                const formatted_address = res.data.results[0].formatted_address;
                const location = res.data.results[0].geometry.location;
                const lat = location.lat;
                const lng = location.lng;
                console.log(formatted_address);
                comments.addComment('Weather', formatted_address);
                return axios.get(`https://api.darksky.net/forecast/b92ce92b69643daa1acda2b01f98c2a8/${lat},${lng}`);
            }
        })
        .then((res) => {
            console.log(res.data.currently);   
        })
        .catch((err) => {
            if (err) {
                console.log('Unable to connect to server');
            }
        });
}

module.exports = {
    getLoc
}