import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from "@/components/ui/button"
import {Link, Bookmark, Share2, Search} from 'lucide-react'
import FeatureCard from "@/components/cards/FeatureCard.tsx";

const LandingPage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Link className="h-6 w-6 text-primary"/>
                    <span className="text-2xl font-bold text-primary">LinkSaver</span>
                </div>
                <nav>
                    <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                        Save, Organize, and Share Your Links
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        LinkSaver is your personal web library. Save interesting articles, videos, and resources in one
                        place.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <Button size="lg" onClick={() => navigate('/register')}>Get Started</Button>
                        <Button size="lg" variant="outline" onClick={() => navigate('/login')}>Login</Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Bookmark className="h-10 w-10 text-primary"/>}
                        title="Save Anything"
                        description="Quickly save any web page with our browser extension or mobile app."
                    />
                    <FeatureCard
                        icon={<Search className="h-10 w-10 text-primary"/>}
                        title="Easy Organization"
                        description="Tag and categorize your links for quick and easy retrieval."
                    />
                    <FeatureCard
                        icon={<Share2 className="h-10 w-10 text-primary"/>}
                        title="Share Collections"
                        description="Create and share curated collections of links with your team or the world."
                    />
                </div>
            </main>

            <footer className="container mx-auto px-4 py-6 mt-12 text-center text-muted-foreground">
                <p>&copy; 2024 LinkSaver. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default LandingPage