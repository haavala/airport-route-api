import neo4j = require('neo4j-driver')

const host = process.env.NEO4J_HOST || 'neo4j'

const driver = neo4j.v1.driver(`bolt://${host}`)
//const driver = neo4j.v1.driver("bolt://localhost", neo4j.v1.auth.basic("neo4j", "test"))
const session = driver.session()

export function query(origin: String, destination: String) {
    return session.run(
        `MATCH p=((dptAirp:Airport {iata: '${origin}' })-[r:DEPARTS|:ARRIVES|:DISTANCE_WITHIN*1..4]-(arrAirp:Airport {iata: '${destination}' }))
        WHERE all(rel in r WHERE NOT EXISTS (rel.distance) OR rel.distance < 175000)
        RETURN p`, {})
}