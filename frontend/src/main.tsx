/**
 * Vetri Driving Academy — Frontend Application Entry Point
 * ========================================================
 * Role & Purpose:
 * - Bootstraps the React 19 application and mounts it to the DOM root element.
 * - Imports the master stylesheet (index.css) including Tailwind utilities and typography.
 * - Runs in React.StrictMode for development quality checks and runtime safety.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a <div id="root"> in your HTML.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
