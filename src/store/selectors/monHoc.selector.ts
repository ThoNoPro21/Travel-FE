import { MonHocType } from '@/src/components/table/MonHocTable';
import { RootState } from '../store';

export const selectSTotalCount = (state: RootState) => state.count.totalCount;
export const selectSMonHocByMaMonHoc = (state: RootState, payload: number): MonHocType => {
    const result = state.MonHoc.dataMonHoc?.find((monHoc: MonHocType) => monHoc.mamonhoc === payload);
    return result;
};
