import {Link, updateLink} from "@/api/link.ts";
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
import {API_ERROR_RESPONSE} from "@/api/base.ts";
import {CircularProgress} from "@mui/material";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import {isValidUrl} from "@/utils/strings.ts";

interface EditLinkDialogProps {
    isOpen: boolean
    onClose: () => void
    link: Link
}

interface EditLinkFormData {
    url: string
    title: string
    description: string
    tags: string[]
}

const EditLinkDialog: React.FC<EditLinkDialogProps> = ({isOpen, onClose, link}) => {
    const queryClient = useQueryClient()
    const [editedLink, setEditedLink] = useState<EditLinkFormData>({
        url: link.url,
        title: link.title,
        description: link.description,
        tags: link.tags
    })
    const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setEditedLink(prev => ({...prev, [name]: value}))
        setError('')
    }, [])

    const handleTagSave = (selectedTags: string[]) => {
        setEditedLink(prev => ({...prev, tags: selectedTags}))
    }

    const isSubmitButtonDisabled = () => {
        return editedLink.url.trim() === '' || editedLink.tags.length === 0 || editedLink.tags.length > 5
    }

    const checkFormValidity = () => {
        if (editedLink.url.trim() === '') {
            setError('URL is empty!')
            return false
        }
        if (!isValidUrl(editedLink.url)) {
            setError('Please enter a valid URL!')
            return false
        }
        if (editedLink.tags.length === 0 || editedLink.tags.length > 5) {
            setError('Please select 1 to 5 tags!')
            return false
        }
        return true
    }

    const mutation = useMutation({
        mutationFn: () => updateLink({
            linkId: link._id,
            title: editedLink.title.trim(),
            description: editedLink.description.trim(),
            url: editedLink.url,
            tags: editedLink.tags,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['links']
            });
            onClose()
        },
        onError: (e: API_ERROR_RESPONSE) => {
            setError(e.response.data.error);
        }
    })

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Link</DialogTitle>
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
                                    value={editedLink.url}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={editedLink.title}
                                    onChange={handleInputChange}
                                    placeholder="Link Title"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={editedLink.description}
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
                                    <Plus className="mr-2 h-4 w-4"/> Edit Tags
                                </Button>
                                {editedLink.tags.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {editedLink.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={onClose}>
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
                                {mutation.isPending ? <CircularProgress/> : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
            <TagSelectionDialog
                isOpen={isTagDialogOpen}
                onClose={() => setIsTagDialogOpen(false)}
                onSave={handleTagSave}
                initialSelectedTags={editedLink.tags}
            />
        </>
    )
}

export default EditLinkDialog