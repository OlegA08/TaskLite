// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider } from '@emotion/react';
import { TasksPage } from './pages/tasks-page';
import { GlobalStyles } from './styles/global';
// import { Button } from './Button';
import { theme } from './styles/themes';

export function App() {
    return (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <TasksPage />
    </ThemeProvider>
  );
}

export default App
