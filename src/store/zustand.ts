import {create} from "zustand";

interface PaginationState {
    page: number;
    setPage: (page: number) => void;
    updatePage: (updater: (prevPage: number) => number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    sortBy: string;
    setSortBy: (sortBy: string) => void;
    sortOrder: string;
    setSortOrder: (sortOrder: string) => void;
    isLinkCreated: boolean;
    setIsLinkCreated: (isLinkCreated: boolean) => void;
}

interface CollectionsPaginationState {
    page: number;
    setPage: (page: number) => void;
    updatePage: (updater: (prevPage: number) => number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    sortBy: string;
    setSortBy: (sortBy: string) => void;
    sortOrder: string;
    setSortOrder: (sortOrder: string) => void;
}

interface CollectionLinksPaginationState {
    page: number;
    setPage: (page: number) => void;
    updatePage: (updater: (prevPage: number) => number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    sortBy: string;
    setSortBy: (sortBy: string) => void;
    sortOrder: string;
    setSortOrder: (sortOrder: string) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
    page: 1,
    setPage: (page: number) => set({page}),
    updatePage: (updater) => set((state) => ({page: updater(state.page)})),
    limit: 12,
    setLimit: (limit: number) => set({limit}),
    sortBy: 'createdAt',
    setSortBy: (sortBy: string) => set({sortBy}),
    sortOrder: 'desc',
    setSortOrder: (sortOrder: string) => set({sortOrder}),
    isLinkCreated: false,
    setIsLinkCreated: (isLinkCreated: boolean) => set({isLinkCreated})
}));

export const useCollectionsPaginationStore = create<CollectionsPaginationState>((set) => ({
    page: 1,
    setPage: (page: number) => set({page}),
    updatePage: (updater) => set((state) => ({page: updater(state.page)})),
    limit: 24,
    setLimit: (limit: number) => set({limit}),
    sortBy: 'createdAt',
    setSortBy: (sortBy: string) => set({sortBy}),
    sortOrder: 'desc',
    setSortOrder: (sortOrder: string) => set({sortOrder}),
}));

export const useCollectionLinksPaginationStore = create<CollectionLinksPaginationState>((set) => ({
    page: 1,
    setPage: (page: number) => set({page}),
    updatePage: (updater) => set((state) => ({page: updater(state.page)})),
    limit: 12,
    setLimit: (limit: number) => set({limit}),
    sortBy: 'createdAt',
    setSortBy: (sortBy: string) => set({sortBy}),
    sortOrder: 'desc',
    setSortOrder: (sortOrder: string) => set({sortOrder}),
}));
