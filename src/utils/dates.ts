import {format, parseISO} from "date-fns";

export const formatDateToLocalTZ = (dateString: string) => {
    try {
        return format(parseISO(dateString), 'dd MMM yyyy');
    } catch (e) {
        return "Invalid Date";
    }
}