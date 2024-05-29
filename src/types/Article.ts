import { locationType } from './Location';
import { userType } from './User';

export type postArticleType = {
    title: string;
    topic: string;
    location: string;
    content: string;
    avatar: any[];
};
export type imagesJson = {
    avatar: any;
    imageDetails?: any;
    publicId?: string;
    subDescription?: any[];
};


export type getArticleByIdType = {
    article?: getArticleType;
    comments?: commentType[];
};
export type topicType = {
    topics_id: number;
    name: string;
};

export type commentType = {
    article_reviews_id: number;
    content: string;
    user?: userType;
    article_id: number;
    create_at: string;
};
export type getArticleType = {
    key?:React.Key;
    articles_id: number;
    content: string | TrustedHTML;
    festival_id?: number;
    festival_name?: string;
    place_id?: number;
    place_name?: string;
    location:locationType;
    status:number;
    images: string;
    title: string;
    topic: topicType;
    user:userType;
    created_at?: any;
};

export type articleFavourite = {
    article_id:number,
    article:getArticleType,
}