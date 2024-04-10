<template>
    <div class="flex flex-row">
        <button class="h-[40px] flex-1 text-[20px] flex justify-center items-center p-2 bg-gray-900" @click="handleWhichChange(0)" :class="whichClasses.class[0]">x1</button>
        <div class="w-[5px] bg-[url('/images/backgrounds/panelVertical.png')] h-full"></div>
        <button class="h-[40px] flex-1 text-[20px] flex justify-center items-center p-2 bg-gray-900" @click="handleWhichChange(1)" :class="whichClasses.class[1]">x10</button>
        <div class="w-[5px] bg-[url('/images/backgrounds/panelVertical.png')] h-full"></div>
        <button class="h-[40px] flex-1 text-[20px] flex justify-center items-center p-2 bg-gray-900" @click="handleWhichChange(2)" :class="whichClasses.class[2]">x100</button>
    </div>
    <div v-if="whichMultiplier.which==0" v-for="building in buildings" class="w-full flex-1">
        <button class="border-black border-[1px] w-full flex items-center pr-2 h-full flex-row justify-between bg-[url('/images/backgrounds/storeTile.jpg')] bg-cover flex-1" @click="purchase(building.id,1,next_prices[building.id].pricex1)">
            <div class="flex flex-row items-end h-full">
                <div class="bg-[url('/images/buildings/buildings.png')] h-[64px] w-[64px]" :class="poses[building.id]"></div>
                <div class="flex flex-row h-full justify-center items-center gap-5">
                    <p class="text-[23px] font-bold text-center max-w[100px]">{{ building.name }}</p>
                    <div class="text-[20px] flex flex-col font-semibold">
                        <p>Cena: {{ displayVar(next_prices[building.id].pricex1) }} ciastek</p>
                        <p>Dostaniesz: {{displayVar(building.additional_value)}} c/s</p>
                    </div>
                </div>
            </div>
            <p class="font-['times new roman'] text-[36px] font-bold text-[rgba(0,0,0,0.6)]">{{building.amount_bought}}</p>
        </button>
    </div>
    <div v-if="whichMultiplier.which==1" v-for="building in buildings" class="w-full flex-1">
        <button class="border-black border-[1px] w-full flex items-center pr-2 h-full flex-row justify-between bg-[url('/images/backgrounds/storeTile.jpg')] bg-cover flex-1" @click="purchase(building.id,10,next_prices[building.id].pricex10)">
            <div class="flex flex-row items-end h-full">
                <div class="bg-[url('/images/buildings/buildings.png')] h-[64px] w-[64px]" :class="poses[building.id]"></div>
                <div class="flex flex-row h-full justify-center items-center gap-5">
                    <p class="text-[23px] font-bold max-w-[100px] text-center">{{ building.name }}</p>
                    <div class="text-[20px] flex flex-col font-semibold">
                        <p>Cena: {{ displayVar(next_prices[building.id].pricex10) }} ciastek</p>
                        <p>Dostaniesz: {{displayVar(calcVarMult(building.additional_value,[{value:10,identifier:""}]))}} c/s</p>
                    </div>
                </div>
            </div>
            <p class="font-['times new roman'] text-[36px] font-bold text-[rgba(0,0,0,0.6)]">{{building.amount_bought}}</p>
        </button>
    </div>
    <div v-if="whichMultiplier.which==2" v-for="building in buildings" class="w-full flex-1">
        <button class="border-black border-[1px] w-full flex items-center pr-2 h-full flex-row justify-between bg-[url('/images/backgrounds/storeTile.jpg')] bg-cover flex-1" @click="purchase(building.id,100,next_prices[building.id].pricex100)">
            <div class="flex flex-row items-end h-full">
                <div class="bg-[url('/images/buildings/buildings.png')] h-[64px] w-[64px]" :class="poses[building.id]"></div>
                <div class="flex flex-row h-full justify-center items-center gap-5">
                    <p class="text-[23px] font-bold text-center max-w-[100px]">{{ building.name }}</p>
                    <div class="text-[20px] flex flex-col font-semibold">
                        <p>Cena: {{ displayVar(next_prices[building.id].pricex100) }} ciastek</p>
                        <p>Dostaniesz: {{displayVar(calcVarMult(building.additional_value,[{value:100,identifier:""}]))}} c/s</p>
                    </div>
                </div>
            </div>
            <p class="font-['times new roman'] text-[36px] font-bold text-[rgba(0,0,0,0.6)]">{{building.amount_bought}}</p>
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
    const whichMultiplier = reactive({
        which:0
    })
    function backgroundClass(pos: number){
        console.log('bg-[bottom_'+pos.toString()+'px_left]')
        return 'bg-[bottom_'+pos.toString()+'px_left]'
    }
    const whichClasses = reactive({
        class: ['text-white cursor-default','text-gray-400 cursor-pointer','text-gray-400 cursor-pointer'],
        last: 0
    })
    function handleWhichChange(which: number){
        whichMultiplier.which = which
        whichClasses.class[whichClasses.last] = 'text-gray-400 cursor-pointer'
        whichClasses.class[which] = 'text-white cursor-default'
        whichClasses.last = which
    }
    const poses = ref(['bg-[top_0px_left]','bg-[bottom_128px_left]','bg-[bottom_256px_left]','bg-[bottom_320px_left]','bg-[bottom_384px_left]','bg-[bottom_448px_left]','bg-[bottom_512px_left]','bg-[bottom_576px_left]','bg-[bottom_640px_left]','bg-[bottom_704px_left]','bg-[bottom_768px_left]'])
    function buyableClass(num1: BigNumberVar, num2: BigNumberVar){
        if(checkWhichBigger(num1,num2)!=-1){return 'bg-green-200'}
        else return 'bg-red-200'
    }
    const emit = defineEmits(['response'])
    function purchase(id:number,amount_bought:number, price: BigNumberVar){
        if(checkWhichBigger(props.cookieCount,price)!=-1){
            buildings[id].amount_bought+=amount_bought
            if(buildings[id].amount_bought==1){emit("response",[id, buildings[id].base_price, buildings[id].additional_value,])}
            else emit("response",[id, price, calcVarMult(buildings[id].additional_value,[{value:amount_bought,identifier:identifiers[0]}])])
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
            pricex1: calcVarIncr(calcVarMult(x.base_price,calcVarPow([{value:1.15,identifier:identifiers[0]}],x.amount_bought))!,[[{value:0,identifier:identifiers[0]}]])!,
            pricex10: calcNext(x.base_price,x.amount_bought,10),
            pricex100: calcNext(x.base_price,x.amount_bought,100)
        }));
    });
</script>
<style>
    
</style>