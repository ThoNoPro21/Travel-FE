export function isValidJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
export const truncateDescription = (description: string, lengthNumber: number) => {
    if (description.length > lengthNumber) {
        return description.substring(0, lengthNumber) + '...';
    }
    return description;
};

export const formatVND = (amount: number) => {
    // Định dạng số tiền thành chuỗi
    let formattedAmount = amount.toString();

    // Thêm dấu phân cách ngàn
    formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Thêm đơn vị tiền tệ (VND)
    formattedAmount += ' VND';

    return formattedAmount;
};

export function validatePhoneNumber(phoneNumber:string) {
    const pattern = /^(?:\+?84|0)(?:3[2-9]|5[6-9]|7[0|6-9]|8[1-6]|9\d)\d{7}$/;
    return pattern.test(phoneNumber);
}