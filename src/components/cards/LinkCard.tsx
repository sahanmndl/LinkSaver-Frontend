import React, {useCallback, useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Edit, ExternalLink, Eye, Trash2} from "lucide-react";
import {truncateUrl} from "@/utils/strings.ts";
import LinkInfoDialog from "@/components/dialogs/LinkInfoDialog.tsx";
import EditLinkDialog from "@/components/dialogs/EditLinkDialog.tsx";
import DeleteLinkDialog from "@/components/dialogs/DeleteLinkDialog.tsx";
import {useMutation} from "@tanstack/react-query";
import {incrementLinkVisitCount} from "@/api/link.ts";

interface LinkCardProps {
    _id: string
    title: string
    url: string
    domain: string
    description: string
    image: string
    tags: string[]
    visits: number
    showEditAndDelete?: boolean
}

const LinkCard: React.FC<LinkCardProps> = (props) => {
    const {_id, title, description, url, domain, image, tags, visits, showEditAndDelete = true} = props
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const mutation = useMutation({
        mutationFn: () => incrementLinkVisitCount({linkId: _id})
    });

    const handleLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Capture clicks from middle mouse button
        if (event.button === 1) {
            mutation.mutate()
        }
    }, [url, mutation])

    const handleContextMenu = useCallback(() => {
        // Capture clicks from right mouse button
        mutation.mutate()
    }, [mutation])

    return (
        <>
            <Card
                id={_id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative h-[415px]"
            >
                <img src={image} alt={title} loading="lazy" className="w-full h-40 object-cover"/>
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-muted-foreground line-clamp-1">{domain}</p>
                        <Badge variant="secondary" className="text-xs">
                            {visits} {visits <= 1 ? 'visit' : 'visits'}
                        </Badge>
                    </div>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline mb-2 flex items-center"
                        title={url}
                        onClick={() => mutation.mutate()}
                        onAuxClick={handleLinkClick}
                        onContextMenu={handleContextMenu}
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
                        {showEditAndDelete && (
                            <>
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
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
            <LinkInfoDialog
                isOpen={isViewDialogOpen}
                onClose={() => setIsViewDialogOpen(false)}
                link={{_id, title, description, image, url, domain, tags, visits}}
            />
            <EditLinkDialog
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                link={{_id, title, description, image, url, domain, tags, visits}}
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