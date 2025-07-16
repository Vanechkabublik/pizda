import {IAuthForm, IAuthResponse} from "@/shared/types/authform.interface";
import {axiosClassic} from "@/api/api.interceptor";
import {removeFromStorage, saveTokenStorage} from "@/services/auth/authtoken.service";
import {API_URL} from "@/config/api.config";

class AuthService {
    async main(data: IAuthForm) {
        const SERVER_URL = process.env.SERVER_URL as string
        const response = await axiosClassic<IAuthResponse>({
            url: 'http://localhost:5000/auth/login',
            method: 'POST',
            data
        })

        if (response.data.accessToken)
            saveTokenStorage(response.data.accessToken)

        return response
    }

    async getNewTokens() {
        const response = await axiosClassic<IAuthResponse>({
            url: 'http://localhost:5000/auth/login/access-token',
            method: 'POST'
        })

        if (response.data.accessToken)
            saveTokenStorage(response.data.accessToken)

        return response
    }

    async logout() {
        const response = await axiosClassic<boolean>({
            url: 'http://localhost:5000/auth/logout',
            method: 'POST'
        })

        if (response.data) removeFromStorage()

        return response
    }
}

export const authService = new AuthService()