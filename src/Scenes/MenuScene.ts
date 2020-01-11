import {fixStringSizeValue} from "../_core/utils";
import AbstractScene from "../AbstractScene";
import {IPadding, IRgbValue} from "../lib/interfaces";

interface IMenuitem {
    bgColor?:IRgbValue,
    color?:IRgbValue,
    text:string
}

export default class MenuScene extends AbstractScene{
    protected activeMenuIndex:number=0;
    protected bgColorActiveItem:IRgbValue={r:250,g:150,b:0};
    protected colorActiveItem:IRgbValue={r:50,g:50,b:50};
    protected colorItem:IRgbValue={r:230,g:230,b:230};

    public addItem(newItem:IMenuitem):MenuScene{
        const items = this.getItems();
        items.push(newItem);
        return this.setItems(items);
    }
    public clearItems():MenuScene{
        return this.setItems([]);
    }
    public draw(): AbstractScene {
        const self = this;
        const items:IMenuitem[]=this.getItems();
        if(this.getIsVisible()){
            super.draw();
            items.map((Menuitem:IMenuitem,index:number)=>{
                const {bgR,bgG,bgB,fcR,fcG,fcB} = (index===self.activeMenuIndex?{
                    bgB: self.bgColorActiveItem.b,
                    bgG: self.bgColorActiveItem.g,
                    bgR: self.bgColorActiveItem.r,
                    fcB: self.colorActiveItem.b,
                    fcG: self.colorActiveItem.g,
                    fcR: self.colorActiveItem.r
                }:{
                    bgB:(Menuitem.bgColor?Menuitem.bgColor.b:self.getBackColor().b),
                    bgG:(Menuitem.bgColor?Menuitem.bgColor.g:self.getBackColor().g),
                    bgR:(Menuitem.bgColor?Menuitem.bgColor.r:self.getBackColor().r),
                    fcB:(Menuitem.color?Menuitem.color.b:self.colorItem.b),
                    fcG:(Menuitem.color?Menuitem.color.g:self.colorItem.g),
                    fcR:(Menuitem.color?Menuitem.color.r:self.colorItem.r)
                });
                self.term.moveTo(self.getDrawArea().x,self.getDrawArea().y+index).
                bgColorRgb(bgR,bgG,bgB).
                colorRgb(fcR,fcG,fcB,fixStringSizeValue((this.activeMenuIndex===index?this.getIconHover():this.getIconDefault())+' '+Menuitem.text,self.getDrawArea().w))
            });
        }
        return this;
    }
    public getIconDefault():string{
        return this.DataHandler.getDataSave('_icon','\u25cb');
    }
    public getIconHover():string{
        return this.DataHandler.getDataSave('_iconHover','\u25c9');
    }
    public getItems():IMenuitem[]{
        return this.DataHandler.getDataSave('_menuitems',[]);
    }
    public handleKeyDown(key: string): Promise<unknown> {
        const self = this;
        return new Promise((resolve:()=>void)=>{
            switch(key){
                case "DOWN":
                    if(self.activeMenuIndex<self.getItems().length-1){
                        self.activeMenuIndex++;
                        self.EvtListener.dispatch('changed',self.activeMenuIndex);
                    }
                    break;
                case "UP":
                    if(self.activeMenuIndex>0){
                        self.activeMenuIndex--;
                        self.EvtListener.dispatch('changed',self.activeMenuIndex);
                    }
                    break;
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
    public setIconDefault(newValue:string):MenuScene{
        this.DataHandler.setData('_icon',newValue);
        return this;
    }
    public setIconHover(newValue:string):MenuScene{
        this.DataHandler.setData('_iconHover',newValue);
        return this;
    }

    public init(): void {
        // dummy
    }
}