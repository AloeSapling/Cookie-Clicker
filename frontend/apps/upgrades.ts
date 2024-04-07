import type { BigNumberVar, RegUpgrade,ThousandFingers,ThousandFingersUpgrade } from "~/types"
import { identifiers } from "./variableMethods"
import { calcVarMult } from "./variableMethods"
let id=0
    let amount_needed = 0
    let price: BigNumberVar = [{
        value: 0,
        identifier: identifiers[0]
    }]
    export const reg_upgrades: Ref<Array<RegUpgrade | ThousandFingers | ThousandFingersUpgrade>> = ref([
        {
            id:id++,
            icon: "src", 
            name:"Reinforced index finger", 
            amount_needed: 1, 
            thing_needed_id: 0, 
            price: 
                [{value:100,identifier:identifiers[0]}], 
            things_affected:[0,-1], 
            multiplier: 
                [{value:2,identifier:identifiers[0]}], 
            text:"The mouse and cursors are twice as efficient.", 
            subtext: '"prod,prod"'},
        {
            id:id++,
            icon: "src", 
            name:"Carpal tunnel prevention cream", 
            amount_needed: 1, 
            thing_needed_id: 0, 
            price: 
                [{value:500,identifier:identifiers[0]}], 
            things_affected:[0,-1], 
            multiplier: 
                [{value:2,identifier:identifiers[0]}], 
            text:"The mouse and cursors are twice as efficient.", 
            subtext: '"it... it hurts to click..."'},
        {
            id:id++,
            icon: "src", 
            name:"Ambidextrous", 
            amount_needed: 10, 
            thing_needed_id: 0, 
            price: 
                [{value:0,identifier:identifiers[0]},
                {value:10,identifier:identifiers[1]}], 
            things_affected:[0,-1], 
            multiplier: 
                [{value:2,identifier:identifiers[0]}], 
            text:"The mouse and cursors are twice as efficient.", 
            subtext: '"Look ma, both hands!"'},
        {
            id:id++, 
            icon:"src", 
            name: "Thousand Fingers", 
            amount_needed: 25, 
            thing_needed_id: 0, 
            price: 
                [{value: 0, identifier: identifiers[0]},
                {value:100,identifier:identifiers[1]}], 
            things_affected: [0,-1], 
            additor: 
                [{value: 0.1, identifier: identifiers[0]}], 
            text: "The mouse and cursors gain +0.1 cookies for each non-cursor object owned.", 
            subtext: '"clickity"'},
        {
            id: id++, 
            icon: "src", 
            name:"Million fingers", 
            amount_needed: amount_needed=50, 
            thing_needed_id: 0, 
            price: price=
                [{value:0,identifier:identifiers[0]},
                {value:0,identifier:identifiers[1]},
                {value:10,identifier:identifiers[2]}], 
            multiplier: 
                [{value: 5, identifier: identifiers[0]}], 
            text:"Multiplies the gain from Thousand fingers by 5.",
            subtext:'"clickityclickity"'},
        {
            id: id++, 
            icon: "src", 
            name:"Billion fingers", 
            amount_needed: amount_needed+=50, 
            thing_needed_id: 0, 
            price: price=
                calcVarMult(
                    price,
                    [{value:10, identifier: identifiers[0]}]), 
            multiplier: 
                [{value: 10, identifier: identifiers[0]}], 
            text:"Multiplies the gain from Thousand fingers by 10.",
            subtext:'"clickityclickityclickity"'},
        {
            id: id++, 
            icon: "src", 
            name:"Trillion fingers", 
            amount_needed: amount_needed+=50, 
            thing_needed_id: 0, 
            price: price=
                calcVarMult(
                    price,[{value:10,identifier:identifiers[0]}]), 
            multiplier: 
                [{value: 20, identifier: identifiers[0]}], 
            text:"Multiplies the gain from Thousand fingers by 20.",
            subtext:'"clickityclickityclickityclickity"'}
    ])
