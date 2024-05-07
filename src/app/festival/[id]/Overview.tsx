import { Card, Flex, Steps } from 'antd'
import Image from 'next/image'
import React from 'react'
import { isValidJsonString } from '../../components/common/validate/String';
import { imagesJson } from '@/src/types/Article';


type Props = {
    listJson:imagesJson;
    address:string;
    end_date:Date;
    start_date:Date;
    name:string;
    price:number;
}
const Overview = (props: Props) => {
    const startDate = new Date(props.start_date);
    const endDate = new Date(props.end_date);
    const formattedStartDate = startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear();
    const formattedEndDate = endDate.getDate() + '/' + (endDate.getMonth() + 1) + '/' + endDate.getFullYear();
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();
    const itemSteps = [
        {
            title: 'Địa điểm ',
            description: `${props.address}`,
        },
        {
            title: 'Thời gian diễn ra',
            description: `${formattedStartDate} - ${formattedEndDate} `,
        },
        {
            title: 'Khoảng thời gian',
            description: `${startHour} - ${endHour}h`,
        },
        {
            title: 'Mở cửa',
            description: '24/24',
        },
        {
            title: 'Vé',
            description: `${props.price==0 ? 'Free' :props.price}`,
        },
    ];
    let image:imagesJson|undefined;
    if(isValidJsonString(String(props.listJson))){
        image=JSON.parse(String(props.listJson));
    }
  return (
    <Card
    hoverable
    bordered={false}
    className="tw-relative lg:tw-max-h-screen tw-mb-30 tw-px-4 tw-drop-shadow-lg  "
    styles={{ body: { padding: 0 } }}
>
    <Flex gap={24} className="tw-max-h-90 tw-w-full tw-mb-30 tw-py-4">
        <div className="tw-flex-1 tw-relative">
            <Image
                src={image?.avatar}
                alt="Picture..."
                height={1000}
                width={1000}
                className=" tw-rounded-xl tw-bg-center tw-bg-cover tw-w-auto tw-h-auto "
            ></Image>
        </div>
        <Flex vertical className="tw-flex-1">
            <Steps progressDot direction="vertical" current={6} items={itemSteps} />
        </Flex>
    </Flex>
</Card>
  )
}

export default Overview