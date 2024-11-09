import {ApiResponse, createAPI} from "@/api/base.ts";
import {Link} from "@/api/link.ts";

const collectionAPI = createAPI('collection')

export interface Collection {
    _id: string;
    name: string;
    userId: string;
    links?: string[];
    linksCount?: number;
    createdAt: string;
    updatedAt: string;
}

interface AddCollectionRequest {
    name: string;
    links?: string[];
}

interface UpdateCollectionRequest {
    collectionId: string;
    name?: string;
}

interface GetCollectionsRequest {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
}

export interface GetCollectionsResponse {
    collections: Collection[];
    hasMore: boolean;
    pages: number;
}

export interface GetCollectionLinksResponse {
    links: Link[];
    hasMore: boolean;
    page: number;
}

interface GetCollectionLinksRequest {
    collectionId: string;
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
}


export const addCollection = async ({name, links = []}: AddCollectionRequest) => {
    try {
        const response = await collectionAPI.post<ApiResponse<Collection>>('', {name, links});
        return response.data.body;
    } catch (error) {
        throw error;
    }
};

export const updateCollectionById = async ({collectionId, name}: UpdateCollectionRequest) => {
    try {
        const response = await collectionAPI.put<ApiResponse<Collection>>('', {collectionId, name});
        return response.data.body;
    } catch (error) {
        throw error;
    }
};

export const getCollectionById = async (collectionId: string) => {
    try {
        const response = await collectionAPI.get<ApiResponse<Collection>>(`/${collectionId}`);
        return response.data.body;
    } catch (error) {
        throw error;
    }
};

export const getCollections = async ({page, limit, sortBy, sortOrder}: GetCollectionsRequest) => {
    try {
        const response = await collectionAPI.get<ApiResponse<GetCollectionsResponse>>('', {
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

export const getAllLinksForCollection = async (
    {
        collectionId,
        page,
        limit,
        sortBy,
        sortOrder
    }: GetCollectionLinksRequest) => {
    try {
        const response = await collectionAPI.get<ApiResponse<GetCollectionLinksResponse>>(`/links/${collectionId}`, {
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

export const addLinkToCollection = async ({collectionId, linkIds}: { collectionId: string; linkIds: string[] }) => {
    try {
        const response = await collectionAPI.post<ApiResponse<Collection>>('/links', {collectionId, linkIds});
        return response.data.body;
    } catch (error) {
        throw error;
    }
};