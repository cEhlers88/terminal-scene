import AbstractScene from "../AbstractScene";
import {createXChars, minStringSizeValue} from "../_core/utils";
import {IRgbValue} from "../lib/interfaces";
interface IBufferMessage{
    id:number,
    labelString:string,
    message:string,
    additionals?:unknown
}
enum eBufferMessageType {
    unknown,
    debug,
    info,
    warning,
    error,
    fatal,
}
enum eBufferDrawType {
    cronicle,
    groups
}
export default class extends AbstractScene {
    private bufferIndex:{
        ident:string,
        index:number
    }[]=[];
    private colors:{
        debug:IRgbValue,
        error:IRgbValue,
        log:IRgbValue,
    }={
        debug:{r:50,g:50,b:115},
        error:{r:155,g:0,b:0},
        log:{r:0,g:85,b:0}
    };
    private drawType:eBufferDrawType = eBufferDrawType.cronicle;
    private outputBuffer:{
        debug:IBufferMessage[],
        error:IBufferMessage[],
        log:IBufferMessage[],
    }={debug:[],error:[],log:[]};
    private index:number=0;

    draw(): AbstractScene {
        let index:number=0;
        super.draw();
        this.term.moveTo(this.getDrawArea().x,this.getDrawArea().y).bgColorRgb(30,15,15," Output: "+createXChars(" ",this.getDrawArea().w-9));
        for(const type in this.colors){

            this.term.moveTo(this.getDrawArea().x+this.getDrawArea().w-(10*3)+(10*index)-1,this.getDrawArea().y)
                // @ts-ignore
                .bgColorRgb(this.colors[type].r,this.colors[type].g,this.colors[type].b,' '+minStringSizeValue(type,10));
            index++;
        }
        this.drawBufferMessages();

        return this;
    }

    public addBufferMessage(Message:IBufferMessage,type:eBufferMessageType=eBufferMessageType.info){
        let ident:string='log';
        this.index++;
        ident = (type===eBufferMessageType.debug?'debug':ident);
        ident = (type===eBufferMessageType.error?'error':ident);
        // @ts-ignore
        this.outputBuffer[ident].push(Message);
        // @ts-ignore
        this.bufferIndex.push({ident, index:this.outputBuffer[ident].length-1});
    }
    public handleKeyDown(key: string): Promise<unknown> {
        return new Promise<unknown>((resolve:()=>void)=>{
            switch(key){
                case "F2":
                        for(const name in this.outputBuffer){
                            // @ts-ignore
                            this.outputBuffer[name]=[];
                        }
                        this.bufferIndex=[];
                    break;
            }
            resolve();
        });
    }
    public init(): void {
        this.setBackColor({r:50,g:20,b:20})
        this.setPadding({right:1,left:1,bottom:0,top:0});
    }

    private drawBufferMessages(){
        const self = this;
        let index:number=0;

        const drawLine = (Message:IBufferMessage,type:string,offsetY:number) => {
            let outputString = minStringSizeValue('\u2794 '+Message.labelString+" ("+type+"): "+(Message.message?Message.message+" - ":"")+JSON.stringify(Message.additionals),self.getDrawArea().w);

            if(outputString.length>self.getDrawArea().w){outputString= outputString.substr(0,self.getDrawArea().w);}
            self.term.moveTo(self.getDrawArea().x,self.getDrawArea().y+offsetY).
                // @ts-ignore
                bgColorRgb(self.colors[type].r,self.colors[type].g,self.colors[type].b).
            white(outputString);
        }

        switch(this.drawType){
            case eBufferDrawType.groups:
                for(const type in this.outputBuffer){
                    // @ts-ignore
                    this.outputBuffer[type].map((Message:IBufferMessage)=>{
                        drawLine(Message,type,index+1);
                        index++;
                    });
                }
                break;
            case eBufferDrawType.cronicle:
                this.bufferIndex.map((indexEntry:{ident:string,index:number})=>{
                    // @ts-ignore
                    drawLine(this.outputBuffer[indexEntry.ident][indexEntry.index],indexEntry.ident,index+1);
                    index++;
                });
                break;
        }

    }
}