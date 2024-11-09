import React from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Calendar, FolderOpen} from "lucide-react";
import {formatDateToLocalTZ} from "@/utils/dates.ts";
import {useNavigate} from "react-router-dom";

interface CollectionCardProps {
    _id: string;
    name: string;
    linksCount: number
    createdAt: string;
}

const CollectionCard: React.FC<CollectionCardProps> = (props) => {
    const {_id, name, linksCount, createdAt} = props;
    const navigate = useNavigate();

    const date = formatDateToLocalTZ(createdAt);

    const handleClick = () => {
        navigate(`/collections/${_id}`);
    }

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={handleClick}>
            <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                    <FolderOpen className="h-6 w-6 text-primary"/>
                    <h2 className="text-lg font-semibold">{name}</h2>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <p>{linksCount} {linksCount === 1 ? 'link' : 'links'}</p>
                    <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4"/>
                        <span>{date}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CollectionCard;