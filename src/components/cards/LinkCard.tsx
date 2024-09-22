import React from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";

interface Link {
    id: string
    title: string
    url: string
    domain: string
    description: string
    image: string
    tags: string[]
}

const LinkCard: React.FC<Link> = ({id, title, description, domain, url, image, tags}) => {
    return (
        <Card key={id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h2>
                <p className="text-sm text-muted-foreground mb-2">{domain}</p>
                <p className="text-sm mb-4 line-clamp-2">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default LinkCard;