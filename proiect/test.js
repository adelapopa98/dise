var miniBus = function(n) {
    var o;
    o = function(i) {
        var t;
        t = i.toLowerCase();
        return n[t] || (n[t] = []);
    };
    n = n || {};
    return {
        on: function(t, n) {
            return o(t).push(n);
        },
        off: function(t, n) {
            var e, i;
            e = o(t);
            i = e.indexOf(n);
            return ~i && e.splice(i, 1);
        },
        emit: function(t, n) {
            return o('*').concat(o(t)).forEach(function(t) {
                return t(n);
            });
        }
    };
}();

46 m 31 s