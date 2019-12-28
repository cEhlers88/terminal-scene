import {IRect, IrgbValue} from "../../lib/interfaces";
import {eFillStyle} from "../../lib/enums";

export default class Element{
    private bgColor:IrgbValue={r:0,g:0,b:0};
    private color:IrgbValue={r:0,g:0,b:0};
    private fillStyle:eFillStyle=eFillStyle.none;
    private hasFocus:boolean=false;
    protected dimension:IRect={x:0,y:0,w:0,h:0};

    public draw():Element{

        return this;
    }
    public getBgColor():IrgbValue{return this.bgColor;}
    public getColor():IrgbValue{return this.color;}
    public getFillStyle():eFillStyle{return this.fillStyle;}
    public setBgColor(newValue:IrgbValue):Element {
        this.bgColor=newValue;
        return this;
    }
    public setColor(newValue:IrgbValue):Element {
        this.color=newValue;
        return this;
    }
    public setFillStyle(newValue:eFillStyle):Element {
        this.fillStyle = newValue;
        return this;
    }
    public update(){}
}