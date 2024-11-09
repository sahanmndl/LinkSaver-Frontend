import React from "react";
import {useCollectionsPaginationStore} from "@/store/zustand.ts";
import {useQuery} from "@tanstack/react-query";
import {getCollections, GetCollectionsResponse} from "@/api/collection.ts";
import Header from "@/components/Header.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {CircularProgress} from "@mui/material";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, ChevronRight} from "lucide-react";
import CollectionCard from "@/components/cards/CollectionCard.tsx";

const CollectionsPage: React.FC = () => {
    const {page, setPage, limit, sortBy, setSortBy, sortOrder, setSortOrder} = useCollectionsPaginationStore();

    const {data: collectionsData, isLoading: collectionsLoading, error: collectionsError} =
        useQuery<GetCollectionsResponse, Error>({
            queryKey: ['collections', page, limit, sortBy, sortOrder],
            queryFn: async () => getCollections({
                page: page,
                limit: limit,
                sortBy: sortBy,
                sortOrder: sortOrder,
            })
        });

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleSortChange = (value: string) => {
        const [newSortBy, newSortOrder] = value.split('-')
        setSortBy(newSortBy as 'createdAt')
        setSortOrder(newSortOrder as 'asc' | 'desc')
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header/>
            <main className="container mx-auto px-4 py-8">
                <div className="mb-6 flex justify-end">
                    <Select onValueChange={handleSortChange} defaultValue={`${sortBy}-${sortOrder}`}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Sort by"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="createdAt-desc">Date Created (Newest)</SelectItem>
                            <SelectItem value="createdAt-asc">Date Created (Oldest)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {collectionsLoading ?
                    <div className="flex justify-center mt-8">
                        <CircularProgress/>
                    </div>
                    : collectionsError ?
                        <h1 className="text-center text-red-500">Error loading collections. Please try again later.</h1>
                        : !collectionsData ?
                            <h1 className="text-center text-black-500">You haven't created any collection yet.</h1>
                            : <>
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {collectionsData.collections.map((collection, index) => (
                                        <div key={index}>
                                            <CollectionCard
                                                _id={collection._id}
                                                name={collection.name}
                                                linksCount={collection.linksCount || 0}
                                                createdAt={collection.createdAt}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center items-center space-x-2 mt-8">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1 || collectionsLoading}
                                    >
                                        <ChevronLeft className="h-4 w-4"/>
                                    </Button>
                                    {Array.from({length: collectionsData.pages}, (_, i) => i + 1).map((pageNumber) => (
                                        <Button
                                            key={pageNumber}
                                            variant={pageNumber === page ? "default" : "outline"}
                                            size="icon"
                                            onClick={() => handlePageChange(pageNumber)}
                                            disabled={collectionsLoading}
                                        >
                                            {pageNumber}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === collectionsData.pages || collectionsLoading}
                                    >
                                        <ChevronRight className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </>
                }
            </main>
        </div>
    );
}

export default CollectionsPage;