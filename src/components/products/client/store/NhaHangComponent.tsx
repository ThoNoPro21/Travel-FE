import React from 'react';
import ListPlaceProduct from '../../ListPlaceProduct';

type Props = {};

const NhaHangComponent = (props: Props) => {
    return (
        <>
            {[0, 1, 2, 3, 4].map((item) => (
                <ListPlaceProduct key={item} name="Nhà hàng Hải Âu" src="nhahang" item={item} />
            ))}
        </>
    );
};

export default NhaHangComponent;
