"use client"
import { useSearchParams } from "next/navigation";
import { use, useEffect } from "react"
import Props from "../../props";
import { JsonValue } from "@/@share/index.models";
import { callbackPayment } from "@/app/api/index.api";
import { useUser } from "@/@core/index.provider";

export default function CallbackPage(
    { params } : { params: Props}
) {
    const route = useSearchParams()
    const {
        session
    } = useUser();

    async function handleCallbackPayment(data: JsonValue | string) {
        return await callbackPayment(params.paymentId, data)
    }

    useEffect(() => {
        if (session) {
            const data : string = route.toString()
            console.log("Callback page data", data);
            const res = handleCallbackPayment(data)
            console.log("Callback page response", res);
        }
    }, [session])

    return (
        <div>
            <h1>Callback Page for Payment #{params.paymentId}</h1>
            <p>This is the callback page</p>
        </div>
    )
}   