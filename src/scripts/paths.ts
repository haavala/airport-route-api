import { Airport } from '../route/airport'
import fs = require('fs')

const haversine = require('haversine-distance')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const writeStream = promisify(fs.createWriteStream)

const readAirports = async () =>  {
    let airports: Airport[] = []

    const content = await readFile('./import/airports.dat', 'utf8')

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
const CHECK_MAX_DISTANCE: boolean = false

const getFileName = () => {
    const getName = (name: string) => {
        let timestamp = new Date().getTime()
        return `${name}_${timestamp}.csv`
    }
    return CHECK_MAX_DISTANCE ? getName('distances') : getName('distances_all')
}

const isDistanceWithin = (distance: number) => {
    return (distance / 1000) <= MAX_DISTANCE_WITHIN_IN_KM
}

const constructLine = (source: string, destination: string, distance_in_m: number) => {
    return (source + ',' + destination + ',' + distance_in_m) + '\n'
}

let airports = readAirports().then((data) => {  
    let fileName = getFileName()
    for(let i = 0; i< data.length; i++) {
        let content = ''
        for(let j = i + 1; j < data.length; j++) {
            let distance_in_m = haversine(data[i], data[j])
            if (data[j].iata == 'TAY' && data[i].iata == 'TLL') {
                console.log(distance_in_m)
                console.log(isDistanceWithin(distance_in_m))
            }          
            if (CHECK_MAX_DISTANCE && isDistanceWithin(distance_in_m)) {
                content += constructLine(data[i].iata, data[j].iata, distance_in_m)
            } 
            if (!CHECK_MAX_DISTANCE){
                content += constructLine(data[i].iata, data[j].iata, distance_in_m)
            }
        }    

        fs.appendFileSync('./import/' + fileName, content)
    }

})

