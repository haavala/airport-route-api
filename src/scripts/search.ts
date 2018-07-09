import { RouteFinder } from "../route/route-finder";

new RouteFinder().find('TLL', 'BCN', 3)
    .then((result) => {
        console.log(JSON.stringify(result, null, 2))
    })
    .catch((err) => {
        console.error(err)
    })