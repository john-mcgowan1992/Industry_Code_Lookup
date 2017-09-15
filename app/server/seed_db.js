const Sequelize = require('sequelize'),
      parsed = require('./industry_codes.json');

const db = new Sequelize('pdf_parse', 'john-m', '', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: ':memory:'
});

db.authenticate().then(() => {
    console.log("Connection established");
}).catch(err => {
    console.error(err)
})

const industry_code = db.define('industry_code', {
    description: {
        type: Sequelize.STRING
    },
    NAICS: {
        type: Sequelize.INTEGER
    },
    NCCI: {
        type: Sequelize.INTEGER
    },
    CA_WC: {
        type: Sequelize.INTEGER
    },
    DE_WC: {
        type: Sequelize.INTEGER
    },
    MI_WC: {
        type: Sequelize.INTEGER
    },
    NJ_WC: {
        type: Sequelize.INTEGER
    },
    NY_WC: {
        type: Sequelize.INTEGER
    },
    PA_WC: {
        type: Sequelize.INTEGER
    },
    TX_WC: {
        type: Sequelize.INTEGER
    } 
});

db.sync({force: true}).then(() => {
        return seedParsedData(parsed);
})

function seedParsedData(industryArray) {
    industryArray.forEach(function(arr) {
        for (var key in arr) {
            var entry = arr[key]
            industry_code.create({
                description: entry['General Description'],
                NAICS: entry['NAICS'],
                NCCI: entry['NCCI'],
                CA_WC: entry['CA WC'],
                DE_WC: entry['DE WC'],
                MI_WC: entry['MI WC'],
                NJ_WC: entry['NJ WC'],
                NY_WC: entry['NY WC'],
                PA_WC: entry['PA WC'],
                TX_WC: entry['TX WC']
            })
        }
    });
}

module.exports = industry_code;