export default interface MediaPreview {
    titre: string;
    uuid: string;
    user?: {
        username: string;
        uuid: string;
    }
}