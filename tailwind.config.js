export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0C',
        paper: '#FAFAF7',
        mist: '#EDEDE8',
        energy: '#B8F400',
        nad: '#1E4DFF',
        sleep: '#5B21D6',
        focus: '#FF2E88',
        immunity: '#FFE14D',
      },
      fontFamily: {
        display: ['Fredoka', 'system-ui', 'sans-serif'],
        label: ['Anton', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        snappy: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
};
