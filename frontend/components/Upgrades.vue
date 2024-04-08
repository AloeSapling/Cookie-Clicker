<template lang="">
    <div v-for="upgrade in displayUpgrades" @hover="displayUpgrades=fullList">
        <TinyUpgrade @response="emit('response',[upgrade.id,upgrade.things_affected,upgrade.price])" :cookieCount="cookieCount" :price="upgrade.price" :name="upgrade.name"/>
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
    const fullList = computed(()=>{
        return upgrades.filter((x)=>buildings[x.thing_needed_id].amount_bought>=x.amount_needed)
    })
    const filteredList = computed(()=>{
        return fullList.value.slice(0,5)
    })
    const displayUpgrades = ref(filteredList)
</script>
<style lang="">
    
</style>