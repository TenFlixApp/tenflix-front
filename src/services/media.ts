import { MediaPreview } from "@/Types";
import { sendSecuredRequest } from "./Request";

export default class {
    public async uploadMedia(file: File, cover: File, title: string, description: string) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('cover', cover);
        formData.append('title', title);
        formData.append('description', description);

        return sendSecuredRequest(import.meta.env.VITE_BACKEND_BASE_URL + "media/upload", {
            method: "POST",
            body: formData
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

    public async searchMedia(query: string): Promise<MediaPreview[]> {
        return sendSecuredRequest(import.meta.env.VITE_BACKEND_BASE_URL + "media/search", {
            method: "POST",
            body: JSON.stringify({ q: query }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            if (!response.ok) {
                return response.json().then(body => {
                    throw new Error(body.error)
                })
            } else {
                const resp = await response.json();
                if (resp.medias) {
                    return resp.medias as MediaPreview[];
                } else {
                    return [];
                }
            }
        })
    }
}