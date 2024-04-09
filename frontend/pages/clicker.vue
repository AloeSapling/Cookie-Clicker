<template lang="">
    <div>
        Cookies: {{displayVar(cookies.count)}}
        current passive Upgrade: {{displayVar(activeCountSum)}}
        current clicker upgrade: {{displayVar(clicker.count)}}
        <button @click="cookies.count=calcVarIncr(cookies.count,[clicker.count])">Click me!</button>
        <Buildings :cookieCount="cookies.count" @response="([id,price,additional_value])=>{building(id,price,additional_value)}"/>
        <Upgrades :cookieCount="cookies.count" @response="([id,things_affected,value,price])=>{upgrade(id,things_affected,value,price)}"/>
            <p>hello world</p>
    </div>
</template>
<script setup lang='ts'>
    import {ref, reactive, computed} from 'vue'
    import {type BigNumberVal, type BigNumberVar, type activeReactiveCount, type reactiveCount} from '../types/index'
    import {sleep, calcVarIncr, identifiers, calcVarDecr, displayVar, calcVarMult, tempCalcVarMult, tempCalcVarIncr} from '../apps/variableMethods'
    import Buildings from '~/components/Buildings.vue';
    function building(id: number, price: BigNumberVar,additional_value: BigNumberVar){

        let temp = calcVarDecr(cookies.count,price)
        if(typeof(temp)=='string'){
            console.log("Big error, shouldn't be!")
        }
        else cookies.count = temp!
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
        count:[{value:700, identifier:identifiers[0]},{value:700, identifier:identifiers[1]}]})
    async function activeIncrement(){
        for(let i=0;i<5;i++){
            if(activeCount.length>0){
                cookies.count = calcVarIncr(cookies.count,[activeCountSum.value])!
            }
            await sleep(200)
        }
        activeIncrement()
    }
    activeIncrement()
</script>
<style lang="">
    
</style>