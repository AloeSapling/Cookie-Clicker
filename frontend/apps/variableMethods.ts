import type { BigNumberVal, BigNumberVar } from "~/types"
export const identifiers = [
    "","K","Mil","Bil", "Tril", "Quad", "Quint", "Sext", "Sept", "Oct", "Non", "Dec", "UnDec"
]
export function calcVarIncr(vari: BigNumberVar, amounts: Array<BigNumberVar>){
    let temp: BigNumberVar = vari
    for(let j=0;j<amounts.length;j++){
        for(let i =0;i<amounts[j].length;i++){
            if(temp.length<=i){
                temp.push({
                    value: amounts[j][i].value,
                    identifier: identifiers[i]
                })
            }else{
                temp[i].value = (temp[i].value*10 + amounts[j][i].value*10)/10
                if(temp[i].value>=1000){
                    if(temp.length<=i+1){
                        temp.push({
                            value: Math.floor(temp[i].value/1000),
                            identifier: identifiers[i+1]
                        })
                    }else{
                        let tempNum: number = i+1
                        temp[i+1].value+=Math.floor(temp[i].value/1000)
                        while(temp[tempNum].value>1000){
                            if(temp.length<=tempNum+1){
                                temp.push({
                                    value: Math.floor(temp[tempNum].value/1000),
                                    identifier: identifiers[++tempNum]
                                })
                            }else{
                                temp[++tempNum].value+=Math.floor(temp[tempNum-1].value/1000)
                            }
                            temp[tempNum-1].value -= Math.floor(temp[tempNum-1].value/1000)*1000
                        }
                    }
                    temp[i].value -= Math.floor(temp[i].value/1000)*1000
                }
            }
        }
        return temp;
    }
}
export function calcVarMult(vari: BigNumberVar, amount: BigNumberVar){
    let temp: BigNumberVar = [{
        value: 0,
        identifier: ""
    }]
    for(let i=0;i<amount.length;i++){
        for(let j=0;j<vari.length;j++){
            let temp2: number = vari[j].value*amount[i].value
            if(temp.length<=j+i){
                if(temp2>1000){
                    temp.push({value: temp2-Math.floor(temp2/1000)*1000,identifier: identifiers[i+j]})
                    temp.push({value: temp2-Math.floor(temp2/1000),identifier: identifiers[i+j]})
                }else{
                    temp.push({value: temp2,identifier: identifiers[i+j]})
                }
            }else{
                let temp3: BigNumberVar = []
                for(let t =0;t<i+j;t++){
                    temp3.push({
                        value: 0,
                        identifier: identifiers[t]
                    })
                }
                temp3.push({
                    value: temp2,
                    identifier: identifiers[temp3.length]
                })
                let tempNum: number = temp3.length-1
                while(temp3[tempNum].value>1000){
                    if(temp3.length<=tempNum+1){
                        temp3.push({
                            value: Math.floor(temp3[tempNum].value/1000),
                            identifier: identifiers[++tempNum]
                        })
                    }else{
                        temp3[++tempNum].value+=Math.floor(temp3[tempNum-1].value/1000)
                    }
                    temp3[tempNum-1].value -= Math.floor(temp3[tempNum-1].value/1000)*1000
                }
                temp = calcVarIncr(temp,[temp3])
            }
        }
    }
    return temp;
}
export function checkWhichBigger(firstNum: BigNumberVar, secondNum: BigNumberVar){
    if(firstNum.length>secondNum.length) return 1
    else if(firstNum.length<secondNum.length) return -1;
    else{
        for(let i=0;i<firstNum.length;i++){
            if(firstNum[i].value>secondNum[i].value) return 1
            else if(firstNum[i].value<secondNum[i].value) return -1
        }
    }
    return 0
}
export function displayVar(vari: BigNumberVar){
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
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}