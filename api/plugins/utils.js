'use strict'

const fp = require('fastify-plugin')
const axios = require("axios");

const http = axios.create({
    baseURL: process.env.CPU,
    headers: {
        "Content-Type": "application/json"
    }
});


module.exports = fp(async function (fastify, opts) {
    fastify.decorate('sendToCPU', async function (data, endpoint, cb,) {
        return await http.post("/" + endpoint, cb(data))
    })

    fastify.decorate('returnColumnFromCsvOBject', function (data, columnName) {
        return data.reduce((acc, curr) => {
            acc.push(curr[columnName])
            return acc
        }, [])
    })

    fastify.decorate('formatObject', function (data, tiempo) {

        let { valores, pronostico, error, errorAbsoluto, errorMedio, errorMedioAbsoluto } = data


        const lenDiff = valores.length - pronostico.length

        function prepend(value, array) {
            var newArray = array.slice();
            newArray.unshift(value);
            return newArray;
        }

        for (let index = 0; index < lenDiff; index++) {
            pronostico = prepend(0, pronostico);
            error = prepend(0, error);
            errorAbsoluto = prepend(0, errorAbsoluto);
        }

        const chartObject = []
        const TableObject = []
        const ErrorObject = {
            errorMedio,
            errorMedioAbsoluto
        }

        for (let index = 0; index < valores.length; index++) {
            chartObject.push({
                tiempo: tiempo[index],
                valores: valores[index],
                pronostico: pronostico[index]
            })

            TableObject.push({
                tiempo: tiempo[index],
                valores: valores[index],
                pronostico: pronostico[index],
                error: error[index],
                errorAbsoluto: errorAbsoluto[index]
            })

        }

        return {
            chartObject, TableObject, ErrorObject
        }
    })
})




