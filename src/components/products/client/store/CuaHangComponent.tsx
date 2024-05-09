import React from 'react';
import ListPlaceProduct from '../../ListPlaceProduct';

type Props = {};

const CuaHangComponent = (props: Props) => {
    return (
        <>
            {[0, 1, 2, 3, 4].map((item) => (
                <ListPlaceProduct key={item} name="Cửa hàng TMA" src="cuahang" item={item} />
            ))}
        </>
    );
};

export default CuaHangComponent;
