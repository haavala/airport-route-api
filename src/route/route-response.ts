import Route from './route'

export class RouteResponse {
    routes: Route[]

    constructor(routes: Route[]) {
        this.routes = routes
    }
}