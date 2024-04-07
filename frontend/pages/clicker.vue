<template lang="">
    <div>
        Cookies: {{displayVar(cookies.count)}}
        current passive Upgrade: {{displayVar(activeCount.count)}}
        current clicker upgrade: {{displayVar(clicker.count)}}
        <button @click="cookies.count=calcVarIncr(cookies.count,[clicker.count])">Click me!</button>
        <Buildings :cookieCount="cookies.count" @response="([id,price,additional_value])=>{console.log(price);building(id,price,additional_value);}"/>
    </div>
</template>
<script setup lang='ts'>
    import {ref, reactive, computed} from 'vue'
    import {type BigNumberVal, type BigNumberVar, type reactiveCount} from '../types/index'
    import {sleep, calcVarIncr, identifiers, calcVarDecr, displayVar} from '../apps/variableMethods'
    import Buildings from '~/components/Buildings.vue';
    function building(id: number, price: BigNumberVar,additional_value: BigNumberVar){

        let temp = calcVarDecr(cookies.count,price)
        if(typeof(temp)=='string'){
            console.log("Big error, shouldn't be!")
        }
        else cookies.count = temp!
        activeCount.count = calcVarIncr(activeCount.count,[additional_value])!
    }
    const cookies: reactiveCount = reactive({
            count:[{value:0, identifier: identifiers[0]}]
        }
    )
    const activeCount: reactiveCount = reactive({
        count:[{value:0, identifier:identifiers[0]}]})
    const clicker: reactiveCount = reactive({
        count:[{value:1, identifier:identifiers[0]}]})
    async function activeIncrement(){
        for(let i=0;i<5;i++){
            cookies.count = calcVarIncr(cookies.count,[activeCount.count])!
            await sleep(200)
        }
        activeIncrement()
    }
    activeIncrement()
</script>
<style lang="">
    
</style>