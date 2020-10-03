import * as terminalKit from "terminal-kit";
import ISceneInfo from "./ISceneInfo";

export default interface IScene {
    getName():string,
    setTerminal(terminal:terminalKit.Terminal):IScene,
    redraw():void,
    update(sceneInfo:ISceneInfo):boolean
}