import Engine from "../old_src/Engine";
import DebugScene from "../old_src/Scenes/DebugScene";
import PluginlistScene from "../old_src/Scenes/PluginlistScene";

const EngineInstance = new Engine();
EngineInstance.addScene(new DebugScene(1,1,1,1,));
EngineInstance.addScene(new PluginlistScene(1,1,1,1,));
EngineInstance.update();