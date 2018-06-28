import { Airport } from '../route/airport';
import fs = require('fs')

const haversine = require('haversine-distance')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const readAirports = async () =>  {
    let airports: Airport[] = []

    const content = await readFile('./data/airports.dat', 'utf8')

    content.split('\n').forEach((line: String) => {
        let parts = line.split(',')

        if (parts.length > 7 && parts[4].length == 5) {
            airports.push(
                {
                    iata: parts[4].replace(/\"/g, ""),
                    latitude: parseFloat(parts[6]),
                    longitude: parseFloat(parts[7])
                }
            )
         }
    
    })

    return airports
}

const MAX_DISTANCE_WITHIN_IN_KM: number = 175

const isDistanceWithin = (distance: number) => {
    return (distance / 1000) <= MAX_DISTANCE_WITHIN_IN_KM
}

let airports = readAirports().then((data) => {
    let content = ''

    for(let i = 0; i< data.length; i++) {
        
        for(let j = i + 1; j < data.length; j++) {
            let distance_in_m = haversine(data[i], data[j])
            if (data[j].iata == 'TAY' && data[i].iata == 'TLL') {
                console.log(distance_in_m)
                console.log(isDistanceWithin(distance_in_m))
            }
            if (isDistanceWithin(distance_in_m)) {
                content += (data[i].iata + ',' + data[j].iata + ',' + distance_in_m) + '\n'
            }
        }      
    }

    writeFile('./import/distances.csv', content, (err: any) => console.log(err))
})

