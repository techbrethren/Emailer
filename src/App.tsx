import React from 'react';
import logo from './logo.svg';
import { PrimaryButton, Fabric, Customizer, loadTheme, createTheme, Stack } from '@fluentui/react'
import {
  AzureThemeDark
} from '@uifabric/azure-themes';
import './App.css';
import Input from "./Components/Input";
import Preview from "./Components/Preview"

const customizations = AzureThemeDark;

const myTheme = createTheme({
  palette: {
    themePrimary: '#5c9ed1',
    themeLighterAlt: '#040608',
    themeLighter: '#0f1921',
    themeLight: '#1c303f',
    themeTertiary: '#375f7d',
    themeSecondary: '#518bb8',
    themeDarkAlt: '#6aa7d6',
    themeDark: '#7eb4dc',
    themeDarker: '#9dc6e5',
    neutralLighterAlt: '#262121',
    neutralLighter: '#2f2a2a',
    neutralLight: '#3d3737',
    neutralQuaternaryAlt: '#463f3f',
    neutralQuaternary: '#4d4646',
    neutralTertiaryAlt: '#6b6363',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#1c1919',
  }
});

loadTheme(myTheme);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Fabric>
          <Customizer {...customizations}>
            <div>
              <Stack>
                <Stack.Item align="auto">
                <Input />
                <Preview />
                </Stack.Item>
                <Stack.Item align="auto">
                <Preview />
                </Stack.Item>
                
              </Stack>
            </div>
            <PrimaryButton>
              Test
            </PrimaryButton>
          </Customizer>
        </Fabric>
      </header>
    </div>
  );
}

export default App;
