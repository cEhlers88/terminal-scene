import AnimationScene from "../AnimationScene";

export default class extends AnimationScene {
    private value:number=0.01;
    public animate(): void {
        this.value+=0.01;
    }
    public handleKeyDown(key: string): Promise<unknown> {
        return new Promise<unknown>((resolve:()=>void)=>{
            resolve();
        });
    }
    draw(): AnimationScene {
        super.draw();
        // @ts-ignore
        const barStyle = this.term.colorRgbHex.bindArgs( '#7b0c09' );
        // @ts-ignore
        this.term.moveTo(this.dimension.x+2,this.dimension.y+this.dimension.h-1).bar( (this.value<=1?this.value:1) , {barStyle,innerSize:this.dimension.w-6});
        return this;
    }

    public get name(): string {
        return "DebugScene";
    }
    public init(): void {
        this.setBackColor({r:20,g:10,b:10});
    }


}