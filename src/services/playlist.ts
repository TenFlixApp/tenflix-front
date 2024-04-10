import { Playlist } from "@/Models";
import { sendSecuredRequest } from "./Request";
import MediaPreview from "@/Types/MediaPreviewType";

export default class {
    public async getPlaylists(): Promise<Array<Playlist>> {
        return sendSecuredRequest(import.meta.env.VITE_BACKEND_BASE_URL + "playlists", {
            method: "GET"
        }).then(async (response) => {
            if (!response.ok) {
                return response.json().then(body => {
                    throw new Error(body.error)
                })
            } else {
                const resp = await response.json();
                return resp.playlists.map((playlist: any) => new Playlist(playlist.id, playlist.titre));
            }
        })
    }

    public async createPlaylist(title: string): Promise<any> {
        return sendSecuredRequest(import.meta.env.VITE_BACKEND_BASE_URL + "playlist", {
            method: "POST",
            body: JSON.stringify({ "titre": title }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (!response.ok) {
                return response.json().then(body => {
                    throw new Error(body.error)
                })
            } else {
                return await response.json();
            }
        })
    }

    public async getPlaylistMedias(playlistId: number): Promise<MediaPreview[]> {
        return sendSecuredRequest(import.meta.env.VITE_BACKEND_BASE_URL + "playlist/" + playlistId, {
            method: "GET"
        }).then(async (response) => {
            if (!response.ok) {
                return response.json().then(body => {
                    throw new Error(body.error)
                })
            } else {
                const resp = await response.json();
                console.log(resp)
                return resp.medias as MediaPreview[];
            }
        })
    }

    public async addMediaToPlaylist(playlistId: number, uuid: string): Promise<any> {
        return sendSecuredRequest(import.meta.env.VITE_BACKEND_BASE_URL + "playlist/media", {
            method: "POST",
            body: JSON.stringify({ "uuid_media": uuid, "id_playlist": playlistId }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (!response.ok) {
                return response.json().then(body => {
                    throw new Error(body.error)
                })
            } else {
                return await response.json();
            }
        })
    }
}