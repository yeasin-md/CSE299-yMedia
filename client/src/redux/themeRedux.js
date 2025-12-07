// Theme Redux Slice - Manages theme state (dark/light mode and color preferences)
import { createSlice } from '@reduxjs/toolkit';

// Initial state: default to light mode with default color
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light', // 'light' or 'dark' - controls the overall brightness
    color: 'default', // 'default', 'pink', 'blue', 'yellow', 'offwhite' - controls background color
  },
  reducers: {
    // Action to change theme mode (light/dark)
    setThemeMode: (state, action) => {
      state.mode = action.payload;
    },
    // Action to change theme color (default, pink, blue, yellow, offwhite)
    setThemeColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

// Export actions for use in components
export const { setThemeMode, setThemeColor } = themeSlice.actions;
// Export reducer for use in store
export default themeSlice.reducer;

