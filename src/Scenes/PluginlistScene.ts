import AbstractScene from "../AbstractScene";
import MenuScene from "./MenuScene";

export default class PluginlistScene extends MenuScene {
    constructor(x:number,y:number,w:number,h:number) {
        super(x,y,w,h);
    }
    public draw(): AbstractScene {
        super.draw();
        this.write(this.getDrawArea().x+2,this.getDrawArea().y,this.getItems().length+' plugins loaded');
        return this;
    }
    public addPluginInfo(text:string){this.addItem({text})}

    public init(): void {
        this.setBackColor({r:20,g:20,b:20});
        this.setPadding({top:2,left:1,bottom:0,right:1});
    }
    public get name():string {return "PluginlistScene";}
}