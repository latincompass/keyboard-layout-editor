var Color=function(){function e(e){if(!e)return{r:0,g:0,b:0,a:1};if("string"==typeof e){var t=e.match(/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/);if(t)return{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16),a:1};t=e.match(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/);if(t)return{r:parseInt(t[1]+t[1],16),g:parseInt(t[2]+t[2],16),b:parseInt(t[3]+t[3],16),a:1};t=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);if(t)return{r:parseInt(t[1]),g:parseInt(t[2]),b:parseInt(t[3]),a:t[4]?parseFloat(t[4]):1}}return e}function t(e){var t=Math.round(e.r),n=Math.round(e.g),r=Math.round(e.b);return e.a<1?"rgba("+t+","+n+","+r+","+e.a+")":"#"+(1<<24|t<<16|n<<8|r).toString(16).slice(1)}function n(e,t,n){return e+(t-e)*n}function r(e,t,n){var r=n.a*e.a,i=1-n.a*e.a;return{r:(n.r*e.a*t+r*e.r)/i,g:(n.g*e.a*t+r*e.g)/i,b:(n.b*e.a*t+r*e.b)/i,a:n.a*t+e.a*(1-t)}}function i(e,t){return{r:n(e.r,t.r,0.5),g:n(e.g,t.g,0.5),b:n(e.b,t.b,0.5),a:n(e.a,t.a,0.5)}}return{parse:e,toString:t,blend:r,mix:i}}();

function rgb2lab(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    var x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047,
        y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0,
        z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = x > 0.008856 ? Math.pow(x, 1/3) : 7.787 * x + 16/116;
    y = y > 0.008856 ? Math.pow(y, 1/3) : 7.787 * y + 16/116;
    z = z > 0.008856 ? Math.pow(z, 1/3) : 7.787 * z + 16/116;
    return { l: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z) };
}

var $color={
    sRGB8:function(e,t,n){
        var hexStr = "#" + ((1 << 24 | e << 16 | t << 8 | n).toString(16).slice(1));
        return {
            r: e, 
            g: t, 
            b: n, 
            hex:function(){return hexStr},
            Lab: function() { return rgb2lab(e, t, n); }
        }
    },
    hex:function(colorStr){
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorStr);
        if(result){
            var r = parseInt(result[1], 16), g = parseInt(result[2], 16), b = parseInt(result[3], 16);
            return $color.sRGB8(r, g, b);
        }
        return $color.sRGB8(0, 0, 0);
    }
};

angular.module("colorpicker.module",["ng"]).directive("colorpicker",["$parse",function(e){return{restrict:"A",link:function(t,n,r){var i=e(r.colorpicker);t.$watch(r.colorpicker,function(e){n.css("background-color",e)}),n.bind("click",function(){var o=angular.element("<input type='color' style='position:absolute;opacity:0;pointer-events:none;'>");angular.element("body").append(o);o[0].addEventListener("input",function(e){var n=e.target.value;i.assign(t,n),n.css("background-color",n)}),o[0].click()})}}}]);