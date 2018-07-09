import RouteSegment from "../route/route-segment";
import { SegmentType } from "../route/segment-type";
import Route from "../route/route";

const DEPARTURE = 'DEPARTS'
const DISTANCE_WITHIN = 'DISTANCE_WITHIN'

const getOriginType = (node: any) => {
    return node.segments[0].relationship.type
}

const shouldProcess = (type: string) => {
    return type == DEPARTURE || type == DISTANCE_WITHIN
}

const getFlightSegment = (el: any): RouteSegment => {
    return {
        type: SegmentType.FLIGHT,
        origin : el.start.properties.iata,
        destination: el.end.properties.destination,
        distance : el.relationship.properties.flight_distance
    }
}

const getAlternativeSegment = (el: any): RouteSegment => {
    return {
        type: SegmentType.ALTERNATIVE,
        origin : el.start.properties.iata,
        destination: el.end.properties.iata,
        distance: el.relationship.properties.distance
    }
}

export function mapAll(nodes: any[]): Route[] {
    return nodes
            .map((record: any) => new Route(map(record.get(0))))
            .map((route: Route) => route.withTotalDistance())
            .filter((route) => route.segments.length > 0)
}

export function map(node: any): RouteSegment[] {
    let path: RouteSegment[] = []

    let startRelationshipType = getOriginType(node)
    if(shouldProcess(startRelationshipType)) {
        node.segments.forEach((el: any) => {
            if (el.relationship.type == DISTANCE_WITHIN) {
                path.push(getAlternativeSegment(el))
            } 
            if (el.relationship.type == DEPARTURE) {
                if (!el.end.properties.destination) {
                    path = []
                    return;
                }

                path.push(getFlightSegment(el))
            }
        })
    }

    return path
}