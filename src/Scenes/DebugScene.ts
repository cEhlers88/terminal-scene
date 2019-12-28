import AbstractScene from "../AbstractScene";

export default class extends AbstractScene {
    public handleKeyDown(key: string): Promise<unknown> {
        return new Promise<unknown>(()=>{

        });
    }
    public get name(): string {
        return "DebugScene";
    }
    public init(): void {
        this.setBackColor({r:255,g:255,b:255});
    }


}