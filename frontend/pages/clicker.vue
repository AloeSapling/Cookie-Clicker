<template lang="">
    <div class="flex flex-row h-[100vh] bg-[url('/images/backgrounds/wp7667538-1352160201.jpg')] bg-cover">
        <div class="flex-col flex w-[580px] items-center justify-around h-full relative pb-[280px]">
            <div class="bg-[rgba(0,0,0,0.4)] w-full flex items-center flex-col text-white py-[20px]">
                <p class="text-[25px]">{{displayVar(cookies.count)}} ciastek</p>
                <p>{{displayVar(activeCountSum)}} na sekundę</p>
                <p>{{displayVar(clicker.count)}} na kliknięcie</p>
            </div>
            <button @click="cookies.count=calcVarIncr(cookies.count,[clicker.count])" :class="cookieClass.base + cookieClass.click"></button>
            <div class="bg-[url('/images/backgrounds/blackGradient.png')] h-[60%] absolute w-full bottom-0"></div>
        </div>
        <div class="h-full w-[16px] bg-[url('/images/backgrounds/panelVertical.png')]"></div>
        <div class="flex-1 overflow-y-auto max-h-[100vh] flex flex-col">
            <Buildings :cookieCount="cookies.count" @response="([id,price,additional_value])=>{building(id,price,additional_value)}"/>
        </div>
        <div class="h-full w-[16px] bg-[url('/images/backgrounds/panelVertical.png')]"></div>
        <div class="h-full w-[500px] overflow-y-auto max-h-[100vh]">
            <Upgrades :cookieCount="cookies.count" @response="([id,things_affected,value,price])=>{upgrade(id,things_affected,value,price)}"/>
        </div>
        <p>hello world</p>
    </div>
</template>
<script setup lang='ts'>
    import {ref, reactive, computed} from 'vue'
    import {type BigNumberVal, type BigNumberVar, type activeReactiveCount, type reactiveCount} from '../types/index'
    import {sleep, calcVarIncr, identifiers, calcVarDecr, displayVar, calcVarMult, tempCalcVarMult, tempCalcVarIncr, divideVar10} from '../apps/variableMethods'
    import Buildings from '~/components/Buildings.vue';

    const cookieClass= reactive({
        base:"bg-[url('/images/cookies/perfectCookie-removebg.png')] h-[380px] w-[380px] bg-[length:405px_405px] bg-[center] duration-100 z-[1000] shadow rounded-[100%] ",
        click:"active:scale-[1.2]"
    })



    function building(id: number, price: BigNumberVar,additional_value: BigNumberVar){
        let temp = calcVarDecr(cookies.count,price)
        if(typeof(temp)=='string'){
            console.log("Big error, shouldn't be!")
        }
        else cookies.count = temp!
        console.log(additional_value)
        let index: number = activeCount.findIndex((x)=>x.id==id)
        if(index!=-1){
            activeCount[index].count = calcVarIncr(activeCount[index].count,[additional_value])!        
        }else{
            activeCount.push({id:id,count:calcVarMult(additional_value,[{value:1,identifier:identifiers[0]}]),multiplier:[{ value: 1, identifier: identifiers[0] }]})
        }
        
    }
    function upgrade(id:number,things_affected:Array<number>,value:BigNumberVar,price:BigNumberVar){
        let temp = calcVarDecr(cookies.count,price)
        if(typeof(temp)=='string'){
            console.log("Big error, shouldn't be!")
        }
        else cookies.count = temp!
        for(let i=0;i<things_affected.length;i++){
            if(things_affected[i]!=-1){
                let index: number = activeCount.findIndex((x)=>x.id==things_affected[i])
                activeCount[index].multiplier = calcVarMult(activeCount[index].multiplier,value)
            }else{
                clicker.count = calcVarMult(clicker.count,value)
            }
        }
        
    }
    const cookies: reactiveCount = reactive({
            count:[{value:0, identifier: identifiers[0]}]
        }
    )
    const activeCount: activeReactiveCount = reactive([

    ]);
    const activeCountSum = computed(()=>{
        let sum: BigNumberVar = [{value:0,identifier:identifiers[0]}]
        for(let i=0;i<activeCount.length;i++){
            sum= calcVarIncr(sum,[calcVarMult(activeCount[i].count,activeCount[i].multiplier)])!
        }
        return sum
    })
    const clicker: reactiveCount = reactive({
        count:[{value:700, identifier:identifiers[0]},{value:700, identifier:identifiers[1]},{value:700, identifier:identifiers[2]}]})
    async function activeIncrement(){
        for(let i=0;i<10;i++){
            if(activeCount.length>0){
                cookies.count = calcVarIncr(cookies.count,[divideVar10(calcVarMult(activeCountSum.value,[{value:1,identifier:identifiers[0]}]))])!
            }
            await sleep(100)
        }
        activeIncrement()
    }
    activeIncrement()
</script>
<style>
    body{
        margin:0;
        padding:0;
    }
    .shadow{
        box-shadow: 0 15px 15px 0px rgb(0 0 0);
    }
</style>