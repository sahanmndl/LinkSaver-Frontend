export const isValidUrl = (url: string) => {
    let val: URL;
    try {
        val = new URL(url);
    } catch (_) {
        return false;
    }
    return val.protocol === "http:" || val.protocol === "https:";
}