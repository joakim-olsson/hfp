import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Basic Vite config for a React single page app.
export default defineConfig({
  plugins: [react()],
});
