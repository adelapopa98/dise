const file = {
    '0': {
        'this.time.hour > 8 && this.time.hour <= 11 && this.time.date !== 5 && this.time.date !== 6 && this.detectie === true': {
            '1': { intensitate: 90, culoare: 'white' },
            '2': { stareAcces: 'Permis' },
            '3': { stareCentrala: 'on' },
            '4': { starePompa: 'on' },
            '5': { stareRadiator: 'on' },
            '6': { intensitate: 100, culoare: 'white' }
        },
        'this.time.hour > 11 && this.time.hour <= 13 && this.time.date !== 5 && this.time.date !== 6 && this.detectie === true': { '6': { intensitate: 60, culoare: 'white' } },
        'this.time.hour > 13 && this.time.hour <= 18 && this.time.date !== 5 && this.time.date !== 6 && this.detectie === true': { '6': { intensitate: 30, culoare: 'white' } },
        'this.time.hour > 18 && this.time.date !== 5 && this.time.date !== 6 && this.detectie === true': {
            '1': { intensitate: 0, culoare: 'black' },
            '2': { stareAcces: 'Respins' },
            '3': { stareCentrala: 'off' },
            '4': { starePompa: 'off' },
            '5': { stareRadiator: 'off' },
            '6': { intensitate: 0, culoare: 'black' }
        }
    },
    '1-on': { '1': { intensitate: 100, culoare: 'blue' } },
    '1-off': { '1': { intensitate: 0, culoare: 'black' } },
    '8-up': { 'this.TBazinDorita++': null, 'document.getElementById("temperatura_bazin_dorita").setAttribute("value", this.TBazinDorita)': null },
    '8-down': { 'this.TBazinDorita--': null, 'document.getElementById("temperatura_bazin_dorita").setAttribute("value", this.TBazinDorita)': null },
    '2-on': { '2': { stareAcces: 'Permis' } },
    '2-off': { '2': { stareAcces: 'Respins' } },
    '7-up': { 'this.TAmbientDorita++': null, 'document.getElementById("temperatura_ambientala_dorita").setAttribute("value", this.TAmbientDorita)': null },
    '7-down': { 'this.TAmbientDorita--': null, 'document.getElementById("temperatura_ambientala_dorita").setAttribute("value", this.TAmbientDorita)': null },
    '6-on': { '6': { intensitate: 100, culoare: 'white' } },
    '6-off': { '6': { intensitate: 0, culoare: 'black' } },
    '200': {
        'this.temperaturaBazin = data.val': null,
        'document.getElementById("temperatura_bazin").setAttribute("value", this.temperaturaBazin)': null,
        'this.temperaturaBazin >= this.TBazinDorita': {
            '1': { intensitate: 100, culoare: 'red' },
            '3': { stareCentrala: 'off' },
            '4': { starePompa: 'off' }
        },
        'this.temperaturaBazin < this.TBazinDorita': {
            '1': { intensitate: 100, culoare: 'blue' },
            '3': { stareCentrala: 'on' },
            '4': { starePompa: 'on' }
        }
    },
    '201': { 'this.detectie = !!data.val': null },
    '202': {
        'this.temperaturaAmbientala = data.val': null,
        'document.getElementById("temperatura_ambientala").setAttribute("value", this.temperaturaAmbientala)': null,
        'this.temperaturaAmbientala >= this.TAmbientDorita': { '3': { stareCentrala: 'off' }, '5': { stareRadiator: 'off' } },
        'this.temperaturaAmbientala < this.TAmbientDorita': { '3': { stareCentrala: 'on' }, '5': { stareRadiator: 'on' } }
    },
    '203': 'senzor access',
    '11-on': { '11': { intensitate: 100, culoare: 'white' } },
    '11-off': { '11': { intensitate: 0, culoare: 'black' } },
    '14-up': { 'this.TAmbientClasaDorita++': null, 'document.getElementById("temperatura_ambientala_clasa_dorita").setAttribute("value", this.TAmbientClasaDorita)': null },
    '14-down': { 'this.TAmbientClasaDorita--': null, 'document.getElementById("temperatura_ambientala_clasa_dorita").setAttribute("value", this.TAmbientClasaDorita)': null },
    '13-on': { '13': { stareVideoproiector: 'Deschis' } },
    '13-off': { '13': { stareVideoproiector: 'Oprit' } },
    '400': {
        'this.temperaturaAmbientalaClasa = data.val': null,
        'document.getElementById("temperatura_ambientala_clasa").setAttribute("value", this.temperaturaAmbientalaClasa)': null,
        'this.temperaturaAmbientalaClasa >= this.TAmbientClasaDorita': { '3': { stareCentrala: 'off' }, '5': { stareRadiator: 'off' } },
        'this.temperaturaAmbientalaClasa < this.TAmbientClasaDorita': { '3': { stareCentrala: 'on' }, '5': { stareRadiator: 'on' } }
    },
    '401': { 'this.detectie = !!data.val': null },
    '402': 'stareVideoproiector',
    vars: 'this.temperaturaAmbientala=21; this.temperaturaBazin=30; this.temperaturaAmbientalaClasa=21; this.TAmbientDorita=21; this.TAmbientClasaDorita=21; this.TBazinDorita=30; this.detectie=true;'
}