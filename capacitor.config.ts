import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'camera.project',
  appName: 'camera-project',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
