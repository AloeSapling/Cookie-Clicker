<template lang="">
    <div>
        Count: {{displayVar(count)}}
        current passive Upgrade: {{displayVar(activeCount)}}
        current clicker upgrade: {{displayVar(clicker)}}
        <button @click="calcVarIncr(clicker,count)">Click me!</button>
        <button @click="upgrade([{value:200,identifier:''}])">Click me to upgrade!</button>
        <TinyUpgrade helloWorld="Hi"/>
    </div>
</template>
<script setup lang='ts'>
    import {ref, reactive, computed} from 'vue'
    import {type BigNumberVal} from '../types/index'
    import TinyUpgrade from '../components/TinyUpgrade.vue';
    const count = reactive([
        {
            value:0, 
            identifier: ""
        }
    ])
    const activeCount = reactive([
        {
            value:20, 
            identifier:""
        }
    ])
    const clicker = reactive([
        {
            value:1,
            identifier: "",
        }
    ])
    const identifiers = [
        "","K","Mil","Bil", "Tril", "Quad", "Quint", "Sext", "Sept", "Oct", "Non", "Dec", "UnDec"
    ]
    function calcVarIncr(amount: Array<BigNumberVal>, vari: Array<BigNumberVal>){
        for(let i =0;i<amount.length;i++){
            if(vari.length<=i){
                vari.push({
                    value: amount[i].value,
                    identifier: identifiers[i]
                })
            }else{
                vari[i].value = (vari[i].value*10 + amount[i].value*10)/10
                if(vari[i].value>=1000){
                    if(vari.length<=i+1){
                        vari.push({
                            value: Math.floor(vari[i].value/1000),
                            identifier: identifiers[i+1]
                        })
                    }else{
                        vari[i+1].value+=Math.floor(vari[i].value/1000)
                    }
                    vari[i].value -= Math.floor(vari[i].value/1000)*1000
                }
            }
        }
    }
    function displayVar(vari: Array<BigNumberVal>){
        let temp = ""
        if(vari.length>1){
            temp = vari[vari.length-1].value.toString()
            temp+="."
            temp+=Math.floor(vari[vari.length-2].value/100).toString()
        }else{
            temp = vari[0].value.toString()
        }
        temp += vari[vari.length-1].identifier
        return(temp)
    }
    function upgrade(amount: Array<BigNumberVal>){
        calcVarIncr(amount,activeCount)
    }
    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async function activeIncrement(){
        for(let i=0;i<5;i++){
            calcVarIncr(activeCount,count)
            await sleep(200)
        }
        activeIncrement()
    }
    activeIncrement()
</script>
<style lang="">
    
</style>