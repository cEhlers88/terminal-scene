import * as terminalKit from 'terminal-kit';
import AbstractScene from './AbstractScene';
const term = terminalKit.terminal;

enum engineState {
  stoped,
  isRunning,
  finished,
}

export default class {
  private state: engineState = engineState.stoped;
  private didUpdate: boolean = false;
  private logBuffer:string[]=[];

  public update(data: unknown = {}) {
    const self = this;
    if (this.state !== engineState.isRunning) {
      if (!this.didUpdate) {
        term.clear();
      }
      this.state = engineState.isRunning;
      this._updateScenesData(data).then(
        () => {
          self._drawScenes(self._validateScenes());
          self.state = engineState.finished;
        },
        () => {
          this.logBuffer.push('error');
        }
      );
      this.didUpdate = true;
    }
  }
  private _updateScenesData(data: any): Promise<unknown> {
    return new Promise((resolve?: CallableFunction, reject?: unknown) => {
      if (resolve) {
        resolve();
      }
    });
  }
  private _validateScenes(): AbstractScene[] {
    return [];
  }
  private _drawScenes(Scenes: AbstractScene[]) {
    Scenes.map((Scene: AbstractScene) => {
      Scene.draw();
    });
  }
}
