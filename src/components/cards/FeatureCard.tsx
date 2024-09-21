import React from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
            {icon}
            <h2 className="text-xl font-semibold mt-4 mb-2">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

export default FeatureCard