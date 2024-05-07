import { Col, Empty, Flex, Pagination, Row, Skeleton, Space } from 'antd';
import React, { useState } from 'react';
import DacSanComponent from '../../components/common/DacSanComponent';
import TabsComponent from '../../components/common/TabsComponent';
import { productType } from '@/src/types/Product';
import { PaginationApiResponseData } from '@/src/types/ApiRespone';
import ArticleComponent from '../../components/article/ArticleComponent';
import ArticleNew from '../../components/ArticleNew';
import { festivalType } from '@/src/types/Festival';
import { getArticleType } from '@/src/types/Article';
import CardArticle from '../../components/article/CardArticle';
import {
    useGetArticleByPlaceQuery,
    useGetFestivalByPlaceQuery,
    useGetProductByPlaceQuery,
} from '@/src/store/queries/apiPlace.query';
import FestivalComponent from '../../components/festival/FestivalComponent';
import { useRouter } from 'next/navigation';

const tabOptions = [
    {
        label: <p className="tw-p-2">Đặc sản</p>,
        value: '0',
    },
    {
        label: <p className="tw-p-2">Sự kiện</p>,
        value: '1',
    },
    {
        label: <p className="tw-p-2">Bài viết</p>,
        value: '2',
    },
];

type Props = {
    place_id: number;
};
const Discover = (props: Props) => {
    const router = useRouter();
    const [tabActive, setTabActive] = useState(0);
    const [pageFestival, setPageFestival] = useState(1);
    const [pageProduct, setPageProduct] = useState(1);
    const [pageArticle, setPageArticle] = useState(1);
    const {
        data: response_getProductByPlace,
        isSuccess: isSuccess_getProductByPlace,
        isLoading: isLoading_getProductByPlace,
        refetch: refetch_getProductByPlace,
    } = useGetProductByPlaceQuery([props.place_id, pageProduct]);
    const {
        data: response_getFestivalByPlace,
        isSuccess: isSuccess_getFestivalByPlace,
        isLoading: getFestivalByPlace,
        refetch: refetch_getFestivalByPlace,
    } = useGetFestivalByPlaceQuery([props.place_id, pageFestival], { skip: tabActive === 0 || tabActive === 2 });
    const {
        data: response_getArticleByPlace,
        isSuccess: isSuccess_getArticleByPlace,
        isLoading: isLoading_getArticleByPlace,
        refetch: refetch_getArticleByPlace,
    } = useGetArticleByPlaceQuery([props.place_id, pageArticle], { skip: tabActive === 0 || tabActive === 1 });

    const getTabActive = (value: number) => {
        setTabActive(value);
    };

    const onChangeNewPageProduct = (newPage: number) => {
        setPageProduct(newPage);
    };
    const onChangeNewPageFestival = (newPage: number) => {
        setPageFestival(newPage);
    };
    const onChangeNewPageArticle = (newPage: number) => {
        setPageArticle(newPage);
    };

    return (
        <Row>
            <Col className="gutter-row" span={24}>
                <Flex justify="space-between" align="flex-start" className="tw-w-full tw-font-lora">
                    <Space direction="vertical">
                        <h1 className="tw-font-bold tw-text-xl lg:tw-text-2xl">Khám phá nơi đây</h1>
                        <p className="lg:tw-text-lg tw-text-base tw-font-medium">Có thể bạn sẽ thích ?</p>
                    </Space>
                    <TabsComponent options={tabOptions} getTab={getTabActive} />
                </Flex>
            </Col>
            <Col
                className="gutter-row tw-bg-gradient-to-r tw-from-cyan-100 tw-to-fuchsia-200 tw-rounded-lg tw-p-6 tw-space-y-10"
                span={24}
            >
                <div className="tw-grid tw-grid-cols-6 tw-grid-flow-row tw-gap-4 tw-w-full ">
                    {tabActive === 0 && (
                        <>
                            {response_getProductByPlace?.success && response_getProductByPlace?.data.data.length > 0 ? (
                                response_getProductByPlace?.data.data.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => router.push(`http://localhost:3355/product/${item.products_id}`)}
                                    >
                                        <DacSanComponent
                                            price={item.price}
                                            name={item.name}
                                            product_id={item.products_id}
                                            src={item.images.avatar}
                                        />
                                    </div>
                                ))
                            ) : (
                                <Empty className="tw-col-span-6" description="Không có dữ liệu !" />
                            )}

                            {response_getProductByPlace?.success && (
                                <Flex className=" tw-col-span-6">
                                    <Pagination
                                        className="tw-flex-initial tw-m-auto"
                                        onChange={onChangeNewPageProduct}
                                        defaultCurrent={1}
                                        total={response_getProductByPlace?.data.total || 0}
                                        pageSize={response_getProductByPlace?.data.per_page || 10}
                                        current={response_getProductByPlace?.data.current_page || 1}
                                    />
                                </Flex>
                            )}
                        </>
                    )}
                    {tabActive === 1 && (
                        <>
                            {response_getFestivalByPlace?.success &&
                            response_getFestivalByPlace?.data?.data?.length > 0 ? (
                                response_getFestivalByPlace?.data?.data.map((item, index) => (
                                    <div
                                        className="tw-col-span-3"
                                        key={index}
                                        onClick={() =>
                                            router.push(`http://localhost:3355/festival/${item.festivals_id}`)
                                        }
                                    >
                                        <FestivalComponent
                                            location={item.location.name}
                                            start_date={item.start_date}
                                            end_date={item.end_date}
                                            address={item.address}
                                            title={item.name}
                                            images={item.images}
                                        />
                                    </div>
                                ))
                            ) : (
                                <Empty className="tw-col-span-6" description="Không có dữ liệu !" />
                            )}
                            {response_getFestivalByPlace?.success && (
                                <Flex className=" tw-col-span-6">
                                    <Pagination
                                        className="tw-flex-initial tw-m-auto"
                                        onChange={onChangeNewPageProduct}
                                        defaultCurrent={1}
                                        total={response_getFestivalByPlace?.data?.total || 0}
                                        pageSize={response_getFestivalByPlace?.data?.per_page || 10}
                                        current={response_getFestivalByPlace?.data?.current_page || 1}
                                    />
                                </Flex>
                            )}
                        </>
                    )}

                    {tabActive === 2 && (
                        <>
                            {response_getArticleByPlace?.success && response_getArticleByPlace?.data.data.length > 0 ? (
                                response_getArticleByPlace?.data.data.map((item, index) => (
                                    <div
                                        className="tw-col-span-2"
                                        key={index}
                                        onClick={() => router.push(`http://localhost:3355/blog/${item.articles_id}`)}
                                    >
                                        <CardArticle
                                            image={item.images}
                                            username={item.user.name}
                                            user_avatar={item.user.avatar}
                                            title={item.title}
                                        />
                                    </div>
                                ))
                            ) : (
                                <Empty className="tw-col-span-6" description="Không có dữ liệu !" />
                            )}
                            {response_getArticleByPlace?.success && (
                                <Flex className=" tw-col-span-6">
                                    <Pagination
                                        className="tw-flex-initial tw-m-auto"
                                        onChange={onChangeNewPageArticle}
                                        defaultCurrent={1}
                                        total={response_getArticleByPlace?.data.total || 0}
                                        pageSize={response_getArticleByPlace?.data.per_page || 10}
                                        current={response_getArticleByPlace?.data.current_page || 1}
                                    />
                                </Flex>
                            )}
                        </>
                    )}
                </div>
            </Col>
        </Row>
    );
};

export default Discover;
