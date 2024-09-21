import React, {useState} from 'react'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Badge} from "@/components/ui/badge"
import {actionTags, educationTags, entertainmentTags, jobTags, mediaTags} from "@/utils/constants.ts";

interface TagSelectionDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (selectedTags: string[]) => void
    initialSelectedTags: string[]
}

interface TagCategory {
    name: string
    tags: string[]
}

const tagCategories: TagCategory[] = [
    {name: "Education", tags: educationTags},
    {name: "Media", tags: mediaTags},
    {name: "Action", tags: actionTags},
    {name: "Job", tags: jobTags},
    {name: "Entertainment", tags: entertainmentTags},
]

const TagSelectionDialog: React.FC<TagSelectionDialogProps> = ({ isOpen, onClose, onSave, initialSelectedTags }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(initialSelectedTags)

    const handleTagToggle = (tag: string) => {
        setSelectedTags((prev) => {
            if (prev.includes(tag)) {
                return prev.filter((t) => t !== tag)
            } else if (prev.length < 5) {
                return [...prev, tag]
            }
            return prev
        })
    }

    const handleSave = () => {
        if (selectedTags.length > 0 && selectedTags.length <= 5) {
            onSave(selectedTags)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Select Tags (1-5)</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px] pr-4">
                    {tagCategories.map((category) => (
                        <div key={category.name} className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {category.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() => handleTagToggle(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
                <DialogFooter>
                    <Button onClick={onClose} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={selectedTags.length === 0 || selectedTags.length > 5}>
                        Save Tags
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TagSelectionDialog