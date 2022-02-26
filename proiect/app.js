const fs = require("fs");
const YAML = require("js-yaml");

try {
    const raw = fs.readFileSync("test.yml");
    const data = YAML.load(raw);

    console.log(data);

    const yaml = YAML.dump(data);
    fs.writeFileSync("test.yml", yaml, function(err, files) {
        if (err) throw err;
        console.log("saved");
    });
} catch (ex) {
    console.log(ex);
}
////clasa pentru senzori, leduri, butoane, acces, centrala, pompa
////senzorul trimite mesaj(cand trimitem pe bus un event)
////senzor, buton => brain
////brain => led, pompa
////brain => intra toate regulile

//class Base {
//    constructor(id) {
//        this.id = id;
//    }
//}

//class Senzor extends Base {
//    constructor(id) {
//        super(id);
//    }
//    trimiteMesaj = (args) => {
//        bus.emit(id, temperatura);
//    }
//}

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

//var miniBus = function(object) {
//    var getObject;
//    getObject = function(id) {
//        var t;
//        t = id.toLowerCase();
//        console.log(object);
//        return object[t] || (object[t] = []);
//    };
//    object = object || {};
//    return {
//        // bus.on(1, functie)
//        on: function(id, item) {
//            return getObject(id).push(item);
//        },
//        //bus.emit(1, args)
//        emit: function(id, args) {
//            return getObject('*').concat(getObject(id)).forEach((action) => action(id, args));
//        }
//    };
//}();
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