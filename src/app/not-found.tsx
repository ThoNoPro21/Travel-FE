import React from 'react';
import { Button, Result } from 'antd';
import Link from 'next/link';

const NotFound: React.FC = () => (
    <main className="md:tw-pt-20 md:tw-px-13">
        <Result
            status="404"
            title="Không tìm thấy URL !"
            subTitle="Xin lỗi! Trang không tìm thấy :("
            extra={
                <Link href={'/'}>
                    <Button type="primary">Quay lại trang chủ</Button>
                </Link>
            }
        />
    </main>
);

export default NotFound;
