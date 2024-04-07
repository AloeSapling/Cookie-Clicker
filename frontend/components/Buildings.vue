<template>
    <div>
        
    </div>
</template>
<script setup lang="ts">
    import { ref, computed } from 'vue';
    import {calcVarMult }from '../apps/variableMethods.ts'
    let id = 0;
    const buildings = ref([
        { id: id++, base_price: 15, src: "test", name: 'cursor', additional_value: 0.1, amount_bought: 4 },
        { id: id++, base_price: 100, src: "test", name: 'grandma', additional_value: 1, amount_bought: 0 },
        { id: id++, base_price: 1100, src: "test", name: 'farm', additional_value: 8, amount_bought: 0 },
    ]);

    const next_prices = computed(() => {
        return buildings.value.map((x) => ({
            id: x.id,
            pricex1: Math.round((x.base_price * (1.15 ** x.amount_bought))+0.5),
            pricex10: (() => {
                let res = 0;
                for (let i = x.amount_bought; i < x.amount_bought + 10; i++) {
                    res += Math.round((x.base_price * (1.15 ** i))+0.5);
                }
                return res;
            })(),
            pricex100: (() => {
                let res = 0;
                for (let i = x.amount_bought; i < x.amount_bought + 100; i++) {
                    res += Math.round((x.base_price * (1.15 ** i))+0.5);
                }
                return res;
            })()
        }));
    });
    console.log(buildings.value, next_prices.value);
</script>
<style>
    
</style>