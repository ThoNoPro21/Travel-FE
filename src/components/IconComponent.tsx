import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faBars,
    faCamera,
    faCaretDown,
    faCartShopping,
    faClose,
    faDotCircle,
    faEllipsis,
    faExclamationCircle,
    faGripLinesVertical,
    faLocationDot,
    faMinus,
    faPlus,
    faSearch,
    faStar,
    faTrashAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
    faComment,
    faHeart,
    faBookmark,
    faThumbsUp,
    faPenToSquare,
    faCircleCheck,
    faEnvelope,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
import { color } from 'framer-motion';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
type Props = {};

export const IconUser = () => {
    return <FontAwesomeIcon icon={faUser} style={{ color: 'white', width: 16, height: 16 }} />;
};
export const IconCartShopping = () => {
    return <FontAwesomeIcon icon={faCartShopping} style={{ color: 'white', width: 16, height: 16 }} />;
};
export const IconHeart = () => {
    return <FontAwesomeIcon icon={faHeart} />;
};
export const IconLocation = ({color}:{color?:string}) => {
    const iconColor = color || 'orange';
    return <FontAwesomeIcon icon={faLocationDot} style={{ color: iconColor }} />;
};
export const IconStar = () => {
    return <FontAwesomeIcon icon={faStar} className="tw-text-yellow-400" />;
};
export const IconLeft = () => {
    return <FontAwesomeIcon icon={faAngleLeft} style={{ minWidth: 24, minHeight: 24 }} />;
};
export const IconRight = () => {
    return <FontAwesomeIcon icon={faAngleRight} style={{ width: 24, height: 24 }} />;
};
export const IconDot = () => {
    return <FontAwesomeIcon icon={faDotCircle} style={{ width: 4, height: 4 }} />;
};
export const IconBarMenu = () => {
    return <FontAwesomeIcon icon={faBars} style={{ width: 24, height: 24 }} />;
};
export const IconClose = ({color}:{color?:string}) => {
    const isColor = color || 'black';
    return <FontAwesomeIcon icon={faClose} style={{color:isColor, minWidth: 16, minHeight: 16 }} />;
};
export const IconDropDown = () => {
    return <FontAwesomeIcon icon={faCaretDown} style={{ width: 24, height: 24 }} />;
};
export const IconEllipsis = () => {
    return <FontAwesomeIcon icon={faEllipsis} />;
};
export const IconBookMark = () => {
    return <FontAwesomeIcon icon={faBookmark} />;
};
export const IconComment = () => {
    return <FontAwesomeIcon icon={faComment} />;
};
export const IconLike = () => {
    return <FontAwesomeIcon icon={faThumbsUp} />;
};
export const IconGripLine = () => {
    return <FontAwesomeIcon icon={faGripLinesVertical} />;
};
export const IconSearch = () => {
    return <FontAwesomeIcon icon={faSearch} style={{ color: 'orange' }} />;
};
export const IconDelete = () => {
    return <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red', minHeight: 16, minWidth: 16 }} />;
};
export const IconEdit = () => {
    return <FontAwesomeIcon icon={faPenToSquare} style={{ color: 'blue', minHeight: 16, minWidth: 16 }} />;
};
export const IconCheck = () => {
    return <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'blue', minHeight: 16, minWidth: 16 }} />;
};
export const IconPlus = () => {
    return <FontAwesomeIcon icon={faPlus} style={{ color:'white',minHeight: 16, minWidth: 16 }} />;
};
export const IconMinus = () => {
    return <FontAwesomeIcon icon={faMinus} style={{ color:'white', minHeight: 16, minWidth: 16 }} />;
};
export const IconExclamation = () => {
    return <FontAwesomeIcon icon={faExclamationCircle} style={{color: 'yellow', height: 24, width: 24 }} />;
};
export const IconEmail = () => {
    return <FontAwesomeIcon icon={faEnvelope} />;
};
export const IconLock = () => {
    return <FontAwesomeIcon icon={faLock} />;
};
export const IconEye = () => {
    return <FontAwesomeIcon icon={faEye} style={{color: 'blue', width: 16, height: 16 }}/>;
};
export const IconEyeSlash = () => {
    return <FontAwesomeIcon icon={faEyeSlash} style={{ color: 'blue' }} />;
};
export const IconCamera = () => {
    return <FontAwesomeIcon icon={faCamera} style={{ color: 'white' }}/>;
};
