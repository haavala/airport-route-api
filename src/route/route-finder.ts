import { query } from '../data/data-source'
import { mapAll } from '../data/data-mapper';
import { RouteResponse } from './route-response';

export class RouteFinder {
    find(origin: String, destination: String) : Promise<RouteResponse> {
        return query(origin, destination)
            .then((data) => {
                return mapAll(data.records)
            })
            .then((routes) =>  {
                return routes.sort((r1, r2) => { return r1.totalDistance - r2.totalDistance })
            })
            .then((segments) => {
                return new RouteResponse(segments)
            })
            .catch((err) => {
                throw new Error(err);
            })
    }
}