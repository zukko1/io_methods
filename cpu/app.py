import json
from flask import Flask, request
import numpy as np
import pandas as pd
from statsmodels.tsa.api import SimpleExpSmoothing
from statsmodels.tsa.seasonal import seasonal_decompose
import math
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#Helpers

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


def error(data, result, debug=False):
    returnDict = dict()
    returnDict['error_array'] = []
    returnDict['error_array_abs'] = []
    lentDiff = len(data) - len(result)
    for index, item in enumerate(result):
        i = index + lentDiff
        value = data[i] - item
        if (debug):
            print("------")
            print(item)
            print(value)
            print(data[i])
            print("------")
        returnDict['error_array_abs'].append(abs(value))
        returnDict['error_array'] .append(value)
    returnDict['average_error'] = np.mean(returnDict['error_array'])
    returnDict['average_error_abs'] = np.mean(returnDict['error_array_abs'])
    return returnDict


def responseFormat(errorDict, values, prognostic):
    return json.dumps({
        "valores": values,
        "pronostico": prognostic,
        'error': errorDict['error_array'],
        'errorAbsoluto': errorDict['error_array_abs'],
        'errorMedio': errorDict['average_error'],
        'errorMedioAbsoluto': errorDict['average_error_abs']
    }, cls=NpEncoder)


def calculateWeight(peso):
    sumaPesos = 0
    pesos = []

    for i in range(peso+1):
        sumaPesos = sumaPesos + i

    for i in range(1, peso+1):
        pesos.append(i/sumaPesos)

    return pesos


def replaceNaN(data):
    dataReturn = []
    for item in data:
        if (math.isnan(item)):
            continue
        dataReturn.append(item)
    return dataReturn

#End Helpers

#Metodos de pronostico

def promedioPonderadoMethod(data, peso):
    pesos = calculateWeight(peso)
    df = pd.DataFrame(data).rolling(peso).apply(
        lambda x: (x*pesos).sum(), raw=True)
    dfList = df.values.tolist()
    dfArray = np.array(dfList)
    dfFlatten = dfArray.flatten()
    dfReady = replaceNaN(dfFlatten)
    return dfReady   

def suvizamientoMethod(data, a):
    modelo = SimpleExpSmoothing(data).fit(smoothing_level=a, optimized=False)
    smoothing_result = modelo.fittedvalues
    return  smoothing_result

def promedioMovilMethod(data, n):
    def moving_average(x, w):
        return np.convolve(x, np.ones(w), 'valid') / w
    moving_average_array = moving_average(data, n)
    return moving_average_array

#End Metodos de pronostico


#Rutas

@app.route('/promedioMovil', methods=['POST'])
@cross_origin()
def promedio_movil():

    dataIn = request.json["valores"]
    n = eval(request.json["n"]) + 1

    data = [eval(i) for i in dataIn]

    result = promedioMovilMethod(data, n)

    errorDict = error(data, result)
    return responseFormat(errorDict, data, result)


@app.route('/suavizamientoExponencial', methods=['POST'])
@cross_origin()
def suavizamiento_exponencial():

    dataIn = request.json["valores"]
    a = eval(request.json["a"])

    data = [eval(i) for i in dataIn]

    result = suvizamientoMethod(data, a)

    errorDict = error(data, result)
    return responseFormat(errorDict, data, result)


@app.route('/promedioPonderado', methods=['POST'])
@cross_origin()
def promedioPonderado():
    dataIn = request.json["valores"]
    peso = eval(request.json["w"])
    data = [eval(i) for i in dataIn]
    
    result = promedioPonderadoMethod(data, peso)

    errorDict = error(data, result)
    return responseFormat(errorDict, data, result)


if __name__ == '__main__':
    app.run(debug=True)
