import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  const fallback = document.createElement('div');
  fallback.id = 'root';
  document.body.appendChild(fallback);
  createRoot(fallback).render(<App />);
} else {
  createRoot(rootElement).render(<App />);
}

