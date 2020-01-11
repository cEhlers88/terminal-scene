import AnimationScene from "../AnimationScene";
import {minStringSizeValue} from "../_core/utils";

export default class DebugScene extends AnimationScene {
    public animate(): void {
        let removeLastKeyNameCounter = this.DataHandler.getDataSave('removeLastKeyNameCounter',0);
        if(removeLastKeyNameCounter>0){
            removeLastKeyNameCounter--;
        }else{
            this.DataHandler.setData('lastKeyName',"");
        }
        this.DataHandler.setData('removeLastKeyNameCounter',removeLastKeyNameCounter);
    }
    public draw(): AnimationScene {
        super.draw();
        this.write(this.getDrawArea().x+3,this.getDrawArea().y,'Plugin: ['+minStringSizeValue( this.DataHandler.getDataSave('pluginname',''),16)+']')
        this.write(this.getDrawArea().x+1,this.getDrawArea().y+1,'Last key: ['+minStringSizeValue( this.DataHandler.getDataSave('lastKeyName',''),16)+']')
        // @ts-ignore
        const barStyle = this.term.colorRgbHex('#600b08').bgColorRgb(this.getBackColor().r,this.getBackColor().g,this.getBackColor().b);
        // @ts-ignore
        this.term.moveTo(this.dimension.x+1,this.dimension.y+this.dimension.h-1).bar( (this.value<=1?this.value:1) , {barStyle,innerSize:this.dimension.w-4});
        return this;
    }
    public handleKeyDown(key: string): Promise<unknown> {
        return new Promise<unknown>((resolve:()=>void)=>{
            this.DataHandler.setData('lastKeyName',key);
            this.DataHandler.setData('removeLastKeyNameCounter',5);
            resolve();
        });
    }
    public get name(): string {
        return "DebugScene";
    }
    public init(): void {
        this.setBackColor({r:20,g:10,b:10});
    }
    public update(data: any): any {
        return super.update(data);
    }
}