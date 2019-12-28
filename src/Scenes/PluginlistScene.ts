import MenuScene from "./MenuScene";
import AbstractScene from "../AbstractScene";

export default class extends MenuScene {
    draw(): AbstractScene {
        super.draw();
        this.write(this.dimension.x+2,this.dimension.y,'Plugins');
        return this;
    }
    addPluginInfo(text:string){this.addItem({text})}

    init(): void {
        this.setBackColor({r:20,g:20,b:20});
        this.setPadding({top:2,left:1,bottom:0,right:1});
    }
}