import AbstractScene from "../AbstractScene";
import {createXChars} from "../_core/utils";

export default class extends AbstractScene {
    draw(): AbstractScene {
        super.draw();

        return this;
    }

    public handleKeyDown(key: string): Promise<unknown> {
        return new Promise<unknown>((resolve:()=>void)=>{
            resolve();
        });
    }
    public init(): void {
        this.setBackColor({r:50,g:20,b:20})
    }


}