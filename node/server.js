import Fastify from 'fastify'

const fastify = Fastify({
  logger: true,
})

// routes
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// async self start
;(async () => {
  try {
    await fastify.listen({ port: 8080 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})()
