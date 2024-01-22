// ESM
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

async function dbConnector(fastify, options) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017/fast',
  })
}

// expose decorators/hooks in plugin to parent
export default fastifyPlugin(dbConnector)
