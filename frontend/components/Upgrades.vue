<template lang="">
    <div @mouseover="hover()" @mouseleave="dehover()">
        <div v-for="upgrade in displayUpgrades.list">
            <TinyUpgrade @response="emit('response',[upgrade.id,upgrade.things_affected,upgrade.multiplier,upgrade.price])" :cookieCount="cookieCount" :price="upgrade.price" :name="upgrade.name"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { upgrades } from '~/apps/upgrades';
import { calcVarMult, identifiers } from '~/apps/variableMethods';
import { buildings } from '~/apps/buildings';
import type { BigNumberVar } from '~/types';
    const props = defineProps<{
        cookieCount: BigNumberVar
    }>()
    const emit = defineEmits(['response'])
    let id=0
    let amount_needed = 0
    let price: BigNumberVar = [{
        value: 0,
        identifier: identifiers[0]
    }]
    const upgrades_local = upgrades
    const fullList = computed(()=>{
        return upgrades_local.filter((x)=>buildings[x.thing_needed_id].amount_bought>=x.amount_needed)
    })
    const filteredList = computed(()=>{
        return fullList.value.slice(0,5)
    })
    let displayUpgrades: {list:any} = reactive({
        list: filteredList
    })
    function hover(){
        displayUpgrades.list = fullList
    }
    function dehover(){
        displayUpgrades.list = filteredList
    }
</script>
<style lang="">
    
</style>