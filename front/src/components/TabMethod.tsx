import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from './Orders';
import { useTheme } from '@mui/material/styles';
import Chart from './Chart';
import ListError from './ListError';

// Generate Sales Data
function createData(time: string, amount?: number) {
    return { time, amount };
}


export default function TabMethod({ data }) {
    const theme = useTheme();

    console.log(data)

    return (
        <React.Fragment>
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={12} container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>


                    <Grid item xs={12} md={8}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 500,
                            }}
                        >
                            <Chart data={data.chartObject} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <ListError errorMedio={data.ErrorObject.errorMedio} errorMedioA={data.ErrorObject.errorMedioAbsoluto}></ListError>
                        </Paper>
                    </Grid>


                </Grid>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',

                        }}
                    >
                        <Orders data={data.TableObject}/>
                    </Paper>
                </Grid>

            </Grid>

        </React.Fragment>
    );
}
