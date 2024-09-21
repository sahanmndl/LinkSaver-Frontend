import {ApiResponse, createAPI} from "./base.ts";

const linkAPI = createAPI('link');

export interface Link {
    _id: string
    title: string
    url: string
    domain: string
    description: string
    image: string
    tags: string[]
}

interface AddLinkRequest {
    title: string;
    description: string;
    url: string;
    tags: string[]
}

interface UpdateLinkRequest {
    linkId: string;
    title?: string;
    description?: string;
    url?: string;
    tags?: string[]
}

interface GetLinksRequest {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: string
}

export interface GetLinksResponse {
    links: Link[];
    hasMore: boolean;
}

interface GetLinksWithTagsRequest {
    tags: string[];
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: string
}

export const addLink = async ({title, description, url, tags}: AddLinkRequest) => {
    try {
        const response = await linkAPI.post<ApiResponse<Link>>('/', {title, description, url, tags});
        return response.data.body;
    } catch (error) {
        throw error;
    }
};

export const updateLink = async ({linkId, title, description, url, tags}: UpdateLinkRequest) => {
    try {
        const response = await linkAPI.put<ApiResponse<Link>>('/', {linkId, title, description, url, tags});
        return response.data.body;
    } catch (error) {
        throw error;
    }
};

export const getLinks = async ({page, limit, sortBy, sortOrder}: GetLinksRequest) => {
    try {
        const response = await linkAPI.get<ApiResponse<GetLinksResponse>>('/', {
            params: {
                page,
                limit,
                sortBy,
                sortOrder
            }
        });
        return response.data.body;
    } catch (error) {
        throw error;
    }
};

export const getLinksGroupedByDomain = async ({fromDate, tillDate}: { fromDate: string; tillDate: string }) => {
    try {
        const response = await linkAPI.get<ApiResponse<Link[]>>('/group/domain', {params: {fromDate, tillDate}});
        return response.data.body;
    } catch (error) {
        throw error;
    }
};

export const getLinksWithGivenTags = async ({tags, page, limit, sortBy, sortOrder}: GetLinksWithTagsRequest) => {
    try {
        const response = await linkAPI.get<ApiResponse<Link[]>>('/search/tags', {
            params: {
                tags,
                page,
                limit,
                sortBy,
                sortOrder
            }
        });
        return response.data.body;
    } catch (error) {
        throw error;
    }
};

export const deleteLinkById = async ({linkId}: { linkId: string }) => {
    try {
        const response = await linkAPI.delete<ApiResponse<Link>>(`/${linkId}`);
        return response.data.body;
    } catch (error) {
        throw error;
    }
};

