import React from 'react'
import Header from "@/components/Header.tsx";
import LinkCard from "@/components/cards/LinkCard.tsx";
import {getLinks, GetLinksResponse} from "@/api/link.ts";
import {useQuery} from "@tanstack/react-query";
import {CircularProgress} from "@mui/material";
import {usePaginationStore} from "@/store/zustand.ts";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";


const HomePage: React.FC = () => {
    const {page, setPage, limit, sortBy, setSortBy, sortOrder, setSortOrder} = usePaginationStore();

    const {data: linksData, isLoading: linksLoading, error: linksError} =
        useQuery<GetLinksResponse, Error>({
            queryKey: ['links', page, limit, sortBy, sortOrder],
            queryFn: async () => getLinks({
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
        setSortBy(newSortBy as 'createdAt' | 'title' | 'visits')
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
                            <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                            <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                            <SelectItem value="visits-desc">Most Visited</SelectItem>
                            <SelectItem value="visits-asc">Least Visited</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {linksLoading ?
                    <div className="flex justify-center mt-8">
                        <CircularProgress/>
                    </div>
                    : linksError ?
                        <h1 className="text-center text-red-500">Error loading links. Please try again later.</h1>
                        : !linksData ?
                            <h1 className="text-center text-black-500">You haven't added any links yet.</h1>
                            : <>
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {linksData.links.map((link, index) => (
                                        <div key={index}>
                                            <LinkCard
                                                _id={link._id}
                                                title={link.title}
                                                description={link.description}
                                                image={link.image}
                                                url={link.url}
                                                domain={link.domain}
                                                tags={link.tags}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center items-center space-x-2 mt-8">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1 || linksLoading}
                                    >
                                        <ChevronLeft className="h-4 w-4"/>
                                    </Button>
                                    {Array.from({length: linksData.pages}, (_, i) => i + 1).map((pageNumber) => (
                                        <Button
                                            key={pageNumber}
                                            variant={pageNumber === page ? "default" : "outline"}
                                            size="icon"
                                            onClick={() => handlePageChange(pageNumber)}
                                            disabled={linksLoading}
                                        >
                                            {pageNumber}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === linksData.pages || linksLoading}
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

export default HomePage;