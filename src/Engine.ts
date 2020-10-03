import * as terminalKit from 'terminal-kit';
import {eEngineState} from "./lib/enums";
import IScene from "./Scene/IScene";

const term = terminalKit.createTerminal();

export default class Engine {
    private activeSceneIndex:number = -1;
    private scenes:IScene[] = [];

    private state:eEngineState = eEngineState.unknown;

    public addScene(scene:IScene):Engine {
        scene.setTerminal(term);
        this.scenes.push(scene);
        return this;
    }

    public clearScreen() {
        term.clear();
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
        this.state = eEngineState.running;
        while(eEngineState.running === this.state || eEngineState.paused === this.state) {
            if(eEngineState.running === this.state){
                let sceneIndex = -1;
                this.scenes.map(scene=>{
                    sceneIndex++;
                    if(scene.update({
                        isActive: (this.activeSceneIndex === sceneIndex)
                    })){
                        scene.redraw();
                    }
                });
            }
        }
    }
}