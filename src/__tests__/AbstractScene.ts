import AbstractScene from "../AbstractScene";
import {eBorderStyle} from "../lib/enums";

class Scene extends AbstractScene{
    handleKeyDown(key: string): Promise<unknown> {
        return new Promise<unknown>(()=>{});
    }

    init(): void {
    }
}

test('Check intitialize',()=>{
    const SceneToTest = new Scene(11,12,13,14);

    expect(SceneToTest.getDrawArea().x).toBe(11);
    expect(SceneToTest.getDrawArea().y).toBe(12);
    expect(SceneToTest.getDrawArea().w).toBe(13);
    expect(SceneToTest.getDrawArea().h).toBe(14);
});
test('New Scenes should be visible after intitialize',()=>{
    const SceneToTest = new Scene(1,1,1,1);
    expect(SceneToTest.getIsVisible()).toBe(true);
});

test('Check Scene-Data is editable',()=>{
    const SceneToTest = new Scene(1,1,1,1);
    SceneToTest.setData('testdata','isOK');

    expect(SceneToTest.getData('testdata')).toBe('isOK');
});

test('Check Scene-Borderstyle is editable',()=>{
    const SceneToTest = new Scene(1,1,1,1);
    SceneToTest.setBorderStyle(eBorderStyle.none);
    expect(SceneToTest.getBorderStyle()).toBe(eBorderStyle.none);

    SceneToTest.setBorderStyle(eBorderStyle.normal);
    expect(SceneToTest.getBorderStyle()).toBe(eBorderStyle.normal);
});

test('After set visibility to false, the Scene should be unvisible ',()=>{
    const SceneToTest = new Scene(1,1,1,1);
    SceneToTest.setIsVisible(false);
    expect(SceneToTest.getIsVisible()).toBe(false);
});