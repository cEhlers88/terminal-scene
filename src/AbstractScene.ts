const _term = require('terminal-kit');

export default abstract class {
    protected _hasFocus:boolean=false;
    protected _data:any=null;
    protected x:number=0;
    protected y:number=0;
    protected w:number=0;
    protected h:number=0;
    private _logHandle:CallableFunction=()=>{};

    constructor(x:number,y:number,w:number,h:number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    update(data:any){
        this._data = data;
        return this._data;
    }
    public abstract draw():void;
    public abstract handleKeyDown(key:string):void;
    public abstract get name():string;
    public set hasFocus(newValue:boolean){this._hasFocus=newValue;}
    public log(message:any):void{this._logHandle(message);}
    public setLogHandle(handle:(message:any)=>void):void{this._logHandle=handle;}

    readonly term = _term.terminal;
}