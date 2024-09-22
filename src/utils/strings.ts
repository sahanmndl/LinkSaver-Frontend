export const isValidUrl = (url: string) => {
    let val: URL;
    try {
        val = new URL(url);
    } catch (_) {
        return false;
    }
    return val.protocol === "http:" || val.protocol === "https:";
}

export const truncateUrl = (url: string, maxLength: number = 40) => {
    if (url.length <= maxLength) return url
    return url.substring(0, maxLength - 3) + '...'
}