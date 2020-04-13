import {eEngineState} from "./lib/enums";
import IScene from "./Scene/IScene";

export default class Engine {

    private scenes:IScene[] = [];

    private state:eEngineState = eEngineState.unknown;

    public addScene(scene:IScene):Engine {
        this.scenes.push(scene);
        return this;
    }

    public pause():Engine {
        this.state = eEngineState.paused;
        return this;
    }

    public resume():Engine {
        this.state = (eEngineState.paused === this.state ? eEngineState.running : this.state);
        return this;
    }

    public run():void {
        while(eEngineState.running === this.state || eEngineState.paused === this.state) {
            if(eEngineState.running === this.state){
                this.scenes.map(scene=>{
                    if(scene.update()){scene.redraw();}
                });
            }
        }
    }


}