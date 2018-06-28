import RouteSegment from "./route-segment";

export default class Route {
    segments: RouteSegment[]

    constructor(segments: RouteSegment[]) {
        this.segments = segments
    }
}