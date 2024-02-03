
import {getData} from "./api.js";


console.log(await getData(`https://gateway.marvel.com:443/v1/public/characters`));

/*
const fastify = require('fastify')();
fastify.register(require('@fastify/view'), {
    engine: {
        handlebars: require('handlebars')
    },
    templates: 'chemin/vers/vos/templates', // Assurez-vous que Fastify peut trouver vos fichiers de templates
    layout: 'layout.hbs', // Vous pouvez spécifier un layout par défaut si vous le souhaitez
    partials: {
        header: 'header.hbs',
        footer: 'footer.hbs'
    }
});
*/