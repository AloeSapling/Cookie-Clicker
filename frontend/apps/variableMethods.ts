import type { BigNumberVal, BigNumberVar } from "~/types"
export const identifiers = [
    "","K","Mil","Bil", "Tril", "Quad", "Quint", "Sext", "Sept", "Oct", "Non", "Dec", "UnDec"
]
const maxDecimal = 10
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
                temp[i].value = (temp[i].value*maxDecimal + amounts[j][i].value*maxDecimal)/maxDecimal
                temp[i].value = (Math.floor(temp[i].value*maxDecimal))/maxDecimal
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
export function calcVarDecr(vari:BigNumberVar,amount:BigNumberVar){
    let temp: BigNumberVar = vari
    let temp2 : BigNumberVar = amount
    for(let i=0;i<temp2.length;i++){
        if(temp2[i].value>temp[i].value){
            let k=i+1
            if(i!=0){
                temp2[i].value = Math.round(temp2[i].value)
                temp[i].value = Math.round(temp[i].value)
            }
            while(temp.length>=k+1 && temp[k].value==0){
                k++
            }
            if(temp.length<k+1){
                return "Minus value"
            }
            temp[k].value-=1
            for(let j = k-1;j>i;j--){
                temp[j].value=999
            }
            temp[i].value=(temp[i].value*maxDecimal+1000*maxDecimal-temp2[i].value*maxDecimal)/maxDecimal
        }
        else{
            temp[i].value=(temp[i].value*maxDecimal-temp2[i].value*maxDecimal)/maxDecimal
        }
    }
    for(let i=temp.length-1;i>0;i--){
        if(temp[i].value<=0) temp.pop()
        else return temp;
    }
    return temp;
}
export function tempCalcVarMult(vari: BigNumberVar, amount: BigNumberVar){
    let temp: BigNumberVar = [{
        value: 0,
        identifier: ""
    }]
    let temp3 = []
    temp = [{
        value: 0,
        identifier: ""
    }]
    console.log(temp)
    for(let i=0;i<amount.length;i++){
        for(let j=0;j<vari.length;j++){
            let temp2: number = ((vari[j].value*maxDecimal)*(amount[i].value*maxDecimal))/maxDecimal**2
            console.log(temp,temp2)
            if(temp2 != Math.floor(temp2) && j!=0){
                temp3 = []
                for(let k=0;k<j-1;k++){
                    temp3.push({value:0,identifier:identifiers[k]})
                }
                temp3.push({value:Math.round(((temp2*10)%10)*100),identifier:identifiers[temp3.length]})
                temp2 = Math.floor(temp2)
            }
            if(temp.length<=j+i){
                if(temp2>1000){
                    temp.push({value: temp2-Math.floor(temp2/1000)*1000,identifier: identifiers[i+j]})
                    temp.push({value: Math.floor(temp2/1000),identifier: identifiers[i+j+1]})
                }else{
                    temp.push({value: temp2,identifier: identifiers[i+j]})
                }
            }else{
                temp[j].value = temp2!
                let tempNum: number = j
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
            console.log("temp+temp3",temp,temp3)
            let temp4 =temp.map((x)=>({value: x.value*1,identifier:x.identifier}))
            let temp5 = temp3.map((x)=>({value: x.value,identifier:x.identifier}))
            if(temp3.length>0){
                temp = tempCalcVarIncr(temp4,[temp5])!
                console.log(temp)
            }
            console.log(temp)
        }
    }
    return temp;
}
export function tempCalcVarIncr(vari: BigNumberVar, amounts: Array<BigNumberVar>){
    let temp: BigNumberVar = vari
    for(let j=0;j<amounts.length;j++){
        for(let i =0;i<amounts[j].length;i++){
            if(temp.length<=i){
                temp.push({
                    value: amounts[j][i].value*1,
                    identifier: identifiers[i]
                })
            }else{
                temp[i].value = (temp[i].value*maxDecimal + amounts[j][i].value*maxDecimal)/maxDecimal
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
    let temp3 = []
    for(let i=0;i<amount.length;i++){
        for(let j=0;j<vari.length;j++){
            let temp2: number = ((vari[j].value*maxDecimal)*(amount[i].value*maxDecimal))/maxDecimal**2
            if(temp2 != Math.floor(temp2) && j!=0){
                temp3 = []
                for(let k=0;k<j-1;k++){
                    temp3.push({value:0,identifier:identifiers[k]})
                }
                temp3.push({value:Math.round(((temp2*10)%10)*100),identifier:identifiers[temp3.length]})
                temp2 = Math.floor(temp2)
            }
            if(temp.length<=j+i){
                if(temp2>1000){
                    temp.push({value: temp2-Math.floor(temp2/1000)*1000,identifier: identifiers[i+j]})
                    temp.push({value: Math.floor(temp2/1000),identifier: identifiers[i+j+1]})
                }else{
                    temp.push({value: temp2,identifier: identifiers[i+j]})
                }
            }else{
                temp[j].value = temp2!
                let tempNum: number = j
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
            if(temp3.length>0){
                temp = calcVarIncr(temp.map((x)=>({value: x.value,identifier:x.identifier})),[temp3.map((x)=>({value: x.value,identifier:x.identifier}))])!
            }
        }
    }
    return temp;
}
export function calcVarMultMultiple(vari:BigNumberVar, amounts: Array<BigNumberVar>){
    let temp: BigNumberVar = vari;
    for(let i=0;i<amounts.length;i++){
        temp = calcVarMult(temp,amounts[i])
    }
    return temp
}
export function calcVarPow(vari: BigNumberVar, amount: number){
    let temp: BigNumberVar = vari
    let tempBase:BigNumberVar = vari
    for(let i=0;i<amount-1;i++){
        temp = calcVarMult(temp,tempBase)
    }
    if(amount==0){
        return[{value:1,identifier:identifiers[0]}]
    }
    return temp;
}
export function checkWhichBigger(firstNum: BigNumberVar, secondNum: BigNumberVar){
    if(firstNum.length>secondNum.length) {
        for(let i=firstNum.length-1;i>=secondNum.length;i--){
            if(firstNum[i].value!=0) return 1
        }
    }
    else if(firstNum.length<secondNum.length){
        for(let i=secondNum.length-1;i>=firstNum.length;i--){
            if(secondNum[i].value!=0) return -1
        }
    }
    for(let i=Math.min(firstNum.length,secondNum.length)-1;i>=0;i--){
        if(firstNum[i].value>secondNum[i].value) return 1
        else if(firstNum[i].value<secondNum[i].value) return -1
    }
    return 0
}
export function tempCheckWhichBigger(firstNum: BigNumberVar, secondNum: BigNumberVar){
    if(firstNum.length>secondNum.length) return 1
    else if(firstNum.length<secondNum.length) return -1;
    else{
        for(let i=0;i<firstNum.length;i++){
            console.log(firstNum[i].value,secondNum[i].value)
            if(firstNum[i].value>secondNum[i].value) return 1
            else if(firstNum[i].value<secondNum[i].value) return -1
        }
    }
    return 0
}
export function divideVar10(vari: BigNumberVar){
    let temp: BigNumberVar = vari
    for(let i=0;i<temp.length;i++){
        if(i!=0){
            temp[i-1].value = (temp[i].value%10)*100
            temp[i].value = Math.floor(temp[i].value/10)
        }
        else temp[i].value = temp[i].value/10
    }
    return temp
}
export function roundVarUp(vari: BigNumberVar){
    let temp: BigNumberVar = vari
    temp[0].value = Math.round(temp[0].value+0.49)
    return temp
}
export function displayVar(vari: BigNumberVar){
    let temp = ""
    if(vari.length>1){
        temp = vari[vari.length-1].value.toString()
        temp+="."
        temp+=Math.floor(vari[vari.length-2].value).toString()
    }else{
        temp = vari[0].value.toString()
    }
    temp += vari[vari.length-1].identifier
    return(temp)
}
export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}