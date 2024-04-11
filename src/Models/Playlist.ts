import { MediaPreviewType } from "@/Types"

export default class Playlist {
    public id: number
    public titre: string
    public medias: Array<MediaPreviewType>

    constructor(id: number, title: string, medias: Array<MediaPreviewType> = []) {
        this.id = id;
        this.titre = title;
        this.medias = medias;
    }
}