/**
 * Service for getting all the current tracks
 */
var app = angular.module('myApp');
app.service('trackService', function () {

    this.getData = function () {
        return data;
    };


    var data = [
        {
            "id": 1,
            "name": "Circuit des 24 heures du Mans"
        },
        {
            "id": 2,
            "name": "Nurburgring"
        },
        {
            "id": 3,
            "name": "Daytona"
        },
        {
            "id": 4,
            "name": "Indianapolis Motor Speedway"
        },
        {
            "id": 5,
            "name": "Autodrome Enzo e Dino Ferrari"
        },
        {
            "id": 6,
            "name": "Mount Panorama Circuit"
        },
        {
            "id": 7,
            "name": "Eldora Speedway"
        },
        {
            "id": 8,
            "name": "Charlotte Motor Speedway"
        },
        {
            "id": 9,
            "name": "Williams Grove Speedway"
        },
        {
            "id": 10,
            "name": "Circuit of America"
        },
        {
            "id": 11,
            "name": "Bristol Motor Speedway"
        },
        {
            "id": 12,
            "name": "Southern Motorsports Park"
        },
        {
            "id": 13,
            "name": "Circuit Spa-francorchamps"
        },
        {
            "id": 14,
            "name": "Talladega Superspeedway"
        },
        {
            "id": 15,
            "name": "Watkins Glen International"
        },
        {
            "id": 16,
            "name": "Road America"
        },
        {
            "id": 17,
            "name": "Gateway Motorsports Park"
        },
        {
            "id": 18,
            "name": "Autodromo Nationale Monza"
        },
        {
            "id": 19,
            "name": "Nurburgring GP"
        },
        {
            "id": 20,
            "name": "Interlagos"
        },
        {
            "id": 21,
            "name": "Michigan International Speedway"
        },
        {
            "id": 22,
            "name": "Circuit Gilles Villeneuve"
        },
        {
            "id": 23,
            "name": "Brands Hatch"
        },
        {
            "id": 24,
            "name": "Silverstone Circuit"
        },
        {
            "id": 25,
            "name": "South Boston Speedway"
        },
        {
            "id": 26,
            "name": "Pocono Raceway"
        },
        {
            "id": 27,
            "name": "Kansas Speedway"
        },
        {
            "id": 28,
            "name": "Mid-ohio sports car Course"
        },
        {
            "id": 29,
            "name": "Phillip Island Circuit"
        },
        {
            "id": 30,
            "name": "Suzukua Circuit"
        },
        {
            "id": 31,
            "name": "Circuit park Zandvoort"
        },
        {
            "id": 32,
            "name": "Canadian Tire Motorsport Park"
        },
        {
            "id": 33,
            "name": "Dover International Speedway"
        },
        {
            "id": 34,
            "name": "Sebring International Speedway"
        },
        {
            "id": 35,
            "name": "Twin Ring Motegi"
        },
        {
            "id": 36,
            "name": "Lucas Oil Raceway Indianapolis"
        },
        {
            "id": 37,
            "name": "Darlington Raceway"
        },
        {
            "id": 38,
            "name": "Iowa Speedway"
        },
        {
            "id": 39,
            "name": "Auto Club Speedway"
        },
        {
            "id": 40,
            "name": "Kentucky Speedway"
        },
        {
            "id": 41,
            "name": "Oran Park"
        },
        {
            "id": 42,
            "name": "New Smyrna Speedway"
        },
        {
            "id": 43,
            "name": "Donington park Circuit"
        },
        {
            "id": 44,
            "name": "Thompson International Speedway"
        },
        {
            "id": 45,
            "name": "Phoenix International Raceway"
        },
        {
            "id": 46,
            "name": "Texas Motor Speedway"
        },
        {
            "id": 47,
            "name": "Oulton Park Circuit"
        },
        {
            "id": 48,
            "name": "Mazda Raceway Laguna Seca"
        },
        {
            "id": 49,
            "name": "Rokcingham Speedway"
        },
        {
            "id": 50,
            "name": "Okayama International Circuit"
        },
        {
            "id": 51,
            "name": "Atlanta Motor Speedway"
        },
        {
            "id": 52,
            "name": "The Milwaukee Mile"
        },
        {
            "id": 53,
            "name": "Richmond International Raceway"
        },
        {
            "id": 54,
            "name": "Las Vegas Motor Speedway"
        },
        {
            "id": 55,
            "name": "Martinsville Speedway"
        },
        {
            "id": 56,
            "name": "New Hampshire Motor Speedway"
        },
        {
            "id": 57,
            "name": "Concord Speedway"
        },
        {
            "id": 58,
            "name": "Chicagoland Speedway"
        },
        {
            "id": 59,
            "name": "Stafford Motor Speedway"
        },
        {
            "id": 60,
            "name": "Homestead Miami Speedway"
        },
        {
            "id": 61,
            "name": "Oxford Plains Speedway"
        },
        {
            "id": 62,
            "name": "Lanier International Speedway"
        },
        {
            "id": 63,
            "name": "USA International Speedway"
        },
        {
            "id": 64,
            "name": "Irwindale Speedway"
        },
        {
            "id": 65,
            "name": "Sonoma Raceway"
        },
        {
            "id": 66,
            "name": "Road Atlanta"
        },
        {
            "id": 67,
            "name": "Lime Rock Park"
        },
        {
            "id": 68,
            "name": "Virginia International Raceway"
        },
        {
            "id": 69,
            "name": "Summit Point Motorsports Park"
        },
        {
            "id": 70,
            "name": "Barber Motorsports Park"
        },
        {
            "id": 71,
            "name": "Langley Speedway"
        },
        {
            "id": 72,
            "name": "Circuit Zolder"
        },
        {
            "id": 73,
            "name": "Five Flags Speedway"
        },
        {
            "id": 74,
            "name": "Phoenix International Raceway circa 2008"
        },
        {
            "id": 75,
            "name": "Daytona circa 2007"
        },
        {
            "id": 76,
            "name": "Centripetal Circuit"
        },
        {
            "id": 77,
            "name": "Long Beach"
        },
        {
            "id": 78,
            "name": "New Jersey Motorsports Park"
        }
    ];

});