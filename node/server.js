// --- esm all the things for this runtime
import Fastify from 'fastify'
import dbConnector from './db.js'
import animalsRoutes from './routes/animals.js'

// --- pull their logger
const fastify = Fastify({
  logger: true,
})

// --- manual route
fastify.get('/', async (req, rep) => {
  return { route: 'root' }
})

// --- plugins
fastify.register(dbConnector)
fastify.register(animalsRoutes)

// --- server self start
;(async () => {
  try {
    await fastify.listen({ port: 8080 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})()
