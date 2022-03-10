// --- bus setup
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

// --- class setup
class Device {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
    get status() { console.log(`*** ${this.id} ${this.name}`) }
}

class Brain extends Device {
    constructor(name, id) {
        super(name, id);
        this.temp = 0
        miniBus.on('3', (temp) => { this.temp = temp })
    }
    get status() { console.log(`*** ${this.id} ${this.name} - [temp: ${this.temp}]`) }
}

class Sensor extends Device {
    constructor(name, id) {
        super(name, id);
        setInterval(_ => {
            miniBus.emit(this.id.toString(), Math.random() * 40 | 0)
        }, 1000)
    }
}

class Light extends Device {
    constructor(name, id) {
        super(name, id);
        this.light = "off"
        miniBus.on(this.id.toString(), data => {
            this.light == "off" ? this.light = "on" : this.light = "off"
        })
    }
    get status() { console.log(`*** ${this.id} ${this.name} - ${this.light}`) }
}

// --- device setup
let devices_config = [
    { id: 0, type: Brain, name: "Brain" },
    { id: 1, type: Light, name: 'Living Room' },
    { id: 2, type: Light, name: 'Bedroom' },
    { id: 3, type: Sensor, name: 'Kitchen temp' },
]

let devices = []

devices_config.forEach(device => {
    devices.push(new device.type(device.name, device.id))
})

function _debug() { devices.forEach(device => { device.status }) }

// --- repl
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.setPrompt('s | l | q > ');
rl.prompt();
rl.on('line', function(line) {
    switch (line.trim()) {
        case 's':
            _debug();
            break;
        case 'l':
            miniBus.emit("1");
            break
        case 'q':
            rl.close();
            break;
        default:
            console.log('invalid command');
            break;
    }
    rl.prompt();
}).on('close', function() {
    console.log('exit');
    process.exit(0);
});
// cod
let temp = { bazin: 18 }
let bus = { emit: function(m) { console.log(`trimis mesaj ${m}`) } }

let rules = {
    "0": {
        "temp.bazin >= 20": [2, 3],
        "temp.bazin < 20": [4, 5]
    }
}

const parseMessage = function(msg) {
    let actions = rules[msg.id]
    for (const [k, v] of Object.entries(actions)) {
        if (eval(k)) {
            v.forEach(m => bus.emit(m))
        }
    }
}

parseMessage({ id: 0 })

/** exemplu: senzorul de tip ceas('0') emite pe id-ul lui ora si ziua, iar in functie de conditia respective
 se apeleaza functionalitatea pentru id-urile specificate in interiorul conditiei indeplinite  
 Exemplu:
miniBus.on('0', functieSetataInBrain)
miniBus.emit('0', functieSetataInBrain)
 */