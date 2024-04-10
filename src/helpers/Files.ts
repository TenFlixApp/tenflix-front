export function getCoverURL(uuid: string) {
    return import.meta.env.VITE_FILE_SERVER_BASE_URL + 'files/' + uuid + '/cover';
}

export function getMediaURL(uuid: string) {
    return import.meta.env.VITE_FILE_SERVER_BASE_URL + 'files/' + uuid + '/stream';
}