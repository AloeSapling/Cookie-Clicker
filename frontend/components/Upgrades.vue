<template lang="">
    <div>
        
    </div>
</template>
<script setup lang="ts">
import { calcVarMult, identifiers } from '~/apps/variableMethods';
import type { BigNumberVar } from '~/types';

    let id=0
    let amount_needed = 0
    let price: BigNumberVar = [{
        value: 0,
        identifier: identifiers[0]
    }]
    const reg_upgrades = ref([
        {id:id++, icon: "src", name:"Reinforced index finger", amount_needed: 1, thing_needed_id: 0, price: [{value:100,identifier:identifiers[0]}], things_affected:[0,-1], multiplier: [{value:2,identifier:identifiers[0]}], text:"The mouse and cursors are twice as efficient.", subtext: '"prod,prod"'}
    ])
    let id_tf = 3
    amount_needed = 50
    price = [{value:0,identifier:identifiers[0]},{value:0,identifier:identifiers[1]},{value:10,identifier:identifiers[2]}]
    const thousand_fingers = ref({
        id:id_tf++, icon:"src", name: "Thousand Fingers", amount_needed: 25, thing_needed_id: 0, price: [{value: 0, identifier: identifiers[0]},{value:100,identifier:identifiers[1]}], things_affected: [0,-1], additor: [{value: 0.1, identifier: identifiers[0]}], text: "The mouse and cursors gain +0.1 cookies for each non-cursor object owned.", subtext: '"clickity"'
    })
    const thousand_fingers_upgrades = ref([
        {id: id_tf++, icon: "src", name:"Million fingers", amount_needed: amount_needed+=50, thing_needed_id: 0, price:price, multiplier: [{value: 5, identifier: identifiers[0]}], text:"Multiplies the gain from Thousand fingers by 5.",subtext:'"clickityclickity"'},
        {id: id_tf++, icon: "src", name:"Billion fingers", amount_needed: amount_needed+=50, thing_needed_id: 0, price:price=calcVarMult(price,[{value:10, identifier: identifiers[0]}]), multiplier: [{value: 10, identifier: identifiers[0]}], text:"Multiplies the gain from Thousand fingers by 10.",subtext:'"clickityclickityclickity"'},
        {id: id_tf++, icon: "src", name:"Trillion fingers", amount_needed: amount_needed+=50, thing_needed_id: 0, price:price=calcVarMult(price,[{value:10,identifier:identifiers[0]}]), multiplier: [{value: 20, identifier: identifiers[0]}], text:"Multiplies the gain from Thousand fingers by 20.",subtext:'"clickityclickityclickityclickity"'}
    ])
</script>
<style lang="">
    
</style>