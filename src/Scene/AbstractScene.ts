import IScene from "./IScene";
import ISceneInfo from "./ISceneInfo";
import * as terminalKit from "terminal-kit";

export default abstract class AbstractScene implements IScene {
    private config:{
        borderColor:number,
        padding:Array<number>,
        terminal:terminalKit.Terminal|any,
        margin:Array<number>,
        x:number,
        y:number
    };

    public constructor() {
        this.config = {
            borderColor:0,
            padding:[0,0,0,0],
            margin:[0,0,0,0],
            terminal:undefined,
            x:0,
            y:0
        };
    }

    public abstract draw():void ;

    public redraw(): void {
        this.draw();
    }

    public abstract update(sceneInfo:ISceneInfo): boolean ;

    public abstract getName(): string ;

    public setTerminal(terminal:terminalKit.Terminal): IScene {
        console.log("hier");
        console.log(this);
        this.config.terminal = terminal;
        return this;
    }

    public write(value:string,x:number=-1,y:number=-1):AbstractScene {
        // @ts-ignore
        this.Terminal("Hallo");
        return this;
    }

    public get Terminal():terminalKit.Terminal|undefined {
        return this.config.terminal;
    }

    public get marginTop():number{ return this.config.margin[0];}
    public get marginRight():number{ return this.config.margin[1];}
    public get marginBottom():number{ return this.config.margin[2];}
    public get marginLeft():number{ return this.config.margin[3];}

    public get paddingTop():number{ return this.config.padding[0];}
    public get paddingRight():number{ return this.config.padding[1];}
    public get paddingBottom():number{ return this.config.padding[2];}
    public get paddingLeft():number{ return this.config.padding[3];}
}