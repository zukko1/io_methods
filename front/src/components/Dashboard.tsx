import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import UploadFile from './UploadFiles'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import TabMethod from './TabMethod';
import Comparative from './Comparative';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        UdeM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const mdTheme = createTheme();




const setInputText = (cb) => (event) => {
  cb(event.target.value)
}

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [data, setData] = React.useState({
    promedioPonderado: {
      chartObject: [],
      TableObject: [],
      ErrorObject: {
        errorMedio: 0,
        errorMedioAbsoluto: 0
      }
    },
    promedioMovil: {
      chartObject: [],
      TableObject: [],
      ErrorObject: {
        errorMedio: 0,
        errorMedioAbsoluto: 0
      }
    },
    promedioSuavizamiento: {
      chartObject: [],
      TableObject: [],
      ErrorObject: {
        errorMedio: 0,
        errorMedioAbsoluto: 0
      }
    }
  });
  const [value, setValue] = React.useState(2);

  const [promedioPonderado, setPromedioPonderado] = React.useState(2);
  const [suavizamiento, setSuavizamiento] = React.useState(2);
  const [promedioMovil, setPromedioMovil] = React.useState(2);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={false}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Metodos de pronostico
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <Grid container spacing={2}>
              {/* Forms */}
              <Grid item xs={12} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    Promedio Ponderado
                  </Typography>
                  <TextField id="Peso-basic" label="Peso (w)" variant="outlined" onChange={setInputText(setPromedioPonderado)} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>

                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    Suavizamiento
                  </Typography>
                  <TextField id="Alfa-basic" label="Alfa (a)" variant="outlined" onChange={setInputText(setSuavizamiento)} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    Promedio Movil
                  </Typography>
                  <TextField id="Muestras-basic" label="Muestras (n)" onChange={setInputText(setPromedioMovil)} variant="outlined" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                >
                  <UploadFile handleDataSet={setData} promedioPonderado={promedioPonderado} suavizamiento={suavizamiento} promedioMovil={promedioMovil}></UploadFile>
                </Paper>
              </Grid>
              {/* Recent Orders */}

              <Grid item xs={12}>

                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Pond." {...a11yProps(0)} />
                        <Tab label="Suavizamiento" {...a11yProps(1)} />
                        <Tab label="Movil" {...a11yProps(2)} />
                        <Tab label="Resumen" {...a11yProps(3)} />
                      </Tabs>
                    </Box>
                    {data && (
                      <><TabPanel value={value} index={0}>
                        <TabMethod data={data.promedioPonderado} />
                      </TabPanel><TabPanel value={value} index={1}>
                          <TabMethod data={data.promedioSuavizamiento} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                          <TabMethod data={data.promedioMovil} />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                          <Paper
                            sx={{
                              p: 2,
                              display: 'flex',
                              flexDirection: 'column',
                              height: 450,
                            }}
                          ><Comparative data={data} /></Paper>

                        </TabPanel></>)}
                  </Box>


                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
