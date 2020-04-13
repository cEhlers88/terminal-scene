import AbstractScene from "../AbstractScene";
import MenuScene from "./MenuScene";

export default class extends MenuScene {
    public draw(): AbstractScene {
        super.draw();
        this.write(this.dimension.x+2,this.dimension.y,this.getItems().length+' plugins loaded');
        return this;
    }
    public addPluginInfo(text:string){this.addItem({text})}

    public init(): void {
        this.setBackColor({r:20,g:20,b:20});
        this.setPadding({top:2,left:1,bottom:0,right:1});
    }
}