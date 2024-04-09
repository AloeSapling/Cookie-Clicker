<template>
    <div v-for="building in buildings">
        <button class="p-3 border-black border-[1px]" :class="buyableClass(cookieCount,next_prices[building.id].pricex1)" @click="purchase(building.id,1,next_prices[building.id].pricex1)">
            <p>{{ building.name }}</p>
            <p>{{ displayVar(next_prices[building.id].pricex1) }}</p>
            <p>{{building.amount_bought}}</p>
        </button>
    </div>
</template>
<script setup lang="ts">
    import { ref, computed } from 'vue';
    import {calcVarMult, calcVarPow, identifiers, calcVarIncr, displayVar, roundVarUp, checkWhichBigger, tempCalcVarMult,tempCheckWhichBigger }from '../apps/variableMethods'
    import {buildingsBase} from'../apps/baseValues'
    import type { BigNumberVar } from '~/types';
    import { buildings } from '~/apps/buildings';
    const props = defineProps<{
        cookieCount: BigNumberVar
    }>()
    function buyableClass(num1: BigNumberVar, num2: BigNumberVar){
        if(checkWhichBigger(num1,num2)!=-1){return 'bg-green-200'}
        else return 'bg-red-200'
    }
    const emit = defineEmits(['response'])
    function purchase(id:number,amount_bought:number, price: BigNumberVar){
        if(checkWhichBigger(props.cookieCount,price)!=-1){
            buildings[id].amount_bought+=amount_bought
            if(buildings[id].amount_bought==1){emit("response",[id, buildings[id].base_price, buildings[id].additional_value])}
            else emit("response",[id, price, buildings[id].additional_value])
        }
    }
    function calcNext(price: BigNumberVar,amount_bought:number, amount: number){
        let res: BigNumberVar = [
                    {value: 0,identifier:identifiers[0]}
        ];
        for (let i = amount_bought; i < amount_bought + amount; i++) {
                    let temp = calcVarMult(price,calcVarPow([{value:1.15,identifier:identifiers[0]}],i))
                    temp = roundVarUp(temp)
                    res = calcVarIncr(res,[temp])!
                }
                return res;
    }
    const next_prices = computed(() => {
        return buildings.map((x) => ({
            id: x.id,
            pricex1: roundVarUp(calcVarMult(x.base_price,calcVarPow([{value:1.15,identifier:identifiers[0]}],x.amount_bought))),
            pricex10: calcNext(x.base_price,x.amount_bought,10),
            pricex100: calcNext(x.base_price,x.amount_bought,100)
        }));
    });
</script>
<style>
    
</style>