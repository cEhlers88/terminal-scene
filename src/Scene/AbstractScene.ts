import IScene from "./IScene";

export default abstract class AbstractScene implements IScene {
    public abstract getName(): string ;

    public abstract redraw(): void ;

    public abstract update(): boolean ;
}