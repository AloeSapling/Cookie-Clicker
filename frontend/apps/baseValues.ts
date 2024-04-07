let id = 0
const buildingsBase = ref([
    { id: id++, base_price: [15], src: "test", name: 'cursor', additional_value: [0.1], amount_bought: 4 },
    { id: id++, base_price: [100], src: "test", name: 'grandma', additional_value: [1], amount_bought: 0 },
    { id: id++, base_price: [1,100], src: "test", name: 'farm', additional_value: [8], amount_bought: 0 },
])