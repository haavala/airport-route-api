import RouteSegment from './route-segment';

export default class Route {
    totalDistance: number
    segments: RouteSegment[]

    constructor(segments: RouteSegment[]) {
        this.segments = segments
    }

    public withTotalDistance() {
        let route: Route = new Route(this.segments)
        route.totalDistance = route.segments.reduce(
            (acc: number, r: RouteSegment) => {
                return acc + r.distance
            }, 0)

        return route
    }
}