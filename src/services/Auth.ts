import { jwtDecode } from "jwt-decode"
import { sendSecuredRequest } from "./request";
import { AuthResponse } from "@/Types";

export default class {
    public isConnected(): boolean {
        try {
            const token = localStorage.getItem("ACCESS_TOKEN");
            if (!token) {
                return false;
            }
            const payload = jwtDecode(token || "");

            if (!payload || !payload.exp || payload.exp > Date.now()) {
                return false;
            }

            return true;
        } catch {
            return false;
        }
    }

    public async login(username: string, password: string): Promise<AuthResponse> {
        return sendSecuredRequest(import.meta.env.VITE_AUTH_BASE_URL + "login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            })
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