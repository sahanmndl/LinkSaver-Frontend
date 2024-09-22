import React, {useCallback, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import TagSelectionDialog from "@/components/dialogs/TagsSelectionDialog.tsx";
import {Badge} from "@/components/ui/badge"
import {AlertCircle, Plus} from "lucide-react"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addLink} from "@/api/link.ts";
import {API_ERROR_RESPONSE} from "@/api/base.ts";
import {CircularProgress} from "@mui/material";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import {isValidUrl} from "@/utils/strings.ts";
import {usePaginationStore} from "@/store/zustand.ts";

interface AddLinkDialogProps {
    isAddLinkOpen: boolean
    setIsAddLinkOpen: (isOpen: boolean) => void
}

interface AddLinkFormData {
    url: string
    title: string
    description: string
    tags: string[]
}

const AddLinkDialog: React.FC<AddLinkDialogProps> = ({isAddLinkOpen, setIsAddLinkOpen}) => {
    const queryClient = useQueryClient();
    const {setIsLinkCreated} = usePaginationStore();
    const [newLink, setNewLink] = useState<AddLinkFormData>({url: '', title: '', description: '', tags: []})
    const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)
    const [error, setError] = useState('');

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setNewLink(prev => ({...prev, [name]: value}));
        setError('');
    }, [])

    const handleTagSave = (selectedTags: string[]) => {
        setNewLink(prev => ({...prev, tags: selectedTags}));
    }

    const isSubmitButtonDisabled = () => {
        return newLink.url.trim() === '' || newLink.tags.length <= 0 || newLink.tags.length > 5;
    }

    const checkFormValidity = () => {
        if (newLink.url.trim() === '') {
            setError('URL is empty!');
            return false;
        }
        if (!isValidUrl(newLink.url)) {
            setError('Please enter a valid URL!');
            return false;
        }
        if (newLink.tags.length === 0 || newLink.tags.length > 5) {
            setError('Please select 1 to 5 tags!');
            return false;
        }
        return true;
    };

    const createNewLink = async () => {
        await addLink(newLink);
    };

    const mutation = useMutation({
        mutationFn: () => createNewLink(),
        onSuccess: () => {
            setNewLink({url: '', title: '', description: '', tags: []});
            setIsAddLinkOpen(false);
            setIsLinkCreated(true);
            queryClient.invalidateQueries({
                queryKey: ['links']
            });
        },
        onError: (e: API_ERROR_RESPONSE) => {
            setError(e.response.data.error);
        }
    });

    return (
        <>
            <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Link</DialogTitle>
                    </DialogHeader>
                    <div>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4"/>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="url">URL</Label>
                                <Input
                                    id="url"
                                    name="url"
                                    value={newLink.url}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={newLink.title}
                                    onChange={handleInputChange}
                                    placeholder="Link Title"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={newLink.description}
                                    onChange={handleInputChange}
                                    placeholder="Brief description of the link"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tags</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => setIsTagDialogOpen(true)}
                                >
                                    <Plus className="mr-2 h-4 w-4"/> Add Tags
                                </Button>
                                {newLink.tags.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {newLink.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsAddLinkOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitButtonDisabled() || mutation.isPending}
                                onClick={() => {
                                    if (checkFormValidity()) {
                                        mutation.mutate()
                                    }
                                }}
                            >
                                {mutation.isPending ? <CircularProgress/> : "Add Link"}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
            <TagSelectionDialog
                isOpen={isTagDialogOpen}
                onClose={() => setIsTagDialogOpen(false)}
                onSave={handleTagSave}
                initialSelectedTags={newLink.tags}
            />
        </>
    )
}

export default AddLinkDialog;