import AbstractScene from "../AbstractScene";
import {IPadding, IrgbValue} from "../lib/interfaces";
import {fixStringSizeValue} from "../_core/utils";

interface IMenuitem {
    bgColor?:IrgbValue,
    color?:IrgbValue,
    text:string
}

export default class MenuScene extends AbstractScene{
    protected activeMenuIndex:number=0;
    protected bgColorActiveItem:IrgbValue={r:250,g:150,b:0};
    protected colorActiveItem:IrgbValue={r:50,g:50,b:50};
    protected colorItem:IrgbValue={r:250,g:250,b:250};

    public addItem(newItem:IMenuitem):MenuScene{
        const items = this.getItems();
        items.push(newItem);
        return this.setItems(items);
    }
    public draw(): AbstractScene {
        const self = this;
        const items:IMenuitem[]=this.getItems();
        if(this.getIsVisible()){
            super.draw();
            items.map((Menuitem:IMenuitem,index:number)=>{
                const {bgR,bgG,bgB,fcR,fcG,fcB} = (index===self.activeMenuIndex?{
                    bgR: self.bgColorActiveItem.r,
                    bgG: self.bgColorActiveItem.g,
                    bgB: self.bgColorActiveItem.b,
                    fcR: self.colorActiveItem.r,
                    fcG: self.colorActiveItem.g,
                    fcB: self.colorActiveItem.b
                }:{
                    bgR:(Menuitem.bgColor?Menuitem.bgColor.r:self.getBackColor().r),
                    bgG:(Menuitem.bgColor?Menuitem.bgColor.g:self.getBackColor().g),
                    bgB:(Menuitem.bgColor?Menuitem.bgColor.b:self.getBackColor().b),
                    fcR:(Menuitem.color?Menuitem.color.r:self.colorItem.r),
                    fcG:(Menuitem.color?Menuitem.color.g:self.colorItem.g),
                    fcB:(Menuitem.color?Menuitem.color.b:self.colorItem.b)
                });
                self.term.moveTo(self.getDrawArea().x,self.getDrawArea().y+index).
                bgColorRgb(bgR,bgG,bgB).
                colorRgb(fcR,fcG,fcB,fixStringSizeValue(Menuitem.text,self.getDrawArea().w))
            });
        }
        return this;
    }
    public getItems():IMenuitem[]{
        let result=this.getData('_menuitems');
        if(!result){result=[];}
        return result;
    }
    public handleKeyDown(key: string): Promise<unknown> {
        return new Promise((resolve:()=>void)=>{
            switch(key){
                case "DOWN": this.activeMenuIndex++; break;
                case "UP": this.activeMenuIndex--; break;
            }
            resolve();
        });
    }
    public get name(): string {
        return "MenuScene"
    }
    public setItems(newValue:IMenuitem[]):MenuScene{
        this.setData('_menuitems',newValue);
        return this;
    }

    init(): void {}
}