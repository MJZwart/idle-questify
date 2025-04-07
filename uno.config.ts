import {defineConfig, presetWind, presetAttributify, presetTypography} from 'unocss';

export default defineConfig({
    presets: [presetWind(), presetAttributify(), presetTypography()],
    shortcuts: {
        panel: 'bg-nav-panel rounded-lg drop-shadow-lg'
    },
    theme: {
        colors: {
            body: '#1a1a1a',
            bodyText: '#e0e0e0',
            navPanel: '#2d2d2d',
            panel: '#404040',
            panelOffset: '#505050',
            statsPanel: '#242424',
            actionPanel: '#202020',
            green: '#4CAF50',
            red: '#f44336',

            buttonColor: '#1a1a1a',
            buttonHover: '#2a2a2a',
        }
    }
});