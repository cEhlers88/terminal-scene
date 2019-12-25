import AbstractScene from "../src/AbstractScene";

export default class extends AbstractScene{
    public draw(): void {
        throw new Error("Method not implemented.");
    }
    public handleKeyDown(key: string): void {
        throw new Error("Method not implemented.");
    }

    public get name(): string {
        throw new Error("Method not implemented.");
    }


}