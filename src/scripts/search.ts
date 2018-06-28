import { RouteFinder } from "../route/route-finder";

new RouteFinder().find('TLL', 'TAY')
    .then((result) => {
        console.log(JSON.stringify(result, null, 2))
    })
    .catch((err) => {
        console.error(err)
    })