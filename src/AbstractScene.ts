import * as terminalKit from "terminal-kit";

export default abstract class {
  protected sceneHasFocus: boolean = false;
  protected data: any = null;
  protected x: number = 0;
  protected y: number = 0;
  protected w: number = 0;
  protected h: number = 0;

  protected readonly term:terminalKit.Terminal = terminalKit.terminal;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  public update(data: any) {
    this.data = data;
    return this.data;
  }
  public abstract draw(): void;
  public abstract handleKeyDown(key: string): void;
  public abstract get name(): string;
  public set hasFocus(newValue: boolean) {
    this.sceneHasFocus = newValue;
  }
  public log(message: any): void {
    this.logHandle(message);
  }
  public setLogHandle(handle: (message: any) => void): void {
    this.logHandle = handle;
  }

  private logHandle: CallableFunction = () => null;
}
