import TableComponent, { TableFilters } from '@/src/components/table/Table';
export type User = {
    username: string;
    roles: string;
    email: string;
    phone: string;
    address: string;
    detail: string;
    password: string;
};

function myUser(
    username: string,
    roles: string,
    email: string,
    phoneNumber: string,
    address: string,
    otherDetail: string,
    password: string
): User {
    return {
        username: username,
        roles: roles,
        email: email,
        phone: phoneNumber,
        address: address,
        detail: otherDetail,
        password: password,
    };
}

const users: User[] = [
    myUser('Thơ Đồ', 'Admin', 'thodo@gmail.com', '0123456879', 'Ghềnh Ráng', 'Sinh viên', '123'),
    myUser('Hoàng Editor', 'Editor', 'hoang@gmail.com', '0123456879', 'Quy Nhơn', 'Sinh viên', '123'),
    myUser('Trung', 'User', 'trung@gmail.com', '0123456879', 'Tây Sơn', 'Sinh viên', '123'),
    myUser('Thiện', 'User', 'thanh@gmail.com', '0123456879', 'An Nhơn', 'Sinh viên', '123'),
    myUser('Thắng', 'User', 'thanh@gmail.com', '0123456879', 'An Nhơn', 'Sinh viên', '123'),
    myUser('Quân', 'User', 'thanh@gmail.com', '0123456879', 'An Nhơn', 'Sinh viên', '123'),
    myUser('Vy', 'User', 'thanh@gmail.com', '0123456879', 'An Nhơn', 'Sinh viên', '123'),
    myUser('Vân', 'User', 'thanh@gmail.com', '0123456879', 'An Nhơn', 'Sinh viên', '123'),
    myUser('Vàng', 'User', 'thanh@gmail.com', '0123456879', 'An Nhơn', 'Sinh viên', '123'),
    myUser('Đen', 'User', 'thanh@gmail.com', '0123456879', 'An Nhơn', 'Sinh viên', '123'),
    myUser('Trắng', 'User', 'thanh@gmail.com', '0123456879', 'An Nhơn', 'Sinh viên', '123'),
];

export const getUsers = (filters?: TableFilters): User[] => {
    const { count , role, name } = filters || {};
    if (role || count || name) {
        return users
            .filter((item) => !filters?.role || item.roles === filters.role)
            .filter((item) => !filters?.name || item.username.toLowerCase().includes(filters.name.toLowerCase()))
            .filter((item, index) =>index < (count ?? users.length));
    }

    return users;
};
export const getRoles = (): string[] => {
    return ['Admin', 'User', 'Editor'];
};

export const getCounts = (): number[] => {
    return [5, 10, 20, 30, 40];
};
