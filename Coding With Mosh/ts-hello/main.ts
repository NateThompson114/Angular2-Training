import { PointClass } from './point';
import { LikeComponent } from './like.component'

function doSomething() {
    for(let i = 0; i < 5; i++ ){
        console.log(i);
    }
    // console.log(i); //Would not work let keeps the variable inside the method that initializes it
}

doSomething();

let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number[] = [1, 2, 3];
let f: any[] = [1, true, 'a', false];

//enums
const ColorRed = 0;
const ColorGreen = 1;
const ColorBlue = 2;

enum Color { Red = 0, Green = 1, Blue = 2};
let backgroundColor = Color.Red;

//Type Assertions
let message;
message = 'abc';
let endsWithC = (<string>message).endsWith('c');
let alternativeWay = (message as string).endsWith('c');

//Arrow functions (lambda)
let log = function(message) {
    console.log(message);
}

let doLog = (message) => console.log(message);

let doLineLog = (message) => {
    message = message as string;
    console.log(message);
}

//interfaces
// let drawPoint = (x, t, z) => {
//     //...
// }
interface Point{
    x: number,
    y: number
}

let drawPoint = (point: Point) => {
    // ...
}

drawPoint({
    x: 1,
    y: 2
})

//Classes
// Moved class externally and made it a module

let pointing = new PointClass();
pointing.x = 1;
pointing.y = 2;
// pointing.z = 3
pointing.draw()

let constructorPointing = new PointClass(3, 4, 5)
constructorPointing.draw();

constructorPointing.a = 10;
console.log('A: ' + constructorPointing.a);

let likeComponent = new LikeComponent(10, true);
likeComponent.onClick();
console.log(`likesCount: ${likeComponent.likesCount}, is selected ${likeComponent.isSelected}`);

likeComponent.onClick();
console.log(`likesCount: ${likeComponent.likesCount}, is selected ${likeComponent.isSelected}`);
