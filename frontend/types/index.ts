export type BigNumberVal = {
    value: number
    identifier: string
}
export type BigNumberVar = Array<BigNumberVal>
export type RegUpgrade = {
    id: number
    icon: string
    name: string
    amount_needed: number
    thing_needed_id: number
    price: BigNumberVar
    things_affected: Array<number>
    multiplier: BigNumberVar
    text: string
    subtext: string
}
export type ThousandFingers = {
    id: number
    icon: string
    name: string
    amount_needed: number
    thing_needed_id: number
    price: BigNumberVar
    things_affected: Array<number>
    additor: BigNumberVar
    text: string
    subtext: string
}
export type ThousandFingersUpgrade = {
    id: number
    icon: string
    name: string
    amount_needed: number
    thing_needed_id: number
    price: BigNumberVar
    multiplier: BigNumberVar
    text: string
    subtext: string
}
export type building = {
    id: number
    base_price: BigNumberVar
    src: string
    name: string
    additional_value: BigNumberVar
    amount_bought: number
}
export type reactiveCount = {
    count: BigNumberVar
}
export type activElem ={
    id:number
    count:BigNumberVar
}
export type activeReactiveCount = Array<activElem>