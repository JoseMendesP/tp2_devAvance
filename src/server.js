import {getData} from "./api.js";
import Fastify from 'fastify';
import handlebars from 'handlebars';
import fastifyView from '@fastify/view';

console.log(await getData('https://gateway.marvel.com:443/v1/public/characters'));


const fastify = Fastify({logger: true})

fastify.register(fastifyView, {
    engine: {
        handlebars,
    },
    includeViewExtension: true,
    templates: 'templates',
    layout: 'layout.hbs',
    partials: {
        header: 'header.hbs',
        footer: 'footer.hbs',
    }
});
fastify.get('/', async function handler(request, reply) {
    try {
        const marvelCharacters = await getData("https://gateway.marvel.com:443/v1/public/characters");
        return reply.view('index.hbs', { marvelCharacters });
    } catch (error) {
        fastify.log.error(error);
        reply.code(500).send('Erreur interne du serveur');
    }
});

const PORT = process.env.PORT || 3000;

try {
    await fastify.listen(PORT, '0.0.0.0');
    console.log(`Serveur démarré sur le port ${PORT}`);
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
