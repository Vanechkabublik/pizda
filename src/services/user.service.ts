
import { API_URL } from '@/config/api.config'

import { IUser } from '@/shared/types/user.interface'
import {axiosWithAuth} from "@/api/api.interceptor";

class UserService {
    async getProfile() {
        const { data } = await axiosWithAuth<IUser>({
            url: 'http://localhost:5000/profile/i',
            method: 'GET'
        })

        return data
    }
}

export const userService = new UserService()
