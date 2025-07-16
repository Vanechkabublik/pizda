'use client'

import {useAuthForm} from "@/app/auth/useAuthForm";
import styles from './Auth.module.scss'

export function Auth() {

    const { form, isPending, onSubmit } = useAuthForm()

    return (
        <>
        <div className={styles.wrapper}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                <h2 className={styles.title}>Вход</h2>
                <input
                    {...form.register('email', {
                        required: "Email обязательное поле!",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Некорректный формат почты!"
                        }
                    })}
                    name="email"
                    placeholder="Введите e-mail"
                    type="email"
                    className={styles.input}
                />
                {form.formState.errors.email && <p className={styles.error}>{form.formState.errors.email.message}</p>}
                <input
                    {...form.register('password', {
                        required: "Пароль обязательное поле!",
                        minLength: {
                            value: 6,
                            message: "Минимальная длина пароля — 6 символов."
                        }
                    })}
                    name="password"
                    placeholder="Введите пароль"
                    type="password"
                    className={styles.input}
                />
                {form.formState.errors.password && <p className={styles.error}>{form.formState.errors.password.message}</p>}
                <button type='submit' className={styles.btn}>Войти</button>
            </form>
        </div>
        </>
    )
}