// Parse YAML file
const fs = require("fs"); // system module allows you to work with the file system on your computer.
const YAML = require("js-yaml"); // In NodeJS, require() is a built-in function to include external modules that exist in separate files. require() statement basically reads a JavaScript file, executes it, and then proceeds to return the export object
const raw = fs.readFileSync("data.yml"); // is an inbuilt application programming interface of fs module which is used to read the file and return its content. 
const file = YAML.load(raw); //converts a YAML document to a JSON object
try {
    const yaml = YAML.dump(file); //Serializes data as YAML document.
    fs.writeFileSync("data.yml", yaml, function(err, files) { //rewrite the YAML file
        if (err) throw err;
        console.log("saved");
    });
} catch (ex) {
    console.log(ex);
}
//Minibus
// stocheaza functii pentru un id oarecare si le ruleaza(pe emit)
var miniBus = function(object) {
    var getArray;
    object = object || {};

    getArray = function(id) {
        return object[id.toLowerCase()] || (object[id.toLowerCase()] = []);
    };

    return {
        on: function(id, item) {
            return getArray(id).push(item);
        },
        emit: function(id, args) {
            return getArray('*').concat(getArray(id)).forEach((action) => action(args));
        }
    };
}();

// Classes
class Device {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    };
    get details() { //getter methods are used to access the properties of an object.
        console.log(`From Base class: ${this.id}: ${this.name}`);
    };
};
class Brain extends Device {
    constructor(name, id) {
        super(name, id);
        file["vars"].split(" ").forEach(init => eval(init));

        this.time = { hour: new Date().getHours(), date: new Date().getDay() };

        miniBus.on('*', (data) => console.log("Message was logged: ", data))

        miniBus.on('0', (data) => { // parseButton
            const actions = file[data.id];
            for (const [k, v] of Object.entries(actions)) {
                if (eval(k) && v) {
                    miniBus.emit(k, v);
                };
            };
        });

        miniBus.on('00', (data) => { // parseSensors (conditions)
            const actions = file[data.id];
            for (const [condition, _] of Object.entries(actions)) {
                if (eval(condition) && _) {
                    for (const [k, v] of Object.entries(_)) {
                        miniBus.emit(k, v);
                    };
                };
            };
        });

        setInterval(_ => {
            const date = new Date();
            this.time.hour = date.getHours();
            this.time.date = date.getDay();
            miniBus.emit('00', { id: '0' });
        }, 3600000);
    };
};
class Sensor extends Device {
    constructor(name, id) {
        super(name, id);

        setInterval(_ => {
            miniBus.emit('00', { id: this.id.toString(), val: Math.random() * 40 | 0 }) // Fac verificari automate si setam valoarea (ex: pornesc radiatoare daca temp < tempDorita)
        }, 10000);
    };
};

class Led extends Device {
    constructor(name, id) {
        super(name, id);
        this.intensitate = 0;
        this.culoare = "off";

        miniBus.on(this.id.toString(), ({ intensitate, culoare }) => {
            this.intensitate = intensitate;
            this.culoare = culoare;
        });
    };
};

class Acces extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareAcces = 'off';

        miniBus.on(this.id.toString(), ({ stareAcces }) => this.stareAcces = stareAcces);
    };
};

class Centrala extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareCentrala = "off";

        miniBus.on(this.id.toString(), ({ stareCentrala }) => this.stareCentrala = stareCentrala);
    };
};

class Pompa extends Device {
    constructor(name, id) {
        super(name, id);
        this.starePompa = "off";
        miniBus.on(this.id.toString(), (stare) => this.starePompa = stare);
    };
};

class Radiator extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareRadiator = "off";
        miniBus.on(this.id.toString(), (stare) => this.stareRadiator = stare);
    };
};

class Videoproiector extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareVideoproiector = "off";
        miniBus.on(this.id.toString(), (stare) => this.stareVideoproiector = stare);
    };
};

let device_config = [
    { id: 0, type: Brain, name: "Brain" },
    { id: 1, type: Led, name: "Led - Bazin" },
    { id: 2, type: Acces, name: "Acces" },
    { id: 3, type: Centrala, name: "Centrala" },
    { id: 4, type: Pompa, name: "Pompa" },
    { id: 5, type: Radiator, name: "Radiator" },
    { id: 6, type: Led, name: "Led - Ambientala" },
    { id: 13, type: Videoproiector, name: "Videoproiector" },
    { id: 200, type: Sensor, name: "Senzor temperatura apa bazin" },
    { id: 201, type: Sensor, name: "Senzor detectie bazin" },
    { id: 202, type: Sensor, name: "Senzor temperatura ambientala" },
    { id: 400, type: Sensor, name: "Senzor temperatura ambientala clasa" },
]

let devices = [];

device_config.forEach(dvc => {
    devices.push(new dvc.type(dvc.id, dvc.name));
});

const readline = require('readline'); // The readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time.
const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); // Creates a readline Interface instance. Accepts an "options" Object that takes the following values: input - the readable stream to listen to (Required); output - the writable stream to write readline data to (Optional).
// The process.stdin property is an inbuilt application programming interface of the process module which listens for the user input. The stdin property of the process object is a Readable Stream.
// The process.stdout property is an inbuilt application programming interface of the process module which is used to send data out of our program.
rl.setPrompt('s| plb | olb | tbu | tbd | tau | tad | pla | ola | plac | olac | tacu | tacd | pv | ov | q  >'); // method sets the prompt that will be written to output whenever
rl.prompt(); // writes the InterfaceConstructor instances configured prompt to a new line in output in order to provide a user with a new location at which to provide input.
rl.on('line', function(line) { // The 'line' event is emitted whenever the input stream receives an end-of-line input (\n, \r, or \r\n). This usually occurs when the user presses Enter or Return.
    switch (line.trim()) {
        case 's':
            debug();
            break;
        case 'plb':
            miniBus.emit('0', { id: 101 });
            break;
        case 'olb':
            miniBus.emit('0', { id: 102 });
            break;
        case 'tbu':
            miniBus.emit('0', { id: 103 });
            break;
        case 'tbd':
            miniBus.emit('0', { id: 104 });
            break;
        case 'tau':
            miniBus.emit('0', { id: 107 });
            break;
        case 'tad':
            miniBus.emit('0', { id: 108 });
            break;
        case 'pla':
            miniBus.emit('0', { id: 109 });
            break;
        case 'ola':
            miniBus.emit('0', { id: 110 });
            break;
        case 'plac':
            miniBus.emit('0', { id: 301 });
            break;
        case 'olac':
            miniBus.emit('0', { id: 302 });
            break;
        case 'tacu':
            miniBus.emit('0', { id: 303 });
            break;
        case 'tacd':
            miniBus.emit('0', { id: 304 });
            break;
        case 'pv':
            miniBus.emit('0', { id: 305 });
            break;
        case 'ov':
            miniBus.emit('0', { id: 306 });
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
miniBus.emit('00', { id: '0' }); // Sets devices according to the current time (at which the program was started)