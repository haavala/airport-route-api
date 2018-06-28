MATCH p=((dptAirp:Airport {iata: 'TLL' })-[r:DEPARTS|:ARRIVES|:DISTANCE_WITHIN*1..4]-(arrAirp:Airport {iata: 'TAY' }))
WHERE all(rel in r WHERE NOT EXISTS (rel.distance) OR rel.distance < 165 * 1000)
RETURN p

MATCH (a:Airport), (b:Airport)
WHERE a.iata = 'TAY' AND b.iata <> a.iata
CREATE (a)-[r:DISTANCE_WITHIN { distance: distance(point({ longitude: toFloat(a.longitude), latitude: toFloat(a.latitute) }), point({ longitude: toFloat(b.longitude), latitude: toFloat(b.latitute) })) }]->(b)
return r

USING PERIODIC COMMIT
LOAD CSV 
FROM 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat'
AS line FIELDTERMINATOR ','
WITH line
CREATE (route:Route { description: line[2] + '-' + line[4] })
WITH route, line
MATCH (departure:Airport)
MATCH (arrival:Airport)
WHERE departure.iata = line[2] AND arrival.iata = line[4]
CREATE 
(route)-[:DEPARTS]->(departure),
(route)-[:ARRIVES]->(arrival)

MATCH (a:Airport), (b:Airport)
WHERE a.iata = 'TAY' AND b.iata <> a.iata
CREATE (a)-[r:DISTANCE_WITHIN { distance: distance(point({ longitude: toFloat(a.longitude), latitude: toFloat(a.latitute) }), point({ longitude: toFloat(b.longitude), latitude: toFloat(b.latitute) })) }]->(b)
return r

MATCH p=((dptAirp:Airport {iata: 'TLL' })-[r:DEPARTS|:ARRIVES*1..4]-(arrAirp:Airport {iata: 'TAY' }))
RETURN p

MATCH (a:Airport), (b:Airport)
WHERE b.iata = 'GKA'
CREATE (a)-[r:DISTANCE_FROM_GKA { distance: distance(point({ longitude: toFloat(a.longitude), latitude: toFloat(a.latitute) }), point({ longitude: toFloat(b.longitude), latitude: toFloat(b.latitute) })) }]->(b)
return r

MATCH (a:Airport),(b:Airport)
WITH a, b
SKIP 50000
LIMIT 100000
CREATE (a)-[r:DISTANCE_WITHIN { distance: distance(point({ longitude: toFloat(a.longitude), latitude: toFloat(a.latitute) }), point({ longitude: toFloat(b.longitude), latitude: toFloat(b.latitute) })) }]->(b)
return r

MATCH (origin:Airport)<-[departs:DEPARTS]-(r:Route)-[arrives:ARRIVES]->(dest:Airport)
WHERE origin.iata = 'NIB'
RETURN *

MATCH p=((dptAirp:Airport {iata: 'HEL' })) RETURN p

MATCH p=((dptAirp:Airport {iata: 'TAY' })) RETURN p

MATCH p=(r:Route) RETURN count(*)

MATCH (a:Airport),(b:Airport)
WHERE a.iata = 'HEL' AND b.iata = 'TLL'
CREATE (a)-[r:DISTANCE_WITHIN { distance: distance(point({ longitude: toFloat(a.longitude), latitude: toFloat(a.latitute) }), point({ longitude: toFloat(b.longitude), latitude: toFloat(b.latitute) })) }]->(b)
RETURN r.distance

MATCH (a:Airport),(b:Airport)
WITH a
SKIP 0
LIMIT 50000
CREATE (a)-[r:DISTANCE_WITHIN { distance: distance(point({ longitude: toFloat(a.longitude), latitude: toFloat(a.latitute) }), point({ longitude: toFloat(b.longitude), latitude: toFloat(b.latitute) })) }]->(b)
return r.distance

MATCH p=((dptAirp:Airport {iata: 'TLL' })-[:DEPARTS|:ARRIVES*0..4]-(arrAirp:Airport {iata: 'TAY' }))
RETURN p

CREATE INDEX ON :DISTANCE_WITHIN(distance)

MATCH p=shortestPath((dptAirp:Airport {iata: 'DME' })-[*..4]-(arrAirp:Airport {iata: 'KZN' }))
RETURN p

MATCH p=((dptAirp:Airport {iata: 'DME' })-[*..4]-(arrAirp:Airport {iata: 'KZN' }))
RETURN p

MATCH p=((dptAirp:Airport {iata: 'DME' })-[:DEPARTS|:ARRIVES*0..4]-(arrAirp:Airport {iata: 'TAY' }))
RETURN p

MATCH (dptAirp:Airport)<-[dptAt:DEPARTS]-(route:Route)-[arrAt:ARRIVES]->(arrAirp:Airport)
WHERE dptAirp.iata = 'GKA' 
RETURN DISTINCT route

MATCH p=()-[r:DISTANCE_WITHIN]->() 
WHERE r.distance < 100
RETURN p LIMIT 25

MATCH p=((dptAirp:Airport {iata: 'DME' })-[:FLIGHT_TO*1..1]-(arrAirp:Airport {iata: 'GKA' }))
RETURN p

MATCH p=((dptAirp:Airport {iata: 'DME' })-[:FLIGHT_TO*1..3]-(arrAirp:Airport {iata: 'GKA' }))
RETURN p

MATCH p=()-[r:DISTANCE_WITHIN]->() RETURN count(*)

MATCH (a:Airport),(b:Airport)
WITH a, b
SKIP 50000
LIMIT 100000
CREATE (a)-[r:DISTANCE_WITHIN { distance: distance(point({ longitude: toFloat(a.longitude), latitude: toFloat(a.latitute) }), point({ longitude: toFloat(b.longitude), latitude: toFloat(b.latitute) })) }]->(b)
return r

MATCH p=((src:Airport{iata = 'GKA' })-[*1..4]-(dest:Airport{iata = 'NIB'}))
WHERE ALL (i in range(0, size(relationships(p))-2) 
RETURN p

MATCH (a:Airport),(b:Airport)
WHERE NOT a = b
MERGE (a)-[:DISTANCE { distance: distance(point({ longitude: toFloat(a.longitude), latitude: toFloat(a.latitute) }), point({ longitude: toFloat(b.longitude), latitude: toFloat(b.latitute) })) }]->(b)
