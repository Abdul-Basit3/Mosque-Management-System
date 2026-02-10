import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Content {
  id: number;
  type: string;
  title: string;
  arabicText: string;
  transliteration?: string;
  translation: string;
  reference?: string;
}

interface ContentState {
  dailyVerse: Content | null;
  dailyDua: Content | null;
}

const initialState: ContentState = {
  dailyVerse: null,
  dailyDua: null
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setDailyVerse: (state, action: PayloadAction<Content>) => {
      state.dailyVerse = action.payload;
    },
    setDailyDua: (state, action: PayloadAction<Content>) => {
      state.dailyDua = action.payload;
    }
  }
});

export const { setDailyVerse, setDailyDua } = contentSlice.actions;
export default contentSlice.reducer;
