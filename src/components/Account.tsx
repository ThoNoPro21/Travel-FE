import { Spin } from 'antd';
import { useGetMeQuery, useGetTokenQuery } from '../store/queries/apiAuth.query';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLogin, setStatus, setUser } from '../store/slices/auth.slice';
import { useEffect } from 'react'; // Import useEffect hook
import { RootState } from '../store/store';

type Props = {};
const Account = (props: Props) => {
    const dispatch = useAppDispatch();
    const { status: status_token, isLoading: isLoading_token } = useGetTokenQuery('');
    const { data: response_me, status: status_me,isSuccess:isSuccess_me, isLoading: isLoading_me } = useGetMeQuery('');

    useEffect(() => {
        if (status_me === 'rejected' || status_me === 'fulfilled') {
            dispatch(setStatus());
            dispatch(setUser(response_me?.data));
        }
    }, [status_me, isSuccess_me]);

    if (isLoading_token || isLoading_me) {
        return <Spin fullscreen />;
    }

    return null;
};
export default Account;
