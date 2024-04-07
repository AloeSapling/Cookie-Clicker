import type { building } from "~/types"
import { identifiers } from "./variableMethods"

let id = 0
export const buildingsBase: Array<building> = [
    { id: id++, base_price: [{value:15,identifier:identifiers[0]}], src: "test", name: 'cursor', additional_value: [{value:0.1,identifier:identifiers[0]}], amount_bought: 0 },
    { id: id++, base_price: [{value:100,identifier:identifiers[0]}], src: "test", name: 'grandma', additional_value: [{value:1,identifier:identifiers[0]}], amount_bought: 0 },
    { id: id++, base_price: [{value:100,identifier:identifiers[0]},{value:1,identifier:identifiers[1]}], src: "test", name: 'farm', additional_value: [{value:8,identifier:identifiers[0]}], amount_bought: 0 },
]