import terminalKit from "terminal-kit";
import {borderNormal} from "../lib/unicode";
import {IrgbValue} from "../lib/interfaces";
const term = terminalKit.terminal;

export const createXChars=(char:string,count:number):string=>{
    let result = char;
    while(result.length<count){result+=char;}
    return result;
}
export const drawContainer = (x:number,y:number,w:number,h:number,bgColor:IrgbValue) => {
    for(let i:number=1;i<=h;i++){
        term.moveTo(x,y+i-1).bgColorRgb(bgColor.r,bgColor.g,bgColor.b).white(createXChars(" ",w));
    }
}
export const drawBox = (x:number,y:number,w:number,h:number,options:{
    color:IrgbValue,
    filled:boolean,
    bgColor?:IrgbValue
}={
    color:{r:200,g:250,b:100},
    filled:false,
    bgColor:{r:0,g:0,b:0}
}):void => {
    if(!options.bgColor){options.bgColor={r:0,g:0,b:0}}
    term.moveTo(x,y).bgColorRgb(options.bgColor.r,options.bgColor.g,options.bgColor.b)
        .colorRgb(options.color.r,options.color.g,options.color.b,
        borderNormal.topLeft+createXChars(borderNormal.top,w-2)+borderNormal.topRight);

    for(let i:number=1;i<h-1;i++){
        term.moveTo(x,y+i).
            bgColorRgb(options.bgColor.r,options.bgColor.g,options.bgColor.b).
            colorRgb(options.color.r,options.color.g,options.color.b,borderNormal.left+(options.filled?createXChars(' ',w-2):''))
            .moveTo(x+w-1,y+i).colorRgb(options.color.r,options.color.g,options.color.b,borderNormal.right);
    }

    term.moveTo(x,y+h-1).bgColorRgb(options.bgColor.r,options.bgColor.g,options.bgColor.b)
        .colorRgb(options.color.r,options.color.g,options.color.b,borderNormal.bottomLeft+createXChars(borderNormal.bottom,w-2)+borderNormal.bottomRight);
    term.styleReset();
}
export const drawContainerBox = (x:number,y:number,w:number,h:number,options:{
    color:IrgbValue,
    filled:boolean,
    bgColor?:IrgbValue
    bgColorContainer?:IrgbValue
}={
    color:{r:30,g:30,b:30},
    filled:false
}) => {
    const bgColor=(options.bgColor?options.bgColor:{r:0,g:0,b:0});
    drawContainer(x,y,w,h,(options.bgColorContainer?options.bgColorContainer:{r:0,g:0,b:0}));
    drawBox(x+1,y,w-2,h,{
        filled:options.filled,
        color:options.color,
        bgColor:bgColor
    });
}
export const drawButton=(x:number,y:number,text:string, options:{isActive:boolean, isEnabled:boolean}={
    isActive:false,
    isEnabled:false
})=>{
    let bgColor:string='';
    if(options.isEnabled){
        bgColor = (options.isActive?'bgGreen':'bgBlack');
    }else{
        bgColor = (options.isActive?'bgRed':'bgGray');
    }
    if(options.isActive){
        // @ts-ignore
        term.moveTo(x,y).white[bgColor].bold(text);
    }else{
        // @ts-ignore
        term.moveTo(x,y).white[bgColor](text);
    }
}
export const minStringSizeValue=(stringToEval:string,minLength:number,fillChar:string=' '):string=>{
    while(stringToEval.length<minLength){stringToEval+=fillChar;}
    return stringToEval;
}
export const fixStringSizeValue=(stringToEval:string, fixLength:number, fillChar:string=' ') =>{
    if(stringToEval.length<fixLength){
        return minStringSizeValue(stringToEval,fixLength,fillChar);
    }else{
        return stringToEval.substr(0,fixLength);
    }
}