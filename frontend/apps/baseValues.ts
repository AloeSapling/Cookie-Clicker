import type { building } from "~/types"
import { identifiers } from "./variableMethods"

let id = 0
let pos = 0
export const buildingsBase: Array<building> = [
    { id: id++, base_price: [{value:15,identifier:identifiers[0]}], src: "test", name: 'cursor', additional_value: [{value:0.1,identifier:identifiers[0]}], amount_bought: 0, pos:0 },
    { id: id++, base_price: [{value:100,identifier:identifiers[0]}], src: "test", name: 'grandma', additional_value: [{value:1,identifier:identifiers[0]}], amount_bought: 0, pos: pos+=64 },
    { id: id++, base_price: [{value:100,identifier:identifiers[0]},{value:1,identifier:identifiers[1]}], src: "test", name: 'farm', additional_value: [{value:8,identifier:identifiers[0]}], amount_bought: 0, pos:pos+=128 },
    { id: id++, base_price: [{value:0,identifier:identifiers[0]},{value:12,identifier:identifiers[1]}], src: "test", name: 'mine', additional_value: [{value:47,identifier:identifiers[0]}], amount_bought: 0, pos:pos+=64 },
    { id: id++, base_price: [{value:0,identifier:identifiers[0]},{value:130,identifier:identifiers[1]}], src: "test", name: 'factory', additional_value: [{value:260,identifier:identifiers[0]}], amount_bought: 0, pos:pos+=64 },
    { id: id++, base_price: [{value:0,identifier:identifiers[0]},{value:400,identifier:identifiers[1]},{value:1,identifier:identifiers[2]}], src: "test", name: 'bank', additional_value: [{value:400,identifier:identifiers[0]}, {value:1,identifier:identifiers[1]}], amount_bought: 0, pos:pos+=64 },
    { id: id++, base_price: [{value:0,identifier:identifiers[0]},{value:0,identifier:identifiers[1]},{value:20,identifier:identifiers[2]}], src: "test", name: 'temple', additional_value: [{value:800,identifier:identifiers[0]}, {value:7,identifier:identifiers[1]}], amount_bought: 0, pos:pos+=64 },
    { id: id++, base_price: [{value:0,identifier:identifiers[0]},{value:0,identifier:identifiers[1]},{value:330,identifier:identifiers[2]}], src: "test", name: 'wizard tower', additional_value: [{value:0,identifier:identifiers[0]}, {value:44,identifier:identifiers[1]}], amount_bought: 0, pos:pos+=64 },
    { id: id++, base_price: [{value:0,identifier:identifiers[0]},{value:0,identifier:identifiers[1]},{value:100,identifier:identifiers[2]},{value:5,identifier:identifiers[3]}], src: "test", name: 'shipment', additional_value: [{value:0,identifier:identifiers[0]}, {value:260,identifier:identifiers[1]}], amount_bought: 0, pos:pos+=64 },
    { id: id++, base_price: [{value:0,identifier:identifiers[0]},{value:0,identifier:identifiers[1]},{value:0,identifier:identifiers[2]},{value:75,identifier:identifiers[3]}], src: "test", name: 'alchemy lab', additional_value: [{value:0,identifier:identifiers[0]}, {value:600,identifier:identifiers[1]},{value:1,identifier:identifiers[1]}], amount_bought: 0, pos:pos+=64 },
    { id: id++, base_price: [{value:0,identifier:identifiers[0]},{value:0,identifier:identifiers[1]},{value:0,identifier:identifiers[2]},{value:0,identifier:identifiers[3]},{value:1,identifier:identifiers[4]}], src: "test", name: 'portal', additional_value: [{value:0,identifier:identifiers[0]}, {value:0,identifier:identifiers[1]},{value:10,identifier:identifiers[1]}], amount_bought: 0, pos:pos+=64 },
]