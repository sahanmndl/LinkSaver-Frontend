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

export const usePaginationStore = create<PaginationState>((set) => ({
    page: 1,
    setPage: (page: number) => set({page}),
    updatePage: (updater) => set((state) => ({page: updater(state.page)})),
    limit: 24,
    setLimit: (limit: number) => set({limit}),
    sortBy: 'createdAt',
    setSortBy: (sortBy: string) => set({sortBy}),
    sortOrder: 'desc',
    setSortOrder: (sortOrder: string) => set({sortOrder}),
    isLinkCreated: false,
    setIsLinkCreated: (isLinkCreated: boolean) => set({isLinkCreated})
}));
