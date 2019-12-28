import * as terminalKit from "terminal-kit";
import {IPadding, IRect, IrgbValue} from "./lib/interfaces";
import {drawBox} from "./_core/utils";
import {eBorderStyle} from "./lib/enums";

export default abstract class AbstractScene {
  protected bgColor:IrgbValue={r:200,g:0,b:0};
  protected data: any = {};
  protected dimension:IRect={x:0,y:0,w:0,h:0};

  protected readonly term:terminalKit.Terminal = terminalKit.terminal;

  constructor(x: number, y: number, w: number, h: number) {
    this.dimension = {x,y,w,h};
    this.init();
  }

  public draw(): AbstractScene{
    drawBox(this.dimension.x,this.dimension.y,this.dimension.w,this.dimension.h,{
      color: this.bgColor,
      filled: false,
      bgColor:{r:0,g:0,b:0}
    });
    return this;
  }
  public getBorderStyle():eBorderStyle{
    return this.getData('_borderStyle',eBorderStyle.none);
  }
  public getData(identifier:string,defaultResult:any=null):any{
    return (this.data[identifier]?this.data[identifier]:defaultResult);
  }
  public getPadding():IPadding{
    return this.getData('_padding',{bottom:0,left:0,right:0,top:0});
  }
  public getDrawArea():IRect{
    const padding=this.getPadding();
    return {
      x:this.dimension.x+(this.getBorderStyle()!==eBorderStyle.none?1:0)+padding.left,
      y:this.dimension.y+(this.getBorderStyle()!==eBorderStyle.none?1:0)+padding.top,
      h:this.dimension.h-(this.getBorderStyle()!==eBorderStyle.none?2:0)-padding.top-padding.bottom,
      w:this.dimension.w-(this.getBorderStyle()!==eBorderStyle.none?2:0)-padding.left-padding.right
    }
  }
  public abstract handleKeyDown(key: string): Promise<unknown>;
  public set hasFocus(newValue: boolean) {
    this.setData('_hasFocus',newValue);
  }
  public abstract init():void
  public log(message: any): void {
    this.logHandle(message);
  }
  public abstract get name(): string;
  public setBorderStyle(newValue:eBorderStyle):AbstractScene{
    this.setData('_borderStyle',newValue);
    return this;
  }
  public setLogHandle(handle: (message: any) => void): void {
    this.logHandle = handle;
  }
  public setData(identifier:string,data:any):AbstractScene{
    this.data[identifier]=data;
    return this;
  }
  public setPadding(newValue:IPadding):AbstractScene{
    this.setData('_padding',newValue);
    return this;
  }
  public update(data: any) {
    //this.data = data;
    return this.data;
  }
  public write(x:number,y:number,value:string):AbstractScene{
    this.term.moveTo(x,y).bgColorRgb(this.bgColor.r,this.bgColor.g,this.bgColor.b,value);
    return this;
  }

  private logHandle: CallableFunction = () => null;
}
