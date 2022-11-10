'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const cors = require('@fastify/cors')
const fileUpload = require('fastify-file-upload')

module.exports = async function (fastify, opts) {

  await fastify.register(fileUpload)
  
  await fastify.register(cors, { 
    origin: (origin, cb) => {
      const hostname =  origin && new URL(origin).hostname
      if(hostname === "localhost" || hostname === "127.0.0.1" || hostname == undefined){  
        cb(null, true)
        return
      }
      cb(new Error("Not allowed"), false)
    }
  })

  
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
