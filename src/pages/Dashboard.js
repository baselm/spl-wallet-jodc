import React from 'react'
import Deposits from './Deposits';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Paper from '@mui/material/Paper';

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
export default function Dashboard() {
    const classes = useStyles();
    return (
        <div>
             <Box sx={{ display: 'flex' }}>
        <CssBaseline />

            <h1>Dashboard</h1>
            <Container fixed maxWidth="md" className={classes.container}>
                <Grid container spacing={0}>
                     <Grid item xs={12} className={classes.balancesContainer}>
                           <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 15 }}
                            >
                            The Dashboard
                            </Typography>

                            <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
                     </Grid>
        
                    </Grid>
      

    </Container>

         
            </Box>
             
        </div>
    )
}
