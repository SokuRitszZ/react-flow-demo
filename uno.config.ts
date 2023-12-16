import { defineConfig, presetMini } from 'unocss';

export default defineConfig({
  presets: [
    presetMini(),
  ],
  shortcuts: {
    bd: 'border border-solid border-gray',
    ct: 'flex justify-center items-center',
  },
});