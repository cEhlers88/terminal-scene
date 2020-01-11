import MenuScene from "../Scenes/MenuScene";
import AbstractScene from "../AbstractScene";
import {drawContainer} from "../_core/utils";

export default class PluginsettingsScene extends MenuScene{
    constructor(x:number,y:number,w:number,h:number) {
        super(x,y,w,h);
        this.DataHandler.setMultipleData({
            _padding:{
                top:0,left:1,right:100,bottom:0
            }
        });

    }
    public draw(): AbstractScene {
        super.draw();
        drawContainer(this.getDrawArea().x+this.getDrawArea().w,this.getDrawArea().y,1,this.getDrawArea().h,{
            r:0,g:0,b:0
        });
        return this;
    }

    public init(): void {
        this.setBackColor({r:20,g:20,b:25});
    }

    public get name():string {
        return "PluginsettingsScene";
    }
}