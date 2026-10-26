import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPrices } from '../api/hsprice';

async function requestGoods(params, { rejectWithValue, signal }) {
  try {
    const result = await fetchPrices(params, signal);
    if (result.error) {
      return rejectWithValue(result.error);
    }
    return result.goods;
  } catch (error) {
    if (error?.name === 'AbortError' || signal.aborted) {
      throw error;
    }
    return rejectWithValue(error?.message || 'Не удалось выполнить запрос.');
  }
}

export const brandParts = createAsyncThunk('search/brand', requestGoods);
export const searchParts = createAsyncThunk('search/parts', requestGoods);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    brandStatus: 'idle',
    brandError: null,
    brands: [],
    status: 'idle',
    error: null,
    goods: [],
    query: { number: '', brand: '' },
  },
  reducers: {
    clearBrands(state) {
      state.brandStatus = 'idle';
      state.brandError = null;
      state.brands = [];
    },
    clearGoods(state) {
      state.status = 'idle';
      state.error = null;
      state.goods = [];
      state.query = { number: '', brand: '' };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(brandParts.pending, (state, action) => {
        state.brandStatus = 'loading';
        state.brandError = null;
        state.brands = [];
      })
      .addCase(brandParts.fulfilled, (state, action) => {
        state.brandStatus = 'success';
        state.brands = action.payload;
      })
      .addCase(brandParts.rejected, (state, action) => {
        if (action.meta.aborted) {
          return;
        }
        state.brandStatus = 'error';
        state.brands = [];
        state.brandError = action.payload || 'Не удалось выполнить запрос.';
      })
      .addCase(searchParts.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.query = {
          number: action.meta.arg.number.trim(),
          brand: action.meta.arg.brand.trim(),
        };
      })
      .addCase(searchParts.fulfilled, (state, action) => {
        state.status = 'success';
        state.goods = action.payload;
      })
      .addCase(searchParts.rejected, (state, action) => {
        if (action.meta.aborted) {
          return;
        }
        state.status = 'error';
        state.error = action.payload || 'Не удалось выполнить запрос.';
      });
  },
});

export const { clearBrands, clearGoods } = searchSlice.actions;

export default searchSlice.reducer;
