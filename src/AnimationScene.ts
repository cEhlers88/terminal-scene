import AbstractScene from "./AbstractScene";

export default abstract class extends AbstractScene {
    private interval:number;
    private intervalHandle:any;

    constructor(x: number, y: number, w: number, h: number, updateInterval:number=300) {
        super(x,y,w,h);

        this.interval = updateInterval;
        this.intervalHandle = setInterval(this.animate.bind(this),this.interval);
    }

    public abstract animate():void;
}