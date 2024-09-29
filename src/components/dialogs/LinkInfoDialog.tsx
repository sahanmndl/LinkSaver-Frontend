import React, {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog"
import {Badge} from "@/components/ui/badge"
import {Link} from "@/api/link.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Check, Copy} from "lucide-react";

interface LinkInfoDialogProps {
    isOpen: boolean
    onClose: () => void
    link: Link
}

const LinkInfoDialog: React.FC<LinkInfoDialogProps> = ({isOpen, onClose, link}) => {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link.url)
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="pr-8">{link.title}</DialogTitle>
                    <DialogDescription>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-start space-x-2">
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline break-all"
                                >
                                    {link.url}
                                </a>
                            </div>
                            <div className="flex justify-end">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center space-x-1"
                                                onClick={copyToClipboard}
                                            >
                                                {isCopied ? (
                                                    <>
                                                        <Check size={14}/>
                                                        <span>Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={14}/>
                                                        <span>Copy URL</span>
                                                    </>
                                                )}
                                            </Button>
                                        </TooltipTrigger>
                                        {isCopied && (
                                            <TooltipContent>
                                                <p>Copied to clipboard</p>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <img
                        src={link.image}
                        alt={link.title}
                        loading="lazy"
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