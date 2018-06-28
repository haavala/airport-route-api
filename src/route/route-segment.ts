import { Airport } from './airport';
import { SegmentType } from "./segment-type";

export default interface RouteSegment {
    type: SegmentType
    distance?: number
    origin: Airport
    destination: Airport
}