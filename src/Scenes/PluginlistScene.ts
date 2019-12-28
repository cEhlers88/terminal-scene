import MenuScene from "./MenuScene";
import AbstractScene from "../AbstractScene";

export default class extends MenuScene {
    draw(): AbstractScene {
        super.draw();
        this.write(this.dimension.x+1,this.dimension.y+1,'test');
        return this;
    }
    addPluginInfo(text:string){this.addItem({text})}

    init(): void {
        this.bgColor={r:100,g:100,b:200};
        this.setPadding({top:3,left:1,bottom:0,right:0});
/*        this.setItems([
            {text:'Plugin Nr. 1',color:{r:255,g:0,b:0}},
            {text:'Das ist ein Item',color:{r:255,g:0,b:0}},
            {text:'Das ist ein Item',color:{r:255,g:0,b:0}}
        ]);*/
    }
}