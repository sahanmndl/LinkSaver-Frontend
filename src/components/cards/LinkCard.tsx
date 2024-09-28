import React, {useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Edit, ExternalLink, Eye, Trash2} from "lucide-react";
import {truncateUrl} from "@/utils/strings.ts";
import LinkInfoDialog from "@/components/dialogs/LinkInfoDialog.tsx";
import EditLinkDialog from "@/components/dialogs/EditLinkDialog.tsx";
import DeleteLinkDialog from "@/components/dialogs/DeleteLinkDialog.tsx";

interface Link {
    _id: string
    title: string
    url: string
    domain: string
    description: string
    image: string
    tags: string[]
}

const LinkCard: React.FC<Link> = (props) => {
    const {_id, title, description, url, domain, image, tags} = props
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <>
            <Card
                id={_id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative h-[400px]"
            >
                <img src={image} alt={title} loading="lazy" className="w-full h-40 object-cover"/>
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h2>
                    <p className="text-sm text-muted-foreground mb-2">{domain}</p>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline mb-2 flex items-center"
                        title={url}
                    >
                        <ExternalLink size={14} className="mr-1 flex-shrink-0"/>
                        <span className="truncate">{truncateUrl(url)}</span>
                    </a>
                    <p className="text-sm mb-4 line-clamp-2 flex-grow">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-8 overflow-hidden" style={{maxHeight: '4.5rem'}}>
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="absolute bottom-2 right-2 flex space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsViewDialogOpen(true)}
                            aria-label="View link"
                        >
                            <Eye className="h-4 w-4"/>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsEditDialogOpen(true)}
                            aria-label="Edit link"
                        >
                            <Edit className="h-4 w-4"/>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDeleteDialogOpen(true)}
                            aria-label="Delete link"
                        >
                            <Trash2 className="h-4 w-4"/>
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <LinkInfoDialog
                isOpen={isViewDialogOpen}
                onClose={() => setIsViewDialogOpen(false)}
                link={props}
            />
            <EditLinkDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                link={props}
            />
            <DeleteLinkDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                linkId={_id}
            />
        </>
    )
}

export default LinkCard;