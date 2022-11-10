import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import Grid from '@mui/material/Grid';

import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: "#EEEEEE",
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

interface StateType {
    prop: {
        currentFile
        progress
        message
        isError
        fileInfos
        selectedFiles
        promedioPonderado
        suavizamiento
        promedioMovil
    }
    sets: {
        setCurrentFile
        setProgress
        setSelectedFiles
        setMessage
        setIsError
        setFileInfos
    }
    handlers: {
        handleDataSet
    }
}


const selectFile = setSelectedFiles => (event) => {
    event.preventDefault();
    setSelectedFiles(event.target.files);
}

const UploadFiles = ({
    handleDataSet,
    promedioPonderado,
    suavizamiento,
    promedioMovil
}) => {

    const [currentFile, setCurrentFile] = React.useState(undefined);
    const [progress, setProgress] = React.useState(0);
    const [selectedFiles, setSelectedFiles] = React.useState<Array<any> | undefined>(undefined);
    const [message, setMessage] = React.useState("");
    const [isError, setIsError] = React.useState(false);
    const [fileInfos, setFileInfos] = React.useState([]);

    const state = {
        prop: {
            currentFile,
            progress,
            message,
            isError,
            fileInfos,
            selectedFiles,
            promedioPonderado,
            suavizamiento,
            promedioMovil
        },
        sets: {
            setCurrentFile,
            setProgress,
            setSelectedFiles,
            setMessage,
            setIsError,
            setFileInfos
        },
        handlers: {
            handleDataSet
        }
    }

    return (


        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >

            <Grid item xs={12}>
                {currentFile && (
                    <Box className="mb25" display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                            <BorderLinearProgress variant="determinate" value={progress} />
                        </Box>
                        <Box minWidth={35}>
                            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                        </Box>
                    </Box>)
                }
                <label htmlFor="btn-upload">

                    <form className="App">
                        <input
                            id="btn-upload"
                            name="fileLoaded"
                            style={{ display: 'none' }}
                            type="file"
                            onChange={selectFile(setSelectedFiles)} />
                        <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span" >
                            Choose File
                        </Button>
                    </form>

                </label>
            </Grid>
            <Grid item xs={12}>
                <div className="file-name">
                    {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
                </div>
            </Grid>
            <Grid item xs={12}>
                <Button
                    className="btn-upload"
                    color="primary"
                    variant="contained"
                    component="span"
                    disabled={!selectedFiles}
                    onClick={upload(state)}>
                    Upload
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                    {message}
                </Typography>
            </Grid>
        </Grid>


    )
}


const upload = (state: StateType) => () => {
    let currentFile = state.prop.selectedFiles[0];
    state.sets.setCurrentFile(currentFile)
    state.sets.setProgress(0)

    const data = {
        promedioPonderado: state.prop.promedioPonderado,
        suavizamiento: state.prop.suavizamiento,
        promedioMovil: state.prop.promedioMovil
    }

    UploadService.upload(currentFile, (event) => {
        state.sets.setProgress(Math.round((100 * event.loaded) / event.total))
    }, data)
        .then((response) => {
            console.log(response)
            state.sets.setMessage("Uploaded!")
            state.sets.setIsError(false)
            state.handlers.handleDataSet(response.data)
            return UploadService.getFiles();
        })
        .then((files) => {
            state.sets.setFileInfos(files.data)
        })
        .catch(() => {
            state.sets.setProgress(0)
            state.sets.setMessage("Could not upload the file!")
            state.sets.setCurrentFile(undefined)
            state.sets.setIsError(true)
        });

    state.sets.setSelectedFiles(undefined);
}

export default function UploadFile({ handleDataSet, promedioPonderado,
    suavizamiento,
    promedioMovil }) {
    return <UploadFiles
        handleDataSet={handleDataSet}
        promedioPonderado={promedioPonderado}
        suavizamiento={suavizamiento}
        promedioMovil={promedioMovil} />;
}
