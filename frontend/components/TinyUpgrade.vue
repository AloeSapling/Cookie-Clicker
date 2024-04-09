<template lang="">
    <div>
        <button :class="[buyableClass(props.cookieCount,props.price),display]" class="flex-col items-center justify-center" @click="upgrade()">
            <p>{{props.name}}</p>
            <p>{{displayVar(props.price)}}</p>
        </button>
    </div>
</template>
<script setup lang="ts">
import {type BigNumberVar } from '~/types';
import { checkWhichBigger,displayVar } from '~/apps/variableMethods';
    const props = defineProps<{
        name: string
        price: BigNumberVar
        cookieCount: BigNumberVar
    }>()
    const display = ref('flex')
    const emit = defineEmits(['response'])
    function buyableClass(num1: BigNumberVar, num2: BigNumberVar){
        if(checkWhichBigger(num1,num2)==1){return 'bg-green-200'}
        else return 'bg-red-200'
    }
    function upgrade(){
        if(checkWhichBigger(props.cookieCount,props.price)!=-1){
            display.value = 'hidden'
            emit('response')
        }
        
    }
</script>
<style>
    
</style>