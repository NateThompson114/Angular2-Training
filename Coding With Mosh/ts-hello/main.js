"use strict";
exports.__esModule = true;
var point_1 = require("./point");
var like_component_1 = require("./like.component");
function doSomething() {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    // console.log(i); //Would not work let keeps the variable inside the method that initializes it
}
doSomething();
var a;
var b;
var c;
var d;
var e = [1, 2, 3];
var f = [1, true, 'a', false];
//enums
var ColorRed = 0;
var ColorGreen = 1;
var ColorBlue = 2;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var backgroundColor = Color.Red;
//Type Assertions
var message;
message = 'abc';
var endsWithC = message.endsWith('c');
var alternativeWay = message.endsWith('c');
//Arrow functions (lambda)
var log = function (message) {
    console.log(message);
};
var doLog = function (message) { return console.log(message); };
var doLineLog = function (message) {
    message = message;
    console.log(message);
};
var drawPoint = function (point) {
    // ...
};
drawPoint({
    x: 1,
    y: 2
});
//Classes
// Moved class externally and made it a module
var pointing = new point_1.PointClass();
pointing.x = 1;
pointing.y = 2;
// pointing.z = 3
pointing.draw();
var constructorPointing = new point_1.PointClass(3, 4, 5);
constructorPointing.draw();
constructorPointing.a = 10;
console.log('A: ' + constructorPointing.a);
var likeComponent = new like_component_1.LikeComponent(10, true);
likeComponent.onClick();
console.log("likesCount: " + likeComponent.likesCount + ", is selected " + likeComponent.isSelected);
likeComponent.onClick();
console.log("likesCount: " + likeComponent.likesCount + ", is selected " + likeComponent.isSelected);
