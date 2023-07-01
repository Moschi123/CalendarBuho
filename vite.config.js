import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['date-fns/locale/es'], // Aquí se especifican los módulos que no se deben incluir en el paquete
    },
  },
});
