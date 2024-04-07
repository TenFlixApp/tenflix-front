import jwtDecode from "jwt-decode";
import { Rights } from "@/constants/Rights";

interface TokenAuth {
    username: string,
    exp: number,
    rights: Rights
}

export function decodeToken(token: string) {
    const decoded: TokenAuth = jwtDecode(token);
    console.log(decoded)
}