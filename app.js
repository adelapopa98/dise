// Parse YAML file
const { throws } = require("assert");
const fs = require("fs"); // system module allows you to work with the file system on your computer.
const YAML = require("js-yaml"); // In NodeJS, require() is a built-in function to include external modules that exist in separate files. require() statement basically reads a JavaScript file, executes it, and then proceeds to return the export object
const raw = fs.readFileSync("test.yml"); // is an inbuilt application programming interface of fs module which is used to read the file and return its content. 
const file = YAML.load(raw); //converts a YAML document to a JSON object
try {
    const yaml = YAML.dump(file); //Serializes data as YAML document.
    fs.writeFileSync("test.yml", yaml, function(err, files) { //rewrite the YAML file
        if (err) throw err;
        console.log("saved");
    });
} catch (ex) {
    console.log(ex);
}
//Minibus
// stocheaza functii pentru un id oarecare si le ruleaza(pe emit le ruleaza)
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
    }
    get details() { //getter methods are used to access the properties of an object.
        //console.log(`From Base class: ${this.id}: ${this.name}`);
    }
}
// brain primeste toate mesajele si trimite in functie de reguli
class Brain extends Device {
    constructor(name, id) {
        super(name, id);

        this.temperaturaAmbientala;
        this.temperaturaBazin;
        this.temperaturaAmbientalaClasa;
        this.TAmbientDorita = 27;
        this.TAmbientClasaDorita = 28;
        this.TBazinDorita = 33;
        this.detectie = false;

        this.time = { hour: new Date().getHours(), date: new Date().getDay() };

        miniBus.on('*', (data) => console.log("Message was logged: ", data))

        miniBus.on('0', (data) => { // parseMessage
            const actions = file[data.id];
            for (const [k, v] of Object.entries(actions)) {
                if (eval(k)) {
                    miniBus.emit(k, v);
                };
            };
        });

        miniBus.on('00', (data) => { // parseConditions
            const actions = file[data.id];
            for (const [condition, _] of Object.entries(actions)) {
                if (eval(condition)) {
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
            }, 3600000)
            // buton temperatura bazin UP
        miniBus.on('103', () => {
            this.TBazinDorita++;
            console.log(this.TBazinDorita);
        });
        // buton temperatura bazin DOWN
        miniBus.on('104', () => {
            this.TBazinDorita--;
            console.log(this.TBazinDorita)
        });
        // buton temperatura ambientala UP
        miniBus.on('107', () => {
            this.TAmbientDorita++;
            console.log(this.TAmbientDorita);
        });
        // buton temperatura ambientala DOWN
        miniBus.on('108', () => {
            this.TAmbientDorita--;
            console.log(this.TAmbientDorita)
        });
        // buton temperatura ambientala UP - CLASA
        miniBus.on('303', () => {
            this.TAmbientClasaDorita++;
            console.log(this.TAmbientClasaDorita);
        });
        // buton temperatura ambientala DOWN - CLASA
        miniBus.on('304', () => {
            this.TAmbientClasaDorita--;
            console.log(this.TAmbientClasaDorita)
        });
        // senzor temperatura apa bazin
        miniBus.on('200', (temp) => {
            console.log("temperatura bazin: ", temp, "temperatura dorita: ", this.TBazinDorita)
            this.temperaturaBazin = temp;
            miniBus.emit('00', ({ id: '200' }));
        });
        // senzor detectie oameni in incapare
        miniBus.on('201', (detectie) => this.detectie = detectie);
        // senzor temperatura ambientala
        miniBus.on('202', (temp) => {
            console.log("temperatura ambientala: ", temp, "temperatura dorita: ", this.TAmbientDorita)
            this.temperaturaAmbientala = temp;
            miniBus.emit('00', ({ id: '202' }));
        });
        // senzor temperatura ambientala - pentru SALA DE CLASA
        miniBus.on('400', (temp) => {
            console.log("temperatura ambientala sala de clasa: ", temp, "temperatura dorita: ", this.TAmbientClasaDorita)
            this.temperaturaAmbientalaClasa = temp;
            //miniBus.emit('0', ({ id: '400' }));
        });
    };
};

// senzorii emit date la un interval de timp
//ex: trimite catre bus pe emit temperatura curent la un interval de timp
class Sensor extends Device {
    constructor(name, id) {
        super(name, id);

        setInterval(_ => {
            miniBus.emit(this.id.toString(), Math.random() * 40 | 0)
        }, 10000)
    }
}

class Led extends Device {
    constructor(name, id) {
        super(name, id);
        this.intensitate = 0;
        this.culoare = "off";

        miniBus.on(this.id.toString(), ({ intensitate, culoare }) => {
            // console.log('before emit ', this);
            this.intensitate = intensitate;
            this.culoare = culoare;
            // console.log('after emit:', this);
        });
    };
};

class Acces extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareAcces = 'off';

        miniBus.on(this.id.toString(), ({ stareAcces }) => {
            // console.log(`Before emit: `, this);
            this.stareAcces = stareAcces;
            // console.log(`After emit: `, this);
        })
    }
}
class Centrala extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareCentrala = "off";

        miniBus.on(this.id.toString(), ({ stareCentrala }) => {
            // console.log('Before emit: ', this);
            this.stareCentrala = stareCentrala;
            // console.log('After emit ', this);
        });
    }
}
class Buton extends Device {
    constructor(name, id) {
        super(name, id);
    }
    apasaButon = () => {
        miniBus.emit(this.id.toString());
    }
}

class Pompa extends Device {
    constructor(name, id) {
        super(name, id);
        this.starePompa = "off";
        miniBus.on(this.id.toString(), (stare) => {
            // console.log('Before emit: ', this);
            this.starePompa = stare;
            // console.log('After emit: ', this);
        });
    };
};

class Radiator extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareRadiator = "off";
        miniBus.on(this.id.toString(), (stare) => {
            // console.log('Before emit radiator: ', this);
            this.stareRadiator = stare;
            // console.log('After emit radiator: ', this);
        });
    };
};
class Videoproiector extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareVideoproiector = "off";
        miniBus.on(this.id.toString(), (stare) => {
            // console.log('Before emit radiator: ', this);
            this.stareVideoproiector = stare;
            // console.log('After emit radiator: ', this);
        });
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
    { id: 100, type: Buton, name: "Buton" },
    { id: 200, type: Sensor, name: "Senzor temperatura apa bazin" },
    { id: 201, type: Sensor, name: "Senzor detectie bazin" },
    { id: 202, type: Sensor, name: "Senzor temperatura ambientala" },
    { id: 400, type: Sensor, name: "Senzor temperatura ambientala clasa" },
]

let devices = [];

device_config.forEach(dvc => {
    devices.push(new dvc.type(dvc.id, dvc.name));
});

function debug() {
    devices.forEach(device => {
        //console.log(device.details);
    });
}

const readline = require('readline'); // The readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time.
const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); // Creates a readline Interface instance. Accepts an "options" Object that takes the following values: input - the readable stream to listen to (Required); output - the writable stream to write readline data to (Optional).
// The process.stdin property is an inbuilt application programming interface of the process module which listens for the user input. The stdin property of the process object is a Readable Stream.
// The process.stdout property is an inbuilt application programming interface of the process module which is used to send data out of our program.
rl.setPrompt('s | tbUp | tbDown | tAmbUp | tAmbDown| tClasaUp | tClasaDown| pLumina | oLumina | q  >'); // method sets the prompt that will be written to output whenever
rl.prompt(); // writes the InterfaceConstructor instances configured prompt to a new line in output in order to provide a user with a new location at which to provide input.
rl.on('line', function(line) { // The 'line' event is emitted whenever the input stream receives an end-of-line input (\n, \r, or \r\n). This usually occurs when the user presses Enter or Return.
    switch (line.trim()) {
        case 's':
            debug();
            break;
        case 'tbUp':
            miniBus.emit('103', "Temperatura dorita a bazinului a crescut");
            break;
        case 'tbDown':
            miniBus.emit('104', "Temperatura dorita a bazinului a scazut");
            break;
        case 'tAmbUp':
            miniBus.emit('107', "Temperatura dorita ambientala a crescut");
            break;
        case 'tAmbDown':
            miniBus.emit('108', "Temperatura dorita ambientala a scazut");
            break;
        case 'tClasaUp':
            miniBus.emit('303', "Temperatura dorita ambiental CLASA a a crescut");
            break;
        case 'tClasaDown':
            miniBus.emit('304', "Temperatura dorita ambientala CLASA a scazut");
            break;
        case 'pLumina':
            miniBus.emit('0', { id: '109' });
            break;
        case 'oLumina':
            miniBus.emit('0', { id: '110' });
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