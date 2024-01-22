function getCollection(mdb, name) {
  return mdb.collection(name)
}

// encapsulated f-instance
async function animalsRoutes(fastify, option) {
  // not sure why i cant pull collection name list
  const tempCollectionNames = ['dogs', 'cats', 'birds']
  const mdb = fastify.mongo.db

  fastify.get('/animals/:type?', async (req, rep) => {
    const collection = await getCollection(mdb, 'animals')
    let data

    if (req.params && req.params.type) {
      if (!tempCollectionNames.includes(req.params.type)) {
        throw new Error('invalid animals type')
      }

      data = await collection.find({ type: req.params.type }).toArray()
    } else {
      data = await collection.find().toArray()
    }

    if (!data.length) {
      throw new Error('no animals found')
    }

    return data
  })

  // dynamic routes generated from collection names
  tempCollectionNames.forEach((name) => {
    fastify.get(`/animals/${name}/:id?`, async (req, rep) => {
      const collection = getCollection(mdb, name)
      const data = await collection.find().toArray()

      if (!data.length) {
        throw new Error(`no ${name} records found`)
      }

      return data
    })
  })
}

export default animalsRoutes
