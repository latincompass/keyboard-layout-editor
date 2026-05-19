var color = {
    hexToRgb: function(hex) {
        var str = hex.replace("#", "");
        var r = parseInt(str.substring(0, 2), 16);
        var g = parseInt(str.substring(2, 4), 16);
        var b = parseInt(str.substring(4, 6), 16);
        return { r: r, g: g, b: b };
    },

    rgbToHex: function(rgb) {
        var r = rgb.r.toString(16);
        var g = rgb.g.toString(16);
        var b = rgb.b.toString(16);
        return "#" +
            (r.length === 1 ? "0" + r : r) +
            (g.length === 1 ? "0" + g : g) +
            (b.length === 1 ? "0" + b : b);
    }
};