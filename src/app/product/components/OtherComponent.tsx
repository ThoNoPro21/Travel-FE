import React from 'react';
import ListPlaceProduct from '../../components/common/ListPlaceProduct';

type Props = {};

const OtherComponent = (props: Props) => {
    return (
        <>
            {[0, 1, 2, 3, 4].map((item) => (
                <ListPlaceProduct key={item} name="Siêu thị Cô Như" src="khac" item={item} />
            ))}
        </>
    );
};

export default OtherComponent;
