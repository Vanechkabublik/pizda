'use client'
import styles from './Page.module.scss'
import React, { Suspense } from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {saveTokenStorage} from "@/services/auth/authtoken.service";
import {useProfile} from "@/hooks/useProfile";
import {IUser} from "@/shared/types/user.interface";
import Image from "next/image";
import Link from "next/link";
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth/auth.service";
import toast from "react-hot-toast";

export default function IPage() {

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const accessToken = searchParams.get('accessToken')

        if (accessToken) saveTokenStorage(accessToken)
    }, [searchParams])

    const { user, isLoading } = useProfile()

    const { mutate: logout } = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            toast.success('Вы вышли из аккаунта!')
            router.push('/auth')
        }
    })

    if (!user) return null

    return (
        <>
            <Suspense fallback={<div>Загрузка...</div>}>
                <header className={styles.header}>
                    <div className={styles.inner}>
                        <Link className={styles.logo} href={'/'}>LOGO</Link>
                        <div className={styles.right}>
                            <div className={styles.user}>
                                <img className={styles.avatar} src={user.avatar} alt="Avatar"/>
                                <span className={styles.name}>{user.name}</span>
                            </div>
                            <button onClick={() => logout()} className={styles.logout}>Выйти</button>
                        </div>
                    </div>
                </header>
            </Suspense>
        </>
    )
}