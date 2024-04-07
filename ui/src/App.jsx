import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";

import Box from '@mui/material/Box';
import { SnackbarProvider } from 'notistack';
import Header from "./components/header";
import { DojoProvider } from "./contexts/dojoContext";
import { mainTheme } from './helpers/themes';

import { useState } from 'react';
import { StarknetProvider } from "./contexts/starknet";
import MainPage from './pages/MainPage';

function App() {
  const [connectWallet, showConnectWallet] = useState(false)

  return (
    <BrowserRouter>
      <Box className='background'>
        <StyledEngineProvider injectFirst>

          <ThemeProvider theme={mainTheme}>
            <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} preventDuplicate>

              <StarknetProvider>
                <DojoProvider showConnectWallet={showConnectWallet}>

                  <Box className='main'>

                    <Header connectWallet={connectWallet} showConnectWallet={showConnectWallet} />

                    <MainPage />
                  </Box>

                </DojoProvider>
              </StarknetProvider>

            </SnackbarProvider>
          </ThemeProvider>

        </StyledEngineProvider>
      </Box>
    </BrowserRouter >
  );
}

export default App
