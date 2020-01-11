import AbstractScene from "../AbstractScene";

export default class extends AbstractScene {
    public handleKeyDown(key: string): Promise<unknown> {
        return new Promise<unknown>((resolve:()=>void)=>{
            resolve();
        });
    }
    public get name(): string {
        return "AppInfoScene";
    }
    public init(): void {
        this.setBackColor({r:20,g:30,b:40});
    }


}