import Datahandler from "@cehlers88/ceutils/dist/Datahandler";
import Eventhandler from "@cehlers88/ceutils/dist/Eventhandler";
import * as terminalKit from "terminal-kit";
import {drawContainerBox} from "./_core/utils";
import {eBorderStyle} from "./lib/enums";
import {IPadding, IRect, IRgbValue} from "./lib/interfaces";

export default abstract class AbstractScene {
  protected EvtListener:Eventhandler=new Eventhandler();
  protected DataHandler:Datahandler = new Datahandler();

  protected readonly term:terminalKit.Terminal = terminalKit.terminal;

  constructor(x: number, y: number, w: number, h: number) {
    this.DataHandler.setMultipleData({dimension:{x,y,w,h}});
    this.init();
  }

  public addEventListener(eventName:string,listener:CallableFunction):void{
    this.EvtListener.addListener(eventName,listener);
  }
  public draw(): AbstractScene{
    if(this.getIsVisible()){
      drawContainerBox(this.dimension.x,this.dimension.y,this.dimension.w,this.dimension.h,{
        bgColor:this.getBackColor(),
        bgColorContainer:{r:0,g:0,b:0},
        color:(this.getBorderStyle()===eBorderStyle.none?this.getBackColor():this.getBorderColor()),
        filled:true
      });
    }
    return this;
  }
  public getBackColor():IRgbValue{return this.getData('_backColor',{r:30,g:30,b:30})}
  public getBorderColor():IRgbValue{return this.getData('_borderColor',{r:70,g:70,b:70})}
  public getBorderStyle():eBorderStyle{
    return this.getData('_borderStyle',eBorderStyle.none);
  }
  public getData(key:string,defaultResult:any=null):any{
    return this.DataHandler.getDataSave(key,defaultResult);
  }
  public getDrawArea():IRect{
    const padding=this.getPadding();
    return {
      h:this.dimension.h-(this.getBorderStyle()!==eBorderStyle.none?2:0)-padding.top-padding.bottom,
      w:this.dimension.w-(this.getBorderStyle()!==eBorderStyle.none?2:0)-padding.left-padding.right,
      x:this.dimension.x+(this.getBorderStyle()!==eBorderStyle.none?1:0)+padding.left,
      y:this.dimension.y+(this.getBorderStyle()!==eBorderStyle.none?1:0)+padding.top
    }
  }
  public getIsVisible():boolean{
    return this.getData('_visible',true);
  }
  public getPadding():IPadding{
    return this.getData('_padding',{bottom:0,left:0,right:0,top:0});
  }
  public abstract handleKeyDown(key: string): Promise<unknown>;
  public set hasFocus(newValue: boolean) {
    this.setData('_hasFocus',newValue);
  }
  public abstract init():void
  public log(message: any): void {
    this.logHandle(message);
  }
  public setBackColor(newValue:IRgbValue){this.setData('_backColor',newValue);}
  public setBorderColor(newValue:IRgbValue){this.setData('_borderColor',newValue);}
  public setBorderStyle(newValue:eBorderStyle):AbstractScene{
    this.setData('_borderStyle',newValue);
    return this;
  }
  public setData(key:string,data:any):AbstractScene{
    this.DataHandler.setData(key,data);
    return this;
  }
  public setLogHandle(handle: (message: any) => void): void {
    this.logHandle = handle;
  }
  public setIsVisible(newValue:boolean):AbstractScene{
    this.setData('_visible',newValue);
    return this;
  }
  public setPadding(newValue:IPadding):AbstractScene{
    this.setData('_padding',newValue);
    return this;
  }
  public update(data: any) {
    return this.DataHandler.getAll();
  }
  public write(x:number,y:number,value:string):AbstractScene{
    if(this.getIsVisible()){
      this.term.moveTo(x,y).bgColorRgb(this.getBackColor().r,this.getBackColor().g,this.getBackColor().b,value);
    }
    return this;
  }
  protected get dimension():IRect{
    return this.DataHandler.getDataSave('dimension',{x:-1,y:-1,w:-1,h:-1});
  }
  private logHandle: CallableFunction = () => null;
}
