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

export function calculateReadingTime(text:string) {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).length; // Split text by whitespace to get words
    const minutes = Math.ceil(words / wordsPerMinute); // Calculate reading time in minutes
    return minutes;
}


export function formatElapsedTime(created_at:string|number|Date): string {
    let createdAt: Date;

    // Xử lý loại dữ liệu đầu vào
    if (typeof created_at === 'string') {
        createdAt = new Date(created_at);
    } else if (created_at instanceof Date) {
        createdAt = created_at;
    } else if (typeof created_at === 'number') {
        createdAt = new Date(created_at);
    } else {
        throw new Error("Loại không hợp lệ cho props.created_at");
    }

    // Lấy thời gian hiện tại
    const now = new Date();
    // Thời gian đã trôi qua từ thời điểm tạo đến thời điểm hiện tại (đơn vị: miligiây)
    const elapsedTime = now.getTime() - createdAt.getTime();

    // Chuyển đổi từ miligiây sang phút, giờ, ngày
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
        return `${minutes} phút trước`;
    } else if (hours < 24) {
        return `${hours} giờ trước`;
    } else if (days < 30) {
        return `${days} ngày trước`;
    } else {
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
        if (years > 0) {
            return `${years} năm trước`;
        } else {
            return `${months} tháng trước`;
        }
    }
}