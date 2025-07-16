import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form"
import {useMutation} from "@tanstack/react-query";
import {IAuthForm} from "@/shared/types/authform.interface";
import {authService} from "@/services/auth/auth.service";
import toast from "react-hot-toast";

export function useAuthForm() {
    const router = useRouter()
    const form = useForm<IAuthForm>({
        mode: "onChange",
    })
    const { mutate, isPending } = useMutation({
        mutationKey: ['auth user'],
        mutationFn: (data:IAuthForm) => authService.main(data),
        onSuccess() {
            form.reset()
            toast.success('Успешный вход!')
            router.replace('/i')
        },
        onError(error: any) {
            form.reset()
            if(error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Ошибка при авторизации!")
            }
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = data => {
        mutate(data)
    }

    return { onSubmit, form, isPending }
}