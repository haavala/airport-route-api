// Import airport
LOAD CSV
FROM 'file:///airports.dat'
AS line FIELDTERMINATOR ','
CREATE (a:Airport { name: line[1], city: line[2], iata: line[4], latitute: line[6], longitude: line[7] });

// Clean data
MATCH (n:Airport) 
WHERE n.iata = '\\N'
DELETE n;

// Add airport iata uniqueness constraint
CREATE CONSTRAINT ON (airport:Airport) ASSERT airport.code IS UNIQUE;   

// Import routes
USING PERIODIC COMMIT
LOAD CSV 
FROM 'file:///routes.dat'
AS line FIELDTERMINATOR ','
WITH line
CREATE (
	route:Route { 
		description: line[2] + '-' + line[4],
        origin: line[2],
        destination: line[4]
    }
)
WITH route, line
MATCH (departure:Airport)
MATCH (arrival:Airport)
WHERE departure.iata = line[2] AND arrival.iata = line[4]
CREATE 
(departure)-[:DEPARTS]->(route),
(route)-[:ARRIVES]->(arrival);

// Create distance relationships
USING PERIODIC COMMIT
LOAD CSV 
FROM 'file:///distances.csv'
AS line FIELDTERMINATOR ','
WITH line
MATCH (a:Airport)
MATCH (b:Airport)
WHERE a.iata = line[0] AND b.iata = line[1]
CREATE (a)-[:DISTANCE_WITHIN {distance: line[2]}]->(b);

// Create index for distance property
CREATE INDEX ON :DISTANCE_WITHIN(distance);

// Add flight distance property to routes
MATCH (origin:Airport)-[d:DEPARTS]->(:Route)-[:ARRIVES]->(destination:Airport) 
SET d.flight_distance = distance(
    point(
        { 
            longitude: toFloat(origin.longitude), 
            latitude: toFloat(origin.latitute) 
        }
    ), 
    point(
        { 
            longitude: toFloat(destination.longitude), 
            latitude: toFloat(destination.latitute)
        }
    )
);