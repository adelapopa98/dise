const file = {
    '0': {
        'this.time.hour > 8 && this.time.hour <= 11 && this.time.date !== 5 && this.time.date !== 6 && this.detectie === true': {
            '1': { intensitate: '90,', culoare: 'white' },
            '2': { stareAcces: 'Permis' },
            '3': { stareCentrala: 'on' },
            '4': { 'stare pompa': 'on' },
            '5': { 'stare radiator': 'on' },
            '6': { intensitate: 100, culoare: 'white' }
        },
        'this.time.hour > 11 && this.time.hour <= 13 && this.time.date !== 5 && this.time.date !== 6 && this.detectie === true': { '6': { intensitate: 60, culoare: 'white' } },
        'this.time.hour > 13 && this.time.hour <= 18 && this.time.date !== 5 && this.time.date !== 6 && this.detectie === true': { '6': { intensitate: 30, culoare: 'white' } },
        'this.time.hour > 18 && this.time.date !== 5 && this.time.date !== 6 && this.detectie === true': {
            '1': { intensitate: 0, culoare: 'black' },
            '2': { stareAcces: 'Respins' },
            '3': { stareCentrala: 'off' },
            '4': { 'stare pompa': 'off' },
            '5': { 'stare radiator': 'off' },
            '6': { intensitate: 0, culoare: 'black' }
        }
    },
    '101': { '1': { intensitate: 100, culoare: 'blue' } },
    '102': { '1': { intensitate: 0, culoare: 'black' } },
    '103': { 'this.TBazinDorita++': '', 'document.getElementById("temperatura_bazin_dorita").setAttribute("value", this.TBazinDorita)': '' },
    '104': { 'this.TBazinDorita--': '', 'document.getElementById("temperatura_bazin_dorita").setAttribute("value", this.TBazinDorita)': '' },
    '105': { '2': { stareAcces: 'Permis' } },
    '106': { '2': { stareAcces: 'Respins' } },
    '107': { 'this.TAmbientDorita++': '', 'document.getElementById("temperatura_ambientala_dorita").setAttribute("value", this.TAmbientDorita)': '' },
    '108': { 'this.TAmbientDorita--': '', 'document.getElementById("temperatura_ambientala_dorita").setAttribute("value", this.TAmbientDorita)': '' },
    '109': { '6': { intensitate: 100, culoare: 'white' } },
    '110': { '6': { intensitate: 0, culoare: 'black' } },
    '200': {
        'this.temperaturaBazin = data.val': null,
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
    '201': { 'this.detectie = !!data.val': '' },
    '202': {
        'this.temperaturaAmbientala = data.val': null,
        'this.temperaturaAmbientala >= this.TAmbientDorita': { '3': { stareCentrala: 'off' }, '5': { stareRadiator: 'off' } },
        'this.temperaturaAmbientala < this.TAmbientDorita': { '3': { stareCentrala: 'on' }, '5': { stareRadiator: 'on' } }
    },
    '203': 'senzor access',
    '301': { '11': { intensitate: 100, culoare: 'white' } },
    '302': { '11': { intensitate: 0, culoare: 'black' } },
    '303': { 'this.TAmbientClasaDorita++': '', 'document.getElementById("temperatura_ambientala_clasa_dorita").setAttribute("value", this.TAmbientClasaDorita)': '' },
    '304': { 'this.TAmbientClasaDorita--': '', 'document.getElementById("temperatura_ambientala_clasa_dorita").setAttribute("value", this.TAmbientClasaDorita)': '' },
    '305': { '13': { stareVideoproiector: 'Permis' } },
    '306': { '13': { stareVideoproiector: 'Respins' } },
    '400': { 'this.temperaturaAmbientalaClasa = data.val': '' },
    '401': { 'this.detectie = !!data.val': '' },
    '402': 'stareVideoproiector',
    vars: 'this.temperaturaAmbientala=21; this.temperaturaBazin=30; this.temperaturaAmbientalaClasa=21; this.TAmbientDorita=21; this.TAmbientClasaDorita=21; this.TBazinDorita=30; this.detectie=true;'
}