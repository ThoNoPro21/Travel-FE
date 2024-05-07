'use client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Account from '../components/Account';

export default function StoreProvider({ children }: any) {
    return (
        <Provider store={store}>
            <Account />
            {children}
        </Provider>
    );
}
