import React, {useState} from 'react'
import Header from "@/components/Header.tsx";
import LinkCard from "@/components/cards/LinkCard.tsx";
import {getLinks, GetLinksResponse} from "@/api/link.ts";
import {useQuery} from "@tanstack/react-query";
import {CircularProgress} from "@mui/material";


const HomePage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(24);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState("desc");

    const {data: linksData, isLoading: linksLoading, error: linksError} =
        useQuery<GetLinksResponse, Error>({
            queryKey: ['links', page, limit, sortBy, sortOrder],
            queryFn: async () => getLinks({
                page: page,
                limit: limit,
                sortBy: sortBy,
                sortOrder: sortOrder,
            }),
        });

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header/>
            <main className="container mx-auto px-4 py-8">
                {linksLoading ? <CircularProgress/> :
                    linksError ? <h1>Links not loaded</h1>
                        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {linksData?.links.map((link) => (
                                <LinkCard
                                    id={link._id}
                                    title={link.title}
                                    description={link.description}
                                    image={link.image}
                                    url={link.url}
                                    domain={link.domain}
                                    tags={link.tags}
                                />
                            ))}
                        </div>
                }
            </main>
        </div>
    )
}

export default HomePage;