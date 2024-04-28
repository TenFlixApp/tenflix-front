import { jwtDecode } from "jwt-decode"
import { sendSecuredRequest } from "./Request";
import { AuthResponse } from "@/Types";
import { useAuthStore } from "@/stores";
import { Rights } from "@/constants/Rights";

export default class {
    public isConnected(): boolean {
        const authStore = useAuthStore()
        try {
            const token = authStore.accessToken;
            if (!token || token.length === 0) {
                return false;
            }
            const payload = jwtDecode(token);

            if (!payload || !payload.exp) {
                return false;
            }

            const MILLIS_THRESHOLD = 1000000000000;
            let now = Date.now()
            if (now > MILLIS_THRESHOLD) {
                now = Math.floor(now / 1000)
            }

            if (now > payload.exp) {
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
            }),
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

    public async register(nom: string, prenom: string, email: string, password: string): Promise<AuthResponse> {
        return sendSecuredRequest(import.meta.env.VITE_BACKEND_BASE_URL + "user/register", {
            method: "POST",
            body: JSON.stringify({
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
            }),
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

    public logout() {
        const authStore = useAuthStore()
        authStore.accessToken = ""
        authStore.refreshToken = ""
    }

    public hasRights(rights: Rights): boolean {
        const connected = this.isConnected();
        if (!connected) {
            return false;
        }
        const authStore = useAuthStore()
        try {
            const token = authStore.accessToken;
            if (!token || token.length === 0) {
                return false;
            }
            const payload = jwtDecode(token);
            if (!payload || !payload.rights || payload.rights < rights) {
                return false;
            }

            return true;
        } catch {
            return false;
        }
    }
}