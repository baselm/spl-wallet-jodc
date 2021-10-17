import React, { Suspense, useState } from 'react';
import { makeStyles, List, ListItem } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogForm from './components/DialogForm';
import NavigationFrame from './components/NavigationFrame';
import { ConnectionProvider } from './utils/connection';
import WalletPage from './pages/WalletPage';
import { useWallet, WalletProvider } from './utils/wallet';
import { ConnectedWalletsProvider } from './utils/connected-wallets';
import { TokenRegistryProvider } from './utils/tokens/names';
import LoadingIndicator from './components/LoadingIndicator';
import { SnackbarProvider } from 'notistack';
import PopupPage from './pages/PopupPage';
import LoginPage from './pages/LoginPage';
import ConnectionsPage from './pages/ConnectionsPage';
import { isExtension } from './utils/utils';
import { PageProvider, usePage } from './utils/page';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Invest from './pages/Invest';
import Borrow from './pages/Borrow';
import DemoDashboard from './pages/DemoDashboard';
import { useTranslation } from 'react-i18next';
import { arSD } from '@mui/material/locale';

export default function App() {
  // TODO: add toggle for dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#003E00',
          },
          secondary: { main: '#FFFFFF' },
        },
        // TODO consolidate popup dimensions
        ext: '450',
        arSD,
      }),
    [prefersDarkMode],
  );

  let appElement = (
    <NavigationFrame>
      <Suspense fallback={<LoadingIndicator />}>
        <div> Welcome </div>
        <PageContents />
      </Suspense>
    </NavigationFrame>
  );

  if (isExtension) {
    appElement = (
      <ConnectedWalletsProvider>
        <PageProvider>{appElement}</PageProvider>
      </ConnectedWalletsProvider>
    );
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConnectionProvider>
          <TokenRegistryProvider>
            <SnackbarProvider maxSnack={5} autoHideDuration={8000}>
              <WalletProvider>
                <Router>
                  <NavigationFrame>
                    <Switch>
                      <Route exact path="/">
                        <Suspense fallback={<LoadingIndicator />}>
                          <PageContents />
                        </Suspense>
                      </Route>

                      <Route path="/Dashboard">
                        <Dashboard />
                      </Route>
                      <Route path="/DemoDashboard">
                        <DemoDashboard />
                      </Route>
                      <Route path="/Borrow">
                        <Borrow />
                      </Route>
                    </Switch>
                  </NavigationFrame>
                </Router>
              </WalletProvider>
            </SnackbarProvider>
          </TokenRegistryProvider>
        </ConnectionProvider>
      </ThemeProvider>
    </Suspense>
  );
}

function PageContents() {
  const wallet = useWallet();
  const [page] = usePage();
  const [showWalletSuggestion, setShowWalletSuggestion] = useState(true);
  const suggestionKey = 'private-irgnore-wallet-suggestion';
  const ignoreSuggestion = window.localStorage.getItem(suggestionKey);

  console.log('Baz working start');
  if (!wallet) {
    return (
      <>
        {!ignoreSuggestion && (
          <WalletSuggestionDialog
            open={showWalletSuggestion}
            onClose={() => setShowWalletSuggestion(false)}
            onIgnore={() => {
              window.localStorage.setItem(suggestionKey, true);
              setShowWalletSuggestion(false);
            }}
          />
        )}
        <LoginPage />
      </>
    );
  }
  if (window.opener) {
    return <PopupPage opener={window.opener} />;
  }
  if (page === 'wallet') {
    return <WalletPage />;
  } else if (page === 'connections') {
    return <ConnectionsPage />;
  }
}

const useStyles = makeStyles(() => ({
  walletButton: {
    width: '100%',
    padding: '16px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

function WalletSuggestionDialog({ open, onClose, onIgnore }) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <DialogForm open={open} onClose={onClose} fullWidth>
      <DialogTitle>{t('LookingforaWallet')}</DialogTitle>
      <DialogContent>
        <Typography>{t('connectWalletText')}</Typography>
        <List disablePadding style={{ marginTop: '16px' }}>
          <ListItem button disablePadding style={{ padding: 0 }}>
            <div
              className={classes.walletButton}
              style={{ display: 'flex' }}
              onClick={() => {
                window.location = 'https://phantom.app/';
              }}
            >
              <div>
                // eslint-disable-next-line
                <img
                  style={{ height: '39px' }}
                  src="https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/phantom.svg"
                />
              </div>
              <div>
                <Typography
                  style={{
                    marginLeft: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '39px',
                    fontWeight: 'bold',
                  }}
                >
                  Phantom
                </Typography>
              </div>
            </div>
          </ListItem>
          <ListItem button disablePadding style={{ padding: 0 }}>
            <div
              onClick={() => {
                window.location = 'https://solflare.com/';
              }}
              className={classes.walletButton}
              style={{ display: 'flex' }}
            >
              <div>
                <img
                  style={{ height: '39px' }}
                  src="https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/solflare.svg"
                />
              </div>
              // eslint-disable-next-line
              <div>
                <Typography
                  style={{
                    marginLeft: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '39px',
                    fontWeight: 'bold',
                  }}
                >
                  Solflare
                </Typography>
              </div>
            </div>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary" onClick={onIgnore}>
          {t('IgnoreFutureDialog')}
        </Button>
        <Button type="submit" color="primary" onClick={onClose}>
          {t('ok')}
        </Button>
      </DialogActions>
    </DialogForm>
  );
}
