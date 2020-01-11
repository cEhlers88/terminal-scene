import * as terminalKit from 'terminal-kit';
import {drawContainer} from "./_core/utils";
import AbstractScene from './AbstractScene';
import {IRgbValue} from "./lib/interfaces";
import {eEngineState} from "./lib/enums";
const term = terminalKit.terminal;

export default class Engine{
  private autoclearCounter:number=0;
  private autorun:boolean=false;
  private bgColor:IRgbValue={r:0,g:0,b:0};
  private state: eEngineState = eEngineState.stoped;
  private needClear: boolean = true;
  private logBuffer:string[]=[];
  private scenes:AbstractScene[]=[];

  private debugCount:number=0;

  constructor() {
    this.bindEvents();
  }
  public addScene(newScene:AbstractScene):Engine{
    this.scenes.push(newScene);
    return this;
  }
  public getAutorun():boolean{
    return this.autorun;
  }
  public getScenes():AbstractScene[]{return this.scenes;}
  public getState():eEngineState{return this.state;}
  public setAutorun(newValue:boolean){this.autorun=newValue;}
  public update(data: unknown = {}) {
    const self = this;
    if (this.getState() !== eEngineState.isRunning) {
      this.autoclearCounter++;
      if (this.needClear || this.autoclearCounter>100) {
        this.autoclearCounter = 0;
        term.clear();
        drawContainer(0,0,term.width,term.height,{r:0,g:0,b:0});
      }
      this.state = eEngineState.isRunning;
      this._updateScenesData(data).then(
        () => {
          self._drawScenes(self._validateScenes());
          self.state = eEngineState.finished;
          if(this.getAutorun()){
            self.update(data);
          }
        },
        () => {
          this.logBuffer.push('error');
        }
      );
      this.needClear = false;
    }
    this.debugCount++;
  }

  private bindEvents(){
    const self = this;
    term.grabInput({});
    term.hideCursor();
    term.on('resize',(width:number,height:number)=>{
      self.needClear=true;
      self.update();
    });
    term.on('key',(keyname:string)=>{
      if(keyname==="CTRL_C"){process.exit();}
      self.scenes.map((Scene:AbstractScene)=>{
        Scene.handleKeyDown(keyname).then(self.update.bind(this));
      });
    });
  }
  private _updateScenesData(data: any): Promise<unknown> {
    return new Promise((resolve?: CallableFunction, reject?: unknown) => {
      if (resolve) {
        resolve();
      }
    });
  }
  private _validateScenes(): AbstractScene[] {
    return this.scenes;
  }
  private _drawScenes(Scenes: AbstractScene[]) {
    Scenes.map((Scene: AbstractScene) => {
      Scene.draw();
    });
  }
}
