const fs = require("fs"); // system module allows you to work with the file system on your computer.
const YAML = require("js-yaml"); // In NodeJS, require() is a built-in function to include external modules that exist in separate files. require() statement basically reads a JavaScript file, executes it, and then proceeds to return the export object

try {
    const raw = fs.readFileSync("test.yml"); // is an inbuilt application programming interface of fs module which is used to read the file and return its content. 
    const data = YAML.load(raw); //converts a YAML document to a JSON object

    console.log(data);

    const yaml = YAML.dump(data); //Serializes data as YAML document.
    fs.writeFileSync("test.yml", yaml, function(err, files) { //rewrite the YAML file
        if (err) throw err;
        console.log("saved");
    });
} catch (ex) {
    console.log(ex);
}

var miniBus = function(object) {
    var getObject;
    getObject = function(id) {
        var t;
        t = id.toLowerCase();
        //console.log(object);
        return object[t] || (object[t] = []);
    };
    object = object || {};
    return {
        // bus.on(1, functie)
        on: function(id, item) {
            return getObject(id).push(item);
        },
        //bus.emit(1, args)
        emit: function(id, args) {
            return getObject('*').concat(getObject(id)).forEach((action) => action(id, args));
        }
    };
}();

class Device {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    get status() { //getter methods are used to access the properties of an object.
        console.log(`From Base class: ${this.id}: ${this.name}`);
    }
}

class Senzor extends Device {
    constructor(name, id) {
        super(name, id);
        setInterval(args => {
            miniBus.emit(this.id.toString(), Math.random() * 40 | 0)
        }, 1000);
        //    trimiteMesaj = (args) => {
        //        bus.emit(id, temperatura);
        //    }
    }
}

class Brain extends Device {
    constructor(name, id) {
        super(name, id);
        this.temp = 0;
        miniBus.on('3', (temp) => { this.temp = temp })
    }
    get status() {
        console.log(`*** ${this.id} ${this.name} --- [temp: ${this.temp}]`)
    }
}
let device_config = [
    { id: 0, type: Brain, name: "Brain" },
    { id: 2, type: Senzor, name: "Senzor" }
]

let devices = [];

device_config.forEach(dvc => {
    devices.push(new dvc.type(dvc.id, dvc.name));
});

function debug() {
    devices.forEach(device => {
        device.status
    })
}
const readline = require('readline'); // The readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time.
const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); // Creates a readline Interface instance. Accepts an "options" Object that takes the following values: input - the readable stream to listen to (Required); output - the writable stream to write readline data to (Optional).
// The process.stdin property is an inbuilt application programming interface of the process module which listens for the user input. The stdin property of the process object is a Readable Stream.
// The process.stdout property is an inbuilt application programming interface of the process module which is used to send data out of our program.
rl.setPrompt('s | q >'); // method sets the prompt that will be written to output whenever
rl.prompt(); // writes the InterfaceConstructor instances configured prompt to a new line in output in order to provide a user with a new location at which to provide input.
rl.on('line', function(line) { // The 'line' event is emitted whenever the input stream receives an end-of-line input (\n, \r, or \r\n). This usually occurs when the user presses Enter or Return.
    switch (line.trim()) {
        case 's':
            debug();
            break;
        case 'q':
            rl.close(); //closes the `readline.Interface` instance and relinquishes control over the `input` and `output` streams. When called, the `'close'` event will be emitted.
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

////clasa pentru senzori, leduri, butoane, acces, centrala, pompa
////senzorul trimite mesaj(cand trimitem pe bus un event)
////senzor, buton => brain
////brain => led, pompa
////brain => intra toate regulile





//class Led extends Base {
//    constructor(id) {
//        super(id);
//        bus.on(id, this.aprindeBecul);
//    }
//    aprindeBecul = (args) => {
//        if (args.intensitate == 'off' && args.culoare == 'none') {
//            args.intensitate = 100;
//            args.culoare = 'alb';
//        }
//    }
//}
//class Buton extends Base {
//    constructor(id) {
//        super(id);
//    }
//    apasaButon = (args) => {
//        bus.emit(id);
//    }

//}

//class Acces extends Base {
//    constructor(id) {
//        super(id);
//    }
//    modificaAcces = (args) => {
//        args.stareAcces = 'on';
//    }
//}
//class Centrala extends Base {
//    constructor(id) {
//        super(id);
//    }
//    pornesteCentrala = (args) => {
//        args.stareCentrala = 'on';
//    }
//}
//class Pompa extends Base {
//    constructor(id) {
//        super(id);
//    }
//    changeStatePompa = (args) => {
//        args.starePompa = 'on';
//    }
//}
// * => pun toate functiile(fucntion array)
//miniBus.on('*', (arg) => console.log('first', arg)); // {'*': console.log}
//miniBus.on('*', (arg) => console.log('second', arg)); // {'*': console.log}
////miniBus.on('*', console.log);
//miniBus.emit('2', 3); // {}
//miniBus.emit('3', 5);
//miniBus.emit('*', 2); // {'*': 2 , '2': 3}



//class Brain {
//    constructor() {
//        miniBus.on('*', this.checkMessages);
//    }
//    checkMessages = (id, args) => {
//        objectMessages[id];
//    }
//}
//let brain = new Brain();
//miniBus.emit('2', 3);


//let objectMessages = {
//    '0': {
//        'conditie': 'cazurile'
//    }
//    '0': 'cazuri',
//    => set pe mesaje '0': 'reguli de stari'
//};
//let stare = {
//    desiredTemperature: 20
//}
//103:
//    desiredTemperature += 1
//8:
//    temperatura > desiredTemperature
//Centrala, pompa = off
//104:
//    desiredTemperature -= 1;