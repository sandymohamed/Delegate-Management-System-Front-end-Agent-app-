import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/path';
import { AuthProvider } from './context/AuthContext';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// theme
import { ThemeProvider } from '@mui/material';
import { cacheRtl, MuiTheme } from './theme/MuiTheme';
import { CacheProvider } from '@emotion/react';


// --------------------------------------------------------------------
const App = () => {


  return (
    <AuthProvider>
      <CacheProvider value={cacheRtl}>

        <ThemeProvider theme={MuiTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Provider store={store}>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </Provider>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  );
};

export default App;