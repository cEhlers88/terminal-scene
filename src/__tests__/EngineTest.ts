import Engine from "../Engine";
import {eEngineState} from "../lib/enums";

jest.mock('terminal-kit',()=>{
    return  {
        terminal:{
            grabInput:jest.fn(),
            hideCursor:jest.fn(),
            on:jest.fn()
        }
    }
});

let testEngine:Engine;

describe("Test Enginebasics",()=>{
    beforeEach(()=>{
        testEngine = new Engine();
    });

    test("after initialize engine state should be stoped",()=>{
        expect(testEngine.getState()).toBe(eEngineState.stoped);
    });
    test("after initialize autostart should be false",()=>{
        expect(testEngine.getAutorun()).toBe(false);
    });
    test("there should be no scenes after initialize",()=>{
        expect(testEngine.getScenes().length).toBe(0);
    });
    test("there should be no scenes after initialize",()=>{
        //expect(testEngine..length).toBe(0);
    });
});