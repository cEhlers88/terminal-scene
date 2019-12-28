import {eFillStyle} from "../../lib/enums";
import {IRect, IRgbValue} from "../../lib/interfaces";

export default class Element{
    protected dimension:IRect={x:0,y:0,w:0,h:0};
    private bgColor:IRgbValue={r:0,g:0,b:0};
    private color:IRgbValue={r:0,g:0,b:0};
    private fillStyle:eFillStyle=eFillStyle.none;
    private hasFocus:boolean=false;

    public draw():Element{

        return this;
    }
    public getBgColor():IRgbValue{return this.bgColor;}
    public getColor():IRgbValue{return this.color;}
    public getFillStyle():eFillStyle{return this.fillStyle;}
    public setBgColor(newValue:IRgbValue):Element {
        this.bgColor=newValue;
        return this;
    }
    public setColor(newValue:IRgbValue):Element {
        this.color=newValue;
        return this;
    }
    public setFillStyle(newValue:eFillStyle):Element {
        this.fillStyle = newValue;
        return this;
    }
    public update(){
        // dummy
    }
}