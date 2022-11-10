'use strict'
const csv = require("csvtojson");
const fs = require('fs').promises;


module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.post('/upload', {
    schema: {
      summary: 'upload file',
      body: {
        type: 'object',
        properties: {
          file: { type: 'object' }
        },
        required: ['file']
      }
    },
    handler: (request, reply) => {
      const file = request.body.file;
      const doc = request.body.document.data;
      const docJson = doc && JSON.parse(doc.toString());
      console.log(docJson)

      if (file.mimetype !== "text/csv") {
        return reply.status(400).send({ error: "Only CSV files are allowed" });
      }

      const uploadPath = __dirname + '/../files/' + file.name;

      file.mv(uploadPath, function (err) {
        if (err)
          return reply.status(500).send(err);

        csv()
          .fromFile(uploadPath)
          .then(async (jsonObj) => {

            try {
              const promedioMovil = await fastify.sendToCPU(jsonObj, "promedioMovil", data => {
                return { valores: fastify.returnColumnFromCsvOBject(data, "valores"), n: docJson.promedioMovil }
              })

              const promedioPonderado = await fastify.sendToCPU(jsonObj, "promedioPonderado", data => {
                return { valores: fastify.returnColumnFromCsvOBject(data, "valores"), w: docJson.promedioPonderado }
              })

              const promedioSuavizamiento = await fastify.sendToCPU(jsonObj, "suavizamientoExponencial", data => {
                return { valores: fastify.returnColumnFromCsvOBject(data, "valores"), a: docJson.suavizamiento }
              })

              const time = fastify.returnColumnFromCsvOBject(jsonObj, "tiempo")

              const dataResponse = {
                promedioMovil: fastify.formatObject(promedioMovil.data, time),
                promedioPonderado: fastify.formatObject(promedioPonderado.data, time),
                promedioSuavizamiento: fastify.formatObject(promedioSuavizamiento.data, time)
              }


              console.log(dataResponse)

              return reply.status(200).send(dataResponse)
            } catch (e) {
              return reply.status(500).send(e)
            }


          })

      });

    }
  })

  fastify.get('/files', async function (request, reply) {
    reply.send([{ url: "google.com", name: "Google" }])
  })
}


