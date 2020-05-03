export class PointClass{
    private _a: number;
    x: number;
    y: number;    

    constructor(x?: number, y?: number, private _z?: number){
        this.x = x;
        this.y = y;
    }

    draw(){
        var statement = 'X: ' + this.x + ', Y: ' + this.y;
        if (this._z != null) {
            console.log(statement + ', Z: ' + this._z)
        }else{
            console.log(statement)
        }        
    }

    get a() {
        return this._a;
    }

    set a(value) {
        if (value < 0)
            throw new Error('value cannot be less than 0.');

        this._a = value;
    }
}