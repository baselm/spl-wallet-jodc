import React, { useCallback, useState} from 'react'

import Deposits from './Deposits';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@material-ui/core/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import balanceInfo from '../components/BalancesList'
import { useConnection } from '../utils/connection';
import { priceStore } from '../utils/markets';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { PieChart, Pie, Sector, Legend } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import Popover from '@mui/material/Popover';

const data = [
  { name: 'SOL', value: 600 },
  { name: 'USDT', value: 300 },
  { name: 'JODC', value: 1000 },
  { name: 'BTC', value: 600 },
];

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];



const useStyles = makeStyles((theme) => ({
    container: {
      [theme.breakpoints.down(theme.ext)]: {
        padding: 0,
      },
      [theme.breakpoints.up(theme.ext)]: {
        maxWidth: 'md',
      },
    },
    balancesContainer: {
      [theme.breakpoints.down(theme.ext)]: {
        marginBottom: 24,
      },
    },
  }));


  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`APR ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  

export default function Dashboard() {
  //popover 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  //popover
  const classes = useStyles();
  const [poolVolume, setPoolVolume] = useState(undefined);
  const connection = useConnection();
  const {t} = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  let m = "SOLUSDT";
        priceStore
        .getPoolVolume(connection, m)
        .then((poolVolume) => {
        
          setPoolVolume(poolVolume)
          console.log("Dashboard Price " + poolVolume);
        })
        .catch((err) => {
          console.error(err);
           
        });
        const borrowed= 50000
        const lentout = borrowed/poolVolume
    return (
      <Box display="flex" flexDirection="column" >
         <CssBaseline />
         <Container>

      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="flex-end" >
        <Grid item xs={12} sm={12} md={3} xl={3}>
        <Card sx={{ minWidth: 240 }} elevation={5}>
              <CardContent>
                <Typography component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 15 }}
                                  >
                  {t('CurrentMarketSize')}
                </Typography>
                <Typography
                component="h1"
                variant="h5"
                color="secondary" 
                noWrap
                sx={{ flexGrow: 15 }}
                >
                {poolVolume}
                </Typography>
                                        
              </CardContent>
              <CardActions>
                <Button size="small" href="https://solanascan.io/">Learn More</Button>
              </CardActions>
            </Card>  
        </Grid>
        <Grid item xs={12} sm={12} md={3} xl={3}>
        <Card sx={{ minWidth: 240 }} elevation={5} >
              <CardContent>
                <Typography component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 15 }}
                                  >
                {t('TotalBorrowed')}
                </Typography>
                <Typography
                component="h1"
                variant="h5"
                color="secondary" 
                noWrap
                sx={{ flexGrow: 15 }}
                >
                 <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                 </Typography>
                                        
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleClick} >Learn More</Button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >

                    <Typography sx={{ p: 2 }}>{t('borrowing')}</Typography>


                    </Popover>
              </CardActions>
            </Card>   
        </Grid>
        <Grid item xs={12} sm={12} md={3} xl={3}>
        <Card sx={{ minWidth: 240 }} elevation={5}>
              <CardContent>
                <Typography component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 15 }}
                                  >
                {t('lentout')}
                </Typography>
                <Typography
                component="h1"
                variant="h5"
                color="secondary" 
                noWrap
                sx={{ flexGrow: 15 }}
                >
          
            <NumberFormat value={lentout * 100} decimalScale={2} displayType={'text'} thousandSeparator={true} prefix={'%'} />

                </Typography>
                                        
              </CardContent>
              <CardActions>
                <Button size="small" href={'/DemoDashboard'} >Learn More</Button>
              </CardActions>
            </Card>  
        </Grid>
     
        <Grid item xs={12} sm={12} md={9} xl={9}>
                <Card elevation={5}>
                      <CardContent>
                        <Typography component="h1"
                                            variant="h6"
                                            align ="Center"
                                            color="inherit"
                                            noWrap
                                            sx={{ flexGrow: 15 }}
                                          >
                        {t('marketComposition')}
                        
                        </Typography>
                         
                        <PieChart width={700} height={400} align="center" margin={{
                    top: 5, right: 30, left: 60, bottom: 5,
                }}>
                                  <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={data}
                                    cx={200}
                                    cy={200}
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#003E00"
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                  />
                                  <Legend
                                  payload={
                                    data.map(
                                      (item, index) => ({
                                        id: item.name,
                                        type: "square",
                                        value: `${item.name} (${item.value}%)`,

                                      })
                                    )
                                  }
                                  margin={{
                                    top: 5, right: 30, left: 260, bottom: 5,
                                }}
                                />
                                </PieChart>         
                               
                      </CardContent>
                       
                    </Card>  
        </Grid>
      </Grid>
      </Container>
      </Box>
    )

                }