import React, {useCallback, useEffect, useRef, useState} from 'react'
import Header from "@/components/Header.tsx";
import LinkCard from "@/components/cards/LinkCard.tsx";
import {getLinks, GetLinksResponse, Link} from "@/api/link.ts";
import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {CircularProgress} from "@mui/material";
import {usePaginationStore} from "@/store/zustand.ts";


const HomePage: React.FC = () => {
    const {page, setPage, updatePage, limit, sortBy, sortOrder, isLinkCreated, setIsLinkCreated} = usePaginationStore();
    const observer = useRef<IntersectionObserver | null>(null);
    const [allLinks, setAllLinks] = useState<Link[]>([]);

    const {data: linksData, isLoading: linksLoading, error: linksError, isFetching} =
        useQuery<GetLinksResponse, Error>({
            queryKey: ['links', page, limit, sortBy, sortOrder],
            queryFn: async () => getLinks({
                page: page,
                limit: limit,
                sortBy: sortBy,
                sortOrder: sortOrder,
            }),
            placeholderData: keepPreviousData,
        });

    useEffect(() => {
        if (linksData) {
            setAllLinks(prevLinks => {
                const newLinks = linksData.links.filter(newLink =>
                    !prevLinks.some(existingLink => existingLink._id === newLink._id)
                );
                return page === 1 ? newLinks : [...prevLinks, ...newLinks];
            });
        }
    }, [linksData, page]);

    useEffect(() => {
        if (isLinkCreated) {
            setPage(1);
            setIsLinkCreated(false);
        }
    }, [isLinkCreated, setIsLinkCreated]);

    const lastLinkElementRef = useCallback((node: HTMLDivElement | null) => {
        if (linksLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && linksData?.hasMore) {
                updatePage((prevPage: number) => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [linksLoading, linksData?.hasMore, updatePage]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header/>
            <main className="container mx-auto px-4 py-8">
                {(linksError || !linksData) ? <h1>Links not loaded</h1> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allLinks.map((link, index) => (
                            <div key={index} ref={index === allLinks.length - 1 ? lastLinkElementRef : null}>
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
                }
                {(linksLoading || isFetching) && <CircularProgress/>}
            </main>
        </div>
    );
}

export default HomePage;