import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog"
import {Badge} from "@/components/ui/badge"
import {Link} from "@/api/link.ts";

interface LinkInfoDialogProps {
    isOpen: boolean
    onClose: () => void
    link: Link
}

const LinkInfoDialog: React.FC<LinkInfoDialogProps> = ({isOpen, onClose, link}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{link.title}</DialogTitle>
                    <DialogDescription>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                        >
                            {link.url}
                        </a>
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <img
                        src={link.image}
                        alt={link.title}
                        loading={"lazy"}
                        className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <p className="text-sm mb-4">{link.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {link.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LinkInfoDialog;