import React, { useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, styled, useTheme } from '@material-ui/core/styles';
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
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SolanaIcon from './SolanaIcon';
import CodeIcon from '@material-ui/icons/Code';
import Tooltip from '@material-ui/core/Tooltip';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import AddAccountDialog from './AddAccountDialog';
import DeleteMnemonicDialog from './DeleteMnemonicDialog';
import AddHardwareWalletDialog from './AddHarwareWalletDialog';
import { ExportMnemonicDialog } from './ExportAccountDialog.js';
import { useWallet, WalletProvider } from '../utils/wallet';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import logoIcon from "../Islamic Crypto Funding-logos/Islamic Crypto Funding-logos_white.png"
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TranslateIcon from '@material-ui/icons/TranslateOutlined';
import NetworkWifiOutlinedIcon from '@material-ui/icons/NetworkWifiOutlined';
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
import Paper from '@material-ui/core/Paper';
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const useStyles = makeStyles((theme) => ({
  /* @noflip */
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
    /* @noflip */
    marginLeft: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
  menuItemIcon: {
    /* @noflip */
    minWidth: 32,
  },
  badge: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.main,
    height: 16,
    width: 16,
  },
  appBar: {
    /* @noflip */
    postion: 'fixed',
    

  },
  drawer: {
    /* @noflip */
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    /* @noflip */
    position: "fixed",
    width: drawerWidth,
    borderRadius: 0,
    borderTop: "none",
    background: theme.palette.primary.main,
    borderBottom: "none",
    top: theme.spacing(8), // push content down to fix scrollbar position
      // subtract appbar height
  },
  drawerContent: {
    overflow: "auto",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 4,
  },
  toolbar:
  /* @noflip */
   theme.mixins.toolbar,

}));
const rtlLanguages = ["ar"];
function setPageDirection(language) {
  console.log("Lan language"+language)
  const dir = rtlLanguages.includes(language) ? "rtl" : "ltr"
  console.log("Lan dir"+dir)
  document.documentElement.dir = dir
}
export default function NavigationFrame({ children }) {
  const theme = useTheme();
  const classes = useStyles();
  const isExtensionWidth = useIsExtensionWidth();
  const {t} = useTranslation();
  const wallet = useWallet();
  


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
      text: 'Invest', 
      icon: <AccountBalanceIcon color="secondary" fontSize="large" />, 
      path: '/Invest' 
    },
   
    { 
      text: 'Borrow', 
      icon: <PaymentIcon color="secondary" fontSize="large" />, 
      path: '/Borrow' 
    },
  ];
    const { i18n } = useTranslation();
    
    
    const [mobileOpen, setMobileOpen] = useState(false);
    console.log(mobileOpen.toString() + "<-- mobileOpen")
    
    const handleDrawerToggle = () => {
      if (wallet)
      {
        setMobileOpen(!mobileOpen);
        console.log(mobileOpen.toString() + "<-- mobileOpen")
      }
     
      };
    const container = window !== undefined ? () => window().document.body : undefined;
    const [open, setOpen] = useState(false);
   // const [language, setLanguage] = useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
/*
    const handleLangChange = (event) => {
      const lang = event.target.value;

    console.log("U clicked me "+lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
    setPageDirection(lang);
    };*/
    const clickoutside = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;         
      }
      setOpen(false);
    }
    const handleClose = (event) => {
      const lang = event.nativeEvent.target.outerText
       if (lang){
        console.log("U clicked me "+lang);
        i18n.changeLanguage(lang);
        setPageDirection(lang);
       }
      
  
      setOpen(false);
    };
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  return (
    <>

      <AppBar position="fixed" className={classes.appBar} 
          sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }} >
          
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
        <Tooltip title="Open Drawer">
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
            

           </IconButton>
           </Tooltip>
           <Divider orientation="vertical" style={{ background: 'white' }} flexItem />
          

        <br/>
        
        <img src={logoIcon} style={{ width: '100px', height: '92px' }} />

          <Typography variant="h6" className={classes.title} component="h1" align="center">

            {t('IslamicCryptoFunding')}
            

          </Typography>
          <NavigationButtons />

         
          <Tooltip title="Change Language!" arrow>
         <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <TranslateIcon color="secondary"/>
        </Button>
        </Tooltip>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={clickoutside}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem value="en" onClick=  {handleClose}>English</MenuItem>
                    <MenuItem value="ar" onClick={handleClose}>Arabic</MenuItem>
                    <MenuItem onClick={handleClose}>Swedish</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        

        </Toolbar>
      </AppBar>
      <Paper>
        <div className={classes.toolbar} />
         
      </Paper>
      <Drawer
      container={container}
      
      variant="persistent"
      anchor="left"
      open={!mobileOpen && wallet}
      onClose={handleDrawerToggle}
      elevation={0}
      PaperProps={{
      variant: "outlined"
        }}
        classes={{
          paper: classes.drawerPaper
        }}
      containerStyle={{height: 'calc(100% - 64px)', top: 64}}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}  
       
      >
      <DrawerHeader>
       <IconButton color="secondary" fontSize="large" onClick={handleDrawerToggle}>
         {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
       </IconButton>
     </DrawerHeader>
     <Divider />
      <Toolbar />

     <Box sx={{ overflow: 'auto' }}>
          <List>
          {menuItems.map((item) => (
            <ListItem 
              button
              component={Link} 
              key={item.text} 
              to={item.path}
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
  const {t} = useTranslation();
  

  return (
    <>
    
      
      <Hidden xsDown>
        <Button
          color="inherit"
          onClick={(e) => setAnchorEl(e.target)}
          className={classes.button}
        >
          {cluster?.label ?? t('Network')}
          <NetworkWifiOutlinedIcon />
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title= {t('SelectNetwork')} arrow>
           

        

        </Tooltip>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorPosition={{ top: 100, left: 1700 }}
        anchorReference="anchorPosition"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
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
              ? t('MainnetBetaBackup')
              : cluster.apiUrl}
          </MenuItem>
        ))}
       
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
         <AccountBalanceIcon /> {'  -- '}
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
        anchorPosition={{ top: 100, left: 1200 }}
        anchorReference="anchorPosition"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
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
