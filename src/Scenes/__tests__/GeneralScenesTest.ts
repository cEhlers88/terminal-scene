import AppInfoScene from "../AppInfoScene";
import DebugScene from "../DebugScene";
import AbstractScene from "../../AbstractScene";
import DirectoutputScene from "../DirectoutputScene";
import MenuScene from "../MenuScene";
import {eBorderStyle} from "../../lib/enums";
import PluginlistScene from "../PluginlistScene";
import PluginsettingsScene from "../PluginsettingsScene";
import {IRgbValue} from "../../lib/interfaces";

const scenesToTest = [
    AppInfoScene,
    DebugScene,
    DirectoutputScene,
    MenuScene,
    PluginlistScene,
    PluginsettingsScene
];

jest.mock('terminal-kit',()=>{
    return  {
        terminal:{
            grabInput:jest.fn(),
            hideCursor:jest.fn(),
            on:jest.fn()
        }
    }
});
scenesToTest.map(scene=>{
    const tmpInstance = new scene(0,0,0,0);

    describe("Test "+scene.name+" basics",()=>{
        test(`Classname of ${scene.name} and value of tmpInstance.name should be the same`, () => {
            expect(scene.name).toBe(tmpInstance.name);
        });

        test("Create an instance of " + scene.name, () => {
            expect((tmpInstance instanceof AbstractScene)).toBe(true);
        });

        test("Test changing borderStyle for "+scene.name,()=>{
            tmpInstance.setBorderStyle(eBorderStyle.none);
            expect(tmpInstance.getBorderStyle()).toBe(eBorderStyle.none);
            tmpInstance.setBorderStyle(eBorderStyle.normal);
            expect(tmpInstance.getBorderStyle()).toBe(eBorderStyle.normal);
        });

        test(`Test changing color for ${scene.name}`,()=>{
            const newColor:IRgbValue = {r:0,g:100,b:125};
            tmpInstance.setBackColor(newColor);
            expect(tmpInstance.getBackColor()).toEqual(newColor);
        });

        test(`Test set/get data for ${scene.name}`,()=>{
            const newData = {foo:'bar'};
            tmpInstance.setData('dummyTest',newData);
            expect(tmpInstance.getData('dummyTest')).toEqual(newData);
        });
    });
});

[
    {x:0,y:0,w:0,h:0},
    {x:100,y:0,w:0,h:0}, {x:0,y:100,w:0,h:0}, {x:0,y:0,w:100,h:0}, {x:0,y:0,w:0,h:100},
    {x:-100,y:0,w:0,h:0}, {x:0,y:-100,w:0,h:0}, {x:0,y:0,w:-100,h:0}, {x:0,y:0,w:0,h:-100},
    {x:100,y:100,w:100,h:100}, {x:-100,y:-100,w:-100,h:-100}
].map(dimension=>{
    describe("Dimensiontest with "+JSON.stringify(dimension),()=>{
        scenesToTest.map(scene=>{
            let tmpObj = new scene(dimension.x,dimension.y,dimension.w,dimension.h);
            tmpObj.setPadding({top:0,left:0,right:0,bottom:0});
            const padding = tmpObj.getPadding();
            test(`After set padding of ${scene.name}to 0, padding should be 0`,()=>{
                expect(padding.left).toBe(0);
                expect(padding.right).toBe(0);
                expect(padding.top).toBe(0);
                expect(padding.bottom).toBe(0);
            });
            [
                eBorderStyle.none,
                eBorderStyle.normal
            ].map(borderStyle=>{
                tmpObj.setBorderStyle(borderStyle);
                [
                    {key:'x',correct:dimension.x + (borderStyle===eBorderStyle.none?0:padding.left)},
                    {key:'y',correct:dimension.y + (borderStyle===eBorderStyle.none?0:padding.top)},
                    {key:'w',correct:dimension.w - (borderStyle===eBorderStyle.none?0:padding.left+padding.right)},
                    {key:'h',correct:dimension.h - (borderStyle===eBorderStyle.none?0:padding.top+padding.bottom)}
                ].map((drawAreaCheck)=>{
                    const testName = `After create new ${scene.name} and set borderStyle to ${(borderStyle===eBorderStyle.none?'none':'normal')}, ${scene.name}.getDrawArea().${drawAreaCheck.key} should be ${drawAreaCheck.correct}`
                    test(testName,()=>{
                        // @ts-ignore
                        expect(tmpObj.getDimension()[drawAreaCheck.key]).toBe(drawAreaCheck.correct);
                    });
                });
            });
        });
    });
});