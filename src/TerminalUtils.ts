import {Terminal} from "terminal-kit";

const createXChars=(char:string,count:number):string=>{
    let result = char;
    while(result.length<count){result+=char;}
    return result;
}

export default class TerminalUtils {
    private terminal?:Terminal;

    public setTerminal(terminal:Terminal):TerminalUtils{
        this.terminal = terminal;
        return this;
    }

    public drawContainer (x:number,y:number,w:number,h:number,bgColor:{
        b:number,
        g:number,
        r:number
    }) {
        for(let i:number=1;i<=h;i++){
            // @ts-ignore
            this.terminal.moveTo(x,y+i-1).bgColorRgb(bgColor.r,bgColor.g,bgColor.b).white(createXChars(" ",w));
        }
    }
}