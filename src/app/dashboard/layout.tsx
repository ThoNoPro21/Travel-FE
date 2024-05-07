'use client';
import SideBarComponent from './sidebar/SideBarComponent';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const status = useAppSelector((state: RootState) => state.dataAuth.isStatus);
    const user = useAppSelector((state: RootState) => state.dataAuth.user);
    const [permission,setPermission] = useState(false);
    useEffect(() => {
        if (status) {
            if (user?.role !== 1) {
                router.back();
            }else{
                setPermission(true)
            }
        }
    }, [status]);
    if (!status) {
        return null;
    }
    return (
        permission && (
            <main className="md:tw-pt-20 md:tw-px-13 tw-min-h-screen tw-bg-gradient-to-r tw-from-violet-200 tw-to-pink-200">
                <div className="tw-grid tw-grid-cols-4 tw-grid-flow-row tw-gap-4 tw-py-4">
                    <div className="tw-col-span-1 tw-min-h-screen">
                        <SideBarComponent />
                    </div>
                    <div className="tw-col-span-3 tw-min-h-screen">{children}</div>
                </div>
            </main>
        )
    );
}
