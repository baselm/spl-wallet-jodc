import React, { useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useConnectionConfig } from '../utils/connection';
import {CLUSTERS, clusterForEndpoint, getClusters, addCustomCluster, customClusterExists} from '../utils/clusters';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useWalletSelector } from '../utils/wallet';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountIcon from '@material-ui/icons/AccountCircle';
import UsbIcon from '@material-ui/icons/Usb';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import SolanaIcon from './SolanaIcon';
import CodeIcon from '@material-ui/icons/Code';
import Tooltip from '@material-ui/core/Tooltip';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import AddAccountDialog from './AddAccountDialog';
import DeleteMnemonicDialog from './DeleteMnemonicDialog';
import AddHardwareWalletDialog from './AddHarwareWalletDialog';
import { ExportMnemonicDialog } from './ExportAccountDialog.js';
import {
  isExtension,
  isExtensionPopup,
  useIsExtensionWidth,
} from '../utils/utils';
import ConnectionIcon from './ConnectionIcon';
import { Badge } from '@material-ui/core';
import { useConnectedWallets } from '../utils/connected-wallets';
import { usePage } from '../utils/page';
import { MonetizationOn, OpenInNew } from '@material-ui/icons';
import AddCustomClusterDialog from "./AddCustomClusterDialog";
// Baz 
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Box from '@material-ui/core/Box';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TimelineIcon from '@material-ui/icons/Timeline';
import PaymentIcon from '@material-ui/icons/Payment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import IslamicIcon from './IslamicIcon';
import { Link } from "react-router-dom";
import InputLabel from '@material-ui/core/Select';
import { useTranslation } from "react-i18next";

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up(theme.ext)]: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 3,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  menuItemIcon: {
    minWidth: 32,
  },
  badge: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.main,
    height: 16,
    width: 16,
  },
  appBar: {
    postion: 'absolute',
    zIndex: '1600',
    width: '100%', 
    elevation: '0',
    height: '8%'

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    position: "fixed",
    width: drawerWidth,
    borderRadius: 0,
    borderTop: "none",
    background: theme.palette.primary.main,
    borderBottom: "none",
    top: theme.spacing(8), // push content down to fix scrollbar position
    height: `calc(100% - ${theme.spacing(8)}px)` // subtract appbar height
  },
  drawerContent: {
    overflow: "auto",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,

}));

export default function NavigationFrame({ children }) {
  const classes = useStyles();
  const isExtensionWidth = useIsExtensionWidth();
  const {t} = useTranslation();



  const menuItems = [
    { 
      text: 'Wallet', 
      icon: <TimelineIcon color="secondary" fontSize="large" />, 
      path: '/' 
    },
    
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon color="secondary" fontSize="large" />, 
      path: '/Dashboard' 
    },
    { 
      text: 'DemoDashboard', 
      icon: <AccountBalanceIcon color="secondary" fontSize="large" />, 
      path: '/DemoDashboard' 
    },
   
    { 
      text: 'Borrow', 
      icon: <PaymentIcon color="secondary" fontSize="large" />, 
      path: '/Borrow' 
    },
  ];
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("id");

  const handleLangChange = evt => {
    const lang = evt.target.value;
    console.log(lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <>

      <AppBar position="static" className={classes.appBar} elevation={0} >

        {!isExtension && (
          <div
            style={{
              textAlign: 'center',
              background: '#f4f4f4',
              color: 'black',
              paddingLeft: '24px',
              paddingRight: '24px',
              fontSize: '14px',
            }}
          >
          
          </div>
        )}
        <Toolbar>
        <IconButton color="inherit">
            <SolanaIcon />
          </IconButton>
        <br/>
          <Typography variant="h6" className={classes.title} component="h1">
                    
            {t('IslamicCryptoFunding')}

          </Typography>
          <NavigationButtons />
          <select onChange={handleLangChange} value={language}>
            <option value="en">EN</option>
            <option value="ar">AR</option>
           
          </select>
        </Toolbar>
      </AppBar>
      
      <Drawer
      variant="permanent"
      anchor="left"
         elevation={0}
        PaperProps={{
          variant: "outlined"
        }}
        classes={{
          paper: classes.drawerPaper
        }}
         
      >
      <Toolbar />

     <Box sx={{ overflow: 'auto' }}>
          <List>
          {menuItems.map((item) => (
            <ListItem 
              button
              component={Link} 
              key={item.text} 
              to={item.path}
             // onClick={() => console.log('you clicked me')}

         //     className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon style={{fill: "gold"}}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} 
                            primaryTypographyProps={{
                              color:'secondary', 
                              fontWeight:'large', 
                              variant: 'h5' 
                            }}
              
              
              
              />
            </ListItem>
          ))}
          </List>
           
        </Box>
      </Drawer>
      <main className={classes.content}>{children}</main>
      {!isExtensionWidth && <Footer />}
    </>
  );
}

 

function NavigationButtons() {
  const isExtensionWidth = useIsExtensionWidth();
  const [page] = usePage();

  if (isExtensionPopup) {
    return null;
  }

  let elements = [];
  if (page === 'wallet') {
    elements = [
      isExtension && <ConnectionsButton />,
      <WalletSelector />,
      <NetworkSelector />,
    ];
  } else if (page === 'connections') {
    elements = [<WalletButton />];
  }

  if (isExtension && isExtensionWidth) {
    elements.push(<ExpandButton />);
  }

  return elements;
}

function ExpandButton() {
  const onClick = () => {
    window.open(chrome.extension.getURL('index.html'), '_blank');
  };

  return (
    <Tooltip title="Expand View">
      <IconButton color="inherit" onClick={onClick}>
        <OpenInNew />
      </IconButton>
    </Tooltip>
  );
}

function WalletButton() {
  const classes = useStyles();
  const setPage = usePage()[1];
  const onClick = () => setPage('wallet');

  return (
    <>
      <Hidden smUp>
        <Tooltip title="Wallet Balances">
          <IconButton color="inherit" onClick={onClick}>
            <MonetizationOn />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden xsDown>
        <Button color="inherit" onClick={onClick} className={classes.button}>
          Wallet
        </Button>
      </Hidden>
    </>
  );
}

function ConnectionsButton() {
  const classes = useStyles();
  const setPage = usePage()[1];
  const onClick = () => setPage('connections');
  const connectedWallets = useConnectedWallets();

  const connectionAmount = Object.keys(connectedWallets).length;

  return (
    <>
      <Hidden smUp>
        <Tooltip title="Manage Connections">
          <IconButton color="inherit" onClick={onClick}>
            <Badge
              badgeContent={connectionAmount}
              classes={{ badge: classes.badge }}
            >
              <ConnectionIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden xsDown>
        <Badge
          badgeContent={connectionAmount}
          classes={{ badge: classes.badge }}
        >
          <Button color="inherit" onClick={onClick} className={classes.button}>
            Connections
          </Button>
        </Badge>
      </Hidden>
    </>
  );
}

function NetworkSelector() {
  const { endpoint, setEndpoint } = useConnectionConfig();
  const cluster = useMemo(() => clusterForEndpoint(endpoint), [endpoint]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addCustomNetworkOpen, setCustomNetworkOpen] = useState(false);
  const classes = useStyles();
  

  return (
    <>
      <AddCustomClusterDialog
        open={addCustomNetworkOpen}
        onClose={() => setCustomNetworkOpen(false)}
        onAdd={({ name, apiUrl }) => {
          addCustomCluster(name, apiUrl);
          setCustomNetworkOpen(false);
        }}
      />
      <Hidden xsDown>
        <Button
          color="inherit"
          onClick={(e) => setAnchorEl(e.target)}
          className={classes.button}
        >
          {cluster?.label ?? 'Network'}
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title="Select Network" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <SolanaIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        {getClusters().map((cluster) => (
          <MenuItem
            key={cluster.apiUrl}
            onClick={() => {
              setAnchorEl(null);
              setEndpoint(cluster.apiUrl);
            }}
            selected={cluster.apiUrl === endpoint}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {cluster.apiUrl === endpoint ? (
                <CheckIcon fontSize="small" />
              ) : null}
            </ListItemIcon>
            {cluster.name === 'mainnet-beta-backup'
              ? 'Mainnet Beta Backup'
              : cluster.apiUrl}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            setCustomNetworkOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
          </ListItemIcon>
          {customClusterExists() ? 'Edit Custom Endpoint' : 'Add Custom Endpoint'}
        </MenuItem>
      </Menu>
    </>
  );
}

function WalletSelector() {
  const {t} = useTranslation();
  const {
    accounts,
    derivedAccounts,
    hardwareWalletAccount,
    setHardwareWalletAccount,
    setWalletSelector,
    addAccount,
  } = useWalletSelector();
  const [anchorEl, setAnchorEl] = useState(null);
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [
    addHardwareWalletDialogOpen,
    setAddHardwareWalletDialogOpen,
  ] = useState(false);
  const [deleteMnemonicOpen, setDeleteMnemonicOpen] = useState(false);
  const [exportMnemonicOpen, setExportMnemonicOpen] = useState(false);
  const classes = useStyles();
 
  if (accounts.length === 0) {
    return null;
  }
  return (
    <>
      <AddHardwareWalletDialog
        open={addHardwareWalletDialogOpen}
        onClose={() => setAddHardwareWalletDialogOpen(false)}
        onAdd={({ publicKey, derivationPath, account, change }) => {
          setHardwareWalletAccount({
            name: t('HardwareWallet'),
            publicKey,
            importedAccount: publicKey.toString(),
            ledger: true,
            derivationPath,
            account,
            change,
          });
          setWalletSelector({
            walletIndex: undefined,
            importedPubkey: publicKey.toString(),
            ledger: true,
            derivationPath,
            account,
            change,
          });
        }}
      />
      <AddAccountDialog
        open={addAccountOpen}
        onClose={() => setAddAccountOpen(false)}
        onAdd={({ name, importedAccount }) => {
          addAccount({ name, importedAccount });
          setWalletSelector({
            walletIndex: importedAccount ? undefined : derivedAccounts.length,
            importedPubkey: importedAccount
              ? importedAccount.publicKey.toString()
              : undefined,
            ledger: false,
          });
          setAddAccountOpen(false);
        }}
      />
      <ExportMnemonicDialog
        open={exportMnemonicOpen}
        onClose={() => setExportMnemonicOpen(false)}
      />
      <DeleteMnemonicDialog
        open={deleteMnemonicOpen}
        onClose={() => setDeleteMnemonicOpen(false)}
      />
      <Hidden xsDown>
        <Button
          color="inherit"
          onClick={(e) => setAnchorEl(e.target)}
          className={classes.button}
        >
          {t("Account")}
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title= {t('SelectAccount')} arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <AccountIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        {accounts.map((account) => (
          <AccountListItem
            account={account}
            classes={classes}
            setAnchorEl={setAnchorEl}
            setWalletSelector={setWalletSelector}
          />
        ))}
        {hardwareWalletAccount && (
          <>
            <Divider />
            <AccountListItem
              account={hardwareWalletAccount}
              classes={classes}
              setAnchorEl={setAnchorEl}
              setWalletSelector={setWalletSelector}
            />
          </>
        )}
        <Divider />
        <MenuItem onClick={() => setAddHardwareWalletDialogOpen(true)}>
          <ListItemIcon className={classes.menuItemIcon}>
            <UsbIcon fontSize="small" />
          </ListItemIcon>
          {t('ImportHardwareWallet')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setAddAccountOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          {t('AddAccount')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setExportMnemonicOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <ImportExportIcon fontSize="small" />
          </ListItemIcon>
          {t('ExportMnemonic')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setDeleteMnemonicOpen(true);
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          {t('DeleteMnemonicLogOut')}
        </MenuItem>
      </Menu>
    </>
  );
}

const useFooterStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(2),
  },
}));

function Footer() {
  const classes = useFooterStyles();
  const {t} = useTranslation();

  return (
    <footer className={classes.footer}>
      <Typography>
        {t('RayaSoftwareSystems')} {"©"}
      </Typography>
    </footer>
  );
}

function AccountListItem({ account, classes, setAnchorEl, setWalletSelector }) {
  return (
    <MenuItem
      key={account.address.toBase58()}
      onClick={() => {
        setAnchorEl(null);
        setWalletSelector(account.selector);
      }}
      selected={account.isSelected}
      component="div"
    >
      <ListItemIcon className={classes.menuItemIcon}>
        {account.isSelected ? <CheckIcon fontSize="small" /> : null}
      </ListItemIcon>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography>{account.name}</Typography>
        <Typography color="textSecondary">
          {account.address.toBase58()}
        </Typography>
      </div>
    </MenuItem>
  );
}
