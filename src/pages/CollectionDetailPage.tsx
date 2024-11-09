import React from "react";
import Header from "@/components/Header.tsx";
import {useParams} from "react-router-dom";
import {useCollectionLinksPaginationStore} from "@/store/zustand.ts";
import {useQuery} from "@tanstack/react-query";
import {
    Collection,
    getAllLinksForCollection, getCollectionById,
    GetCollectionLinksResponse
} from "@/api/collection.ts";
import {CircularProgress} from "@mui/material";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Calendar, Clock} from "lucide-react";
import {formatDateToLocalTZ} from "@/utils/dates.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import LinkCard from "@/components/cards/LinkCard.tsx";

const CollectionDetailPage: React.FC = () => {
    const {collectionId} = useParams<{ collectionId: string }>();
    const {page, setPage, limit, sortBy, setSortBy, sortOrder, setSortOrder} = useCollectionLinksPaginationStore();

    const {data: collectionData, isLoading: collectionLoading, error: collectionError} =
        useQuery<Collection, Error>({
            queryKey: ['collection', collectionId],
            queryFn: async () => getCollectionById(collectionId || '')
        });

    const {data: linksData, isLoading: linksLoading, error: linksError} =
        useQuery<GetCollectionLinksResponse, Error>({
            queryKey: ['collections-links', page, limit, sortBy, sortOrder],
            queryFn: async () => getAllLinksForCollection({
                collectionId: collectionId || '',
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
                {collectionLoading ?
                    <div className="flex justify-center mt-8">
                        <CircularProgress/>
                    </div>
                    : collectionError ?
                        <Alert variant="destructive">
                            <AlertDescription>
                                Error loading collection details. Please try again later.
                            </AlertDescription>
                        </Alert>
                        : collectionData && (
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>{collectionData.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-4">
                                    <Badge variant="secondary">
                                        {collectionData.linksCount} {collectionData.linksCount === 1 ? 'link' : 'links'}
                                    </Badge>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4"/>
                                        <span>Created On: {formatDateToLocalTZ(collectionData.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4"/>
                                        <span>Last Updated: {formatDateToLocalTZ(collectionData.updatedAt)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }

                {linksLoading ?
                    <div className="flex justify-center mt-8">
                        <CircularProgress/>
                    </div>
                    : linksError ?
                        <Alert variant="destructive">
                            <AlertDescription>
                                Error loading links. Please try again later.
                            </AlertDescription>
                        </Alert>
                        : !linksData ?
                            <h1 className="text-center text-black-500">
                                You don't have any links in this collection yet.
                            </h1>
                            : (
                                <div className="container mx-auto px-4 py-8">
                                    <div className="mb-6 flex justify-end">
                                        <Select
                                            onValueChange={handleSortChange}
                                            defaultValue={`${sortBy}-${sortOrder}`}
                                        >
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
                                                    visits={link.visits}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                }
            </main>
        </div>
    )
}

export default CollectionDetailPage;