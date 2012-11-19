var Size = (function () {
    function Size(width, height) {
        this.Width = width;
        if(height) {
            this.Height = height;
        } else {
            this.Height = width;
        }
    }
    Size.prototype.Half = function () {
        return new Size(0.5 * this.Width, 0.5 * this.Height);
    };
    return Size;
})();
//@ sourceMappingURL=Size.js.map
