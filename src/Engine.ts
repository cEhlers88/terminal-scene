import AbstractScene from "./AbstractScene";

enum engineState {
    stoped,
    isRunning,
    finished
}

export default class {
    private _state:engineState=engineState.stoped;

    public update(data:unknown){
        const self=this;
        if(this._state!==engineState.isRunning){
            this._state=engineState.isRunning;
            this._updateScenesData(data).then(
                ()=>{
                    self._drawScenes(self._validateScenes());
                    self._state=engineState.finished;
                },
                ()=>{

                }
            )
        }
    }

    private _updateScenesData(data:any){
        const _handle = (resolve?:unknown,reject?:unknown) => {

        };
        return new Promise(_handle)
    }
    private _validateScenes():Array<AbstractScene>{
        return [];
    }
    private _drawScenes(Scenes:Array<AbstractScene>){
        Scenes.map((Scene:AbstractScene)=>{
            Scene.draw();
        });
    }
}