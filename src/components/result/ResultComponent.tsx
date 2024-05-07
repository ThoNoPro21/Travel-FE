import { Button, Result, Space } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import Link from 'next/link';
import React from 'react';

type Props = {
    status: ResultStatusType;
    title: string;
    subTitle: string;
    textButtonOk?: string;
    textButtonCancel?: string;
    linkOk?: string;
    linkCancel?: string;
};

const ResultComponent = (props: Props) => {
    return (
        <Result
            status={props.status}
            className="md:tw-pt-20 md:tw-px-13 tw-min-h-screen"
            title={props.title}
            subTitle={props.subTitle}
            extra={
                <Space>
                    {props.linkCancel && (
                        <Link href={props.linkCancel || '/'}>
                            <Button className="tw-bg-gray-350 tw-font-medium tw-text-white tw-font-lora">
                                {props.textButtonCancel}
                            </Button>
                        </Link>
                    )}
                    {props.linkOk && (
                        <Link href={props.linkOk || '/'}>
                            <Button className="tw-bg-orange-500 tw-font-medium tw-text-white tw-font-lora">
                                {props.textButtonOk}
                            </Button>
                        </Link>
                    )}
                </Space>
            }
        />
    );
};

export default ResultComponent;
