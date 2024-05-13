'use client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Account from '../components/Account';
import HeaderComponent from '../components/navbars/HeaderComponent';
import FooterComponent from '../components/navbars/FooterComponent';
import { useAppSelector } from '../store/hooks';

export default function StoreProvider({ children }: any) {
    const header =useAppSelector((state)=>state.dataCommon.showHeader)
    return (
        <Provider store={store}>
            <Account />
            {header && <HeaderComponent />}
            {children}
            {header && <FooterComponent />}
        </Provider>
    );
}
