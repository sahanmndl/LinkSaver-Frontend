import React, {useState} from "react";
import {format, isAfter, isBefore, parseISO, subMonths} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {DomainGroup, getLinksGroupedByDomain} from "@/api/link.ts";
import {CircularProgress} from "@mui/material";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import Header from "@/components/Header.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import LinkCard from "@/components/cards/LinkCard.tsx";

const GroupedLinksPage: React.FC = () => {
    const [fromDate, setFromDate] = useState<Date>(subMonths(new Date(), 1))
    const [tillDate, setTillDate] = useState<Date>(new Date())
    const [submitDates, setSubmitDates] = useState({fromDate, tillDate})

    const {data, isLoading, error} = useQuery<DomainGroup[], Error>({
        queryKey: ['domain-grouped-links', submitDates.fromDate, submitDates.tillDate],
        queryFn: async () => getLinksGroupedByDomain({
            fromDate: format(submitDates.fromDate, 'yyyy-MM-dd'),
            tillDate: format(submitDates.tillDate, 'yyyy-MM-dd')
        })
    });

    const handleSubmit = () => {
        if (isAfter(parseISO(format(fromDate, 'yyyy-MM-dd')), parseISO(format(tillDate, 'yyyy-MM-dd')))) {
            alert('From date cannot be after Till date')
            return
        }
        setSubmitDates({fromDate, tillDate})
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
                <CircularProgress/>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
                <Alert variant="destructive">
                    <AlertDescription>Error loading links: {error.message}</AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header/>
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Links by Domain</h1>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn("w-[240px] justify-start text-left font-normal", !fromDate && "text-muted-foreground")}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {fromDate ? format(fromDate, "PPP") : <span>From Date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={fromDate}
                                onSelect={(date) => date && setFromDate(date)}
                                disabled={(date) => isAfter(date, new Date()) || isBefore(date, subMonths(tillDate, 12))}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline"
                                    className={cn("w-[240px] justify-start text-left font-normal", !tillDate && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {tillDate ? format(tillDate, "PPP") : <span>Till Date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={tillDate}
                                onSelect={(date) => date && setTillDate(date)}
                                disabled={(date) => isAfter(date, new Date())}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
                {data && data.length > 0 ? (
                    <div className="grid gap-6">
                        {data.map((group) => (
                            <Card key={group.domain}>
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <span>{group.domain}</span>
                                        <Badge variant="secondary">{group.count} links</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value={group.domain}>
                                            <AccordionTrigger>View Links</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {group.links.map((link) => (
                                                        <LinkCard
                                                            key={link._id}
                                                            _id={link._id}
                                                            title={link.title}
                                                            description={link.description}
                                                            image={link.image}
                                                            url={link.url}
                                                            domain={link.domain}
                                                            tags={link.tags}
                                                            showEditAndDelete={false}
                                                        />
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No links found for the selected date range.</p>
                )}
            </main>
        </div>
    )
}

export default GroupedLinksPage