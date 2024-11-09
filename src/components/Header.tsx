import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Search, Plus, Grid} from "lucide-react"
import AddLinkDialog from "@/components/dialogs/AddLinkDialog.tsx";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);

    return (
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <h1
                    className="text-2xl font-bold text-primary cursor-pointer"
                    onClick={() => navigate('/home')}
                >
                    LinkSaver
                </h1>
                <div className="flex items-center space-x-4">
                    <div hidden={true}
                         className={`relative ${searchExpanded ? 'w-64' : 'w-8'} transition-all duration-300`}>
                        <Input
                            type="text"
                            placeholder="Search links..."
                            className={`pl-8 pr-4 py-2 w-full ${searchExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                            onFocus={() => setSearchExpanded(true)}
                            onBlur={() => setSearchExpanded(false)}
                        />
                        <Search
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                            size={18}
                            onClick={() => setSearchExpanded(!searchExpanded)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate('/grouped')}
                        title="View Grouped Links"
                    >
                        <Grid className="h-4 w-4"/>
                    </Button>
                    {/*<Button*/}
                    {/*    variant="outline"*/}
                    {/*    size="icon"*/}
                    {/*    onClick={() => navigate('/collections')}*/}
                    {/*    title="View Link Collections"*/}
                    {/*>*/}
                    {/*    <FolderOpen className="h-4 w-4"/>*/}
                    {/*</Button>*/}
                    <Button onClick={() => setIsAddLinkOpen(true)} size="icon">
                        <Plus className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
            <AddLinkDialog isAddLinkOpen={isAddLinkOpen} setIsAddLinkOpen={setIsAddLinkOpen}/>
        </header>
    );
};

export default Header;
