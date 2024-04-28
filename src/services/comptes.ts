import { Rights } from "@/constants/Rights";
import { sendSecuredRequest } from "./Request";

export default class {
    public async getUsers(): Promise<Array<{ username: string, rights: Rights}>> {
        return sendSecuredRequest(import.meta.env.VITE_AUTH_BASE_URL + "users", {
            method: "GET"
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

    public async updateRights(rights: Rights, username: string): Promise<void> {
        return sendSecuredRequest(import.meta.env.VITE_AUTH_BASE_URL + 'users/rights', {
            method: "PUT",
            body: JSON.stringify({
                username: username,
                newRights: rights
            })
        }).then(async (response) => {
            if (!response.ok) {
                return response.json().then(body => {
                    throw new Error(body.error)
                })
            }
        })
    }
}