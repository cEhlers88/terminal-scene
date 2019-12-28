import Engine from "../src/Engine";
import DebugScene from "../src/Scenes/DebugScene";
import PluginlistScene from "../src/Scenes/PluginlistScene";

const EngineInstance = new Engine();
EngineInstance.addScene(new DebugScene(1,1,1,1,));
EngineInstance.addScene(new PluginlistScene(1,1,1,1,));
EngineInstance.update();