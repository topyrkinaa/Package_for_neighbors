import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

import Colors from '../../utils/colors';
import store from '../../store/store';
import Actions from '../../reducers/actions/user';

interface Props {
  window?: () => Window;
}

const Logo = require("../../assets/img/logo.png");

const whiteTheme = createTheme({
  palette: {
    primary: {
      main: Colors.const.blue, // Синий цвет текста
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.const.white,
          boxShadow: '2px 2px 5px rgba(5, 70, 240, 0.25)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          color: Colors.const.blue,
        },
      },
    },
  },
});

const userToken = localStorage.token;

const UserLogout = () => {
  store.dispatch(Actions.fetchUserLogout());
  
};

const dummyOnClick = () => {}; 


const isTokenAuth = (userToken: any) => {
  if (userToken) {
    return [
      { text: 'Выйти', route: '/', onClick: UserLogout },
    ];
  } else {
    return [
      { text: 'Войти', route: 'login', onClick: dummyOnClick },
      { text: 'Регистрация', route: 'register', onClick: dummyOnClick },
    ];
  }
};

const drawerWidth = 240;

const navItems = [
  { text: 'Войти', route: 'login' },
  { text: 'Регистрация', route: 'register' },
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText
                primary={item.text}
                sx={{
                  fontFamily: 'Comfortaa',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: (theme) => theme.palette.primary.main, 
                  '&:hover': {
                    color: (theme) => theme.palette.primary.main, 
                    transition: 'color 0.3s ease-in-out', // Анимация цвета
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  
  const navigate = useNavigate();
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ThemeProvider theme={whiteTheme}>
        <AppBar component="nav">
          <Toolbar>
            <img src={String(Logo)} alt="logo" onClick={() => navigate("/homesocial")} onKeyDown={() => navigate("/homesocial")}  style={{ cursor: 'pointer' }}  />
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                ml: 2,
                display: { xs: 'none', sm: 'block' },
                fontFamily: 'Comfortaa',
                fontWeight: 700,
              }}
            >
              вДоме
            </Typography>
            { userToken ? (
              <Typography
              variant="h5"
              component="div"
              sx={{
                ml: 3,
                display: { xs: 'none', sm: 'block' },
                fontFamily: 'Comfortaa',
                fontWeight: 700,
                fontSize: '14px',
                color: Colors.const.blue,
                marginRight: '20px'
              }}
            >
              Добрый день!
            </Typography>
            ): null }
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {isTokenAuth(userToken).map((item) => (
                <Link key={item.text} to={item.route} onClick={item.onClick} >
                  <Button
                    key={item.text}
                    sx={{
                      color: Colors.const.blue,
                      fontFamily: 'Montserrat',
                      fontWeight: 700,
                      fontSize: '14px'
                    }}
                  >
                    {item.text}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

