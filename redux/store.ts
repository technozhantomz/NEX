import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import accountReducer from './slices/accountSlice'

export const store = configureStore({
    reducer: {
        account: accountReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action<string>
// >;