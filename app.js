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
class Device {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    };
    get details() {
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
        this.culoare = "black";

        miniBus.on(this.id.toString(), ({ intensitate, culoare }) => {
            this.intensitate = intensitate;
            this.culoare = culoare;
            document.getElementById(`set${this.id}`).innerText = `${this.intensitate} ${this.culoare}`;
            document.getElementById(`led-${this.id}`).style.backgroundColor = this.culoare;
        });

        let htmlLed = document.createElement('div');
        htmlLed.setAttribute('class', 'container-lumina-ambientala-clasa');
        htmlLed.setAttribute('id', this.id);
        htmlLed.innerHTML = `
            <h2 class="text-light">${name}</h2>
            <div id="led-${this.id}"></div>
            <div class="container-buttons">
            <button id="${this.id}-on" class="btn btn-primary">Porneste ${name}</button>
            <button id="${this.id}-off" class="btn btn-danger">Opreste ${name}</button>
            <p class="text-white" id="set${this.id}">${this.intensitate} ${this.culoare}</p>
            </div>`;
        document.getElementById('container-lumini').append(htmlLed);
        document.getElementById(`${this.id}-on`).addEventListener('click', () => {
            miniBus.emit('0', { id: `${this.id}-on` })
        });
        document.getElementById(`${this.id}-off`).addEventListener('click', () => {
            miniBus.emit('0', { id: `${this.id}-off` })
        });
    };
};

class Acces extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareAcces = "respins";
        miniBus.on(this.id.toString(), ({ stareAcces }) => {
            this.stareAcces = stareAcces;
            document.getElementById('input-acces').innerText = `${this.stareAcces}`;
        });

        let htmlAcces = document.createElement('div');
        htmlAcces.setAttribute('class', 'container-acces-bazin');
        htmlAcces.setAttribute('id', this.id);
        htmlAcces.innerHTML = `
        <h2 class="text-light">${name}</h2>
        <p id="input-acces" class="text-white">${this.stareAcces}</p>
        <div class="container-buttons">
            <button id="2-on" class="btn btn-success">Permite ${name}</button>
            <button id="2-off" class="btn btn-danger">Respinge ${name}</button>
        </div>`;
        document.getElementById('container-acces').append(htmlAcces);
        document.getElementById(`${this.id}-on`).addEventListener('click', () => {
            miniBus.emit('0', { id: `${this.id}-on` })
        });
        document.getElementById(`${this.id}-off`).addEventListener('click', () => {
            miniBus.emit('0', { id: `${this.id}-off` })
        });
    };
};

class Centrala extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareCentrala = "off";
        miniBus.on(this.id.toString(), ({ stareCentrala }) => {
            this.stareCentrala = stareCentrala;
            document.getElementById("stare-centrala").innerText = `${this.stareCentrala}`;
        });

        let htmlCentrala = document.createElement('div');
        htmlCentrala.setAttribute('class', 'container-centrala');
        htmlCentrala.setAttribute('id', this.id);
        htmlCentrala.innerHTML = `
        <div class="container">
            <p> Stare centrala </p>
            <p id="stare-centrala"> ${ this.stareCentrala}</p>
        </div>`;
        document.getElementById('container-incalzire').append(htmlCentrala);
    };
};

class Pompa extends Device {
    constructor(name, id) {
        super(name, id);
        this.starePompa = "off";
        miniBus.on(this.id.toString(), ({ starePompa }) => {
            this.starePompa = starePompa;
            document.getElementById("stare-pompa").innerText = `${this.starePompa}`;
        });

        let htmlPompa = document.createElement('div');
        htmlPompa.setAttribute('class', 'container-pompa');
        htmlPompa.setAttribute('id', this.id);
        htmlPompa.innerHTML = `
        <div class="container">
            <p> Stare pompa </p>
            <p id="stare-pompa"> ${this.starePompa}</p>
        </div>`;
        document.getElementById('container-incalzire').append(htmlPompa);
    };
};

class Radiator extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareRadiator = "off";
        miniBus.on(this.id.toString(), ({ stareRadiator }) => {
            this.stareRadiator = stareRadiator;
            document.getElementById("stare-radiator").innerText = `${this.stareRadiator}`;
        });


        let htmlRadiator = document.createElement('div');
        htmlRadiator.setAttribute('class', 'container-pompa');
        htmlRadiator.setAttribute('id', this.id);
        htmlRadiator.innerHTML = `
        <div class="container">
            <p> Stare radiator </p>
            <p id="stare-radiator"> ${this.stareRadiator}</p>
        </div>`;
        document.getElementById('container-incalzire').append(htmlRadiator);
    };
};

class Videoproiector extends Device {
    constructor(name, id) {
        super(name, id);
        this.stareVideoproiector = "Oprit";
        miniBus.on(this.id.toString(), ({ stareVideoproiector }) => {
            this.stareVideoproiector = stareVideoproiector;
            document.getElementById("stare-Videoproiector").innerText = `${this.stareVideoproiector}`;
        });

        let htmlVideoproiector = document.createElement('div');
        htmlVideoproiector.setAttribute('class', 'container-videoproiector-clasa');
        htmlVideoproiector.setAttribute('id', this.id);
        htmlVideoproiector.innerHTML = `
            <h2 class="text-light">Videoproiector sala de clasa</h2>
            <p id="stare-Videoproiector" class="text-white">${this.stareVideoproiector}</p>
            <div class="container-buttons">
                <button id="13-on" class="btn btn-primary">Porneste videoproiector</button>
                <button id="13-off" class="btn btn-danger">Opreste lumina videoproiector</button>
            </div>`;
        document.getElementById('container-videoproiector').append(htmlVideoproiector);
        document.getElementById(`${this.id}-on`).addEventListener('click', () => {
            miniBus.emit('0', { id: `${this.id}-on` })
        });
        document.getElementById(`${this.id}-off`).addEventListener('click', () => {
            miniBus.emit('0', { id: `${this.id}-off` })
        });
    };
};

let device_config = [
    { id: 0, type: Brain, name: "Brain" },
    { id: 1, type: Led, name: "Led - Bazin" },
    { id: 2, type: Acces, name: "Acces bazin" },
    { id: 3, type: Centrala, name: "Centrala" },
    { id: 4, type: Pompa, name: "Pompa" },
    { id: 5, type: Radiator, name: "Radiator" },
    { id: 6, type: Led, name: "Led - Ambientala" },
    { id: 11, type: Led, name: "Led - Clasa" },
    { id: 13, type: Videoproiector, name: "Videoproiector" },
    { id: 200, type: Sensor, name: "Senzor temperatura apa bazin" },
    { id: 201, type: Sensor, name: "Senzor detectie bazin" },
    { id: 202, type: Sensor, name: "Senzor temperatura ambientala" },
    { id: 400, type: Sensor, name: "Senzor temperatura ambientala clasa" },
    { id: 401, type: Sensor, name: "Senzor detectie clasa" },
]

let devices = [];
device_config.forEach(dvc => {
    devices.push(new dvc.type(dvc.name, dvc.id));
});

document.getElementById('temperatura_bazin_up').addEventListener('click', () => {
    miniBus.emit('0', { id: '8-up' });
});
document.getElementById('temperatura_bazin_down').addEventListener('click', () => {
    miniBus.emit('0', { id: '8-down' });
});
document.getElementById('temperatura_ambientala_up').addEventListener('click', () => {
    miniBus.emit('0', { id: '7-up' });
});
document.getElementById('temperatura_ambientala_down').addEventListener('click', () => {
    miniBus.emit('0', { id: '7-down' });
});
document.getElementById('temperatura-clasa-UP').addEventListener('click', () => {
    miniBus.emit('0', { id: '14-up' });
});
document.getElementById('temperatura-clasa-DOWN').addEventListener('click', () => {
    miniBus.emit('0', { id: '14-down' });
});
miniBus.emit('00', { id: '0' }); // Sets devices according to the current time (at which the program was started)