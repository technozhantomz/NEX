import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


export interface AccountState {
    id: string;
    name: string;
}

const initialState: AccountState = {
    id: '',
    name: '',
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, { payload }: PayloadAction<AccountState>) => {
            state = payload;
        },
        removeAccount: (state) => {
            state = {
                id: '',
                name: ''
            };
        }
    }
});

export const { setAccount, removeAccount } = accountSlice.actions

export const getAccount = (state: RootState) => state.account

export default accountSlice.reducer