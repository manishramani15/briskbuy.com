const express = require('express')
const { Products, Vendors } = require('../db')

const route = express.Router()

function rad2deg(rad) {
    let deg = (rad*180)/Math.PI
    return deg
}

function deg2rad(deg) {
    let rad = (deg*Math.PI)/180
    return rad
}

function distance(lat1,  lon1,  lat2,  lon2,  unit) {
    if ((lat1 ==  lat2) && (lon1 ==  lon2)) {
        return 0;
    }
    else {
        theta =  lon1 -  lon2;
        dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        miles = dist * 60 * 1.1515;
        unit = unit.toUpperCase();
        
        if (unit == "K") {
            return (miles * 1.609344);
        } else if (unit == "N") {
            return (miles * 0.8684);
        } else {
            return miles;
        }
    }
}
route.get(
    '/',
    (req, res) => {
        return Products.findAll({
            include: [Vendors]
        })
        .then((products) => {
            let filteredProducts = products.filter((product) => {
                let vendorLocation = {
                    lat: product.vendor.lat,
                    lon: product.vendor.lon
                }
                let dist = distance(req.query.lat, req.query.lon, vendorLocation.lat, vendorLocation.lon, 'K')
                console.log(dist)
                console.log(req.query.lat)
                console.log(req.query.lon)
                console.log(vendorLocation)
                if(dist < 10){
                    return true
                } else {
                    return false
                }
            })

            res.send(filteredProducts)
        })
    })
    
    module.exports = route