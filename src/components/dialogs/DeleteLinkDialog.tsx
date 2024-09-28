import React from 'react'
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {AlertCircle} from "lucide-react"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteLinkById} from "@/api/link.ts";
import {API_ERROR_RESPONSE} from "@/api/base.ts";
import {CircularProgress} from "@mui/material";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";

interface DeleteDialogProps {
    isOpen: boolean
    onClose: () => void
    linkId: string
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({isOpen, onClose, linkId}) => {
    const queryClient = useQueryClient()
    const [error, setError] = React.useState('')

    const mutation = useMutation({
        mutationFn: () => deleteLinkById({linkId: linkId}),
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

    const handleDelete = () => {
        setError('')
        mutation.mutate()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this link? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? <CircularProgress/> : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog