"use strict";
exports.__esModule = true;
var PointClass = /** @class */ (function () {
    function PointClass(x, y, _z) {
        this._z = _z;
        this.x = x;
        this.y = y;
    }
    PointClass.prototype.draw = function () {
        var statement = 'X: ' + this.x + ', Y: ' + this.y;
        if (this._z != null) {
            console.log(statement + ', Z: ' + this._z);
        }
        else {
            console.log(statement);
        }
    };
    Object.defineProperty(PointClass.prototype, "a", {
        get: function () {
            return this._a;
        },
        set: function (value) {
            if (value < 0)
                throw new Error('value cannot be less than 0.');
            this._a = value;
        },
        enumerable: true,
        configurable: true
    });
    return PointClass;
}());
exports.PointClass = PointClass;
