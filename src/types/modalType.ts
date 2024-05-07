export type modalType= {
    isOpen?: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
    okText?: string;
    cancelText?: string;
    title?: string;
    children: React.ReactNode;
    footer?:null;
};