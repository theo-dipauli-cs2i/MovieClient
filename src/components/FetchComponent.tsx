import useFetch from "react-fetch-hook"
import type { ApiResponse } from "../types/ApiResponse"

type FetchComponentProps = {
    url: string;
    onData: (data: ApiResponse) => void;
};

export function FetchComponent({ url, onData }: FetchComponentProps) {
    const { isLoading, data, error } = useFetch<ApiResponse>(url)

    if (data) {
        onData(data)
    }

    if (isLoading) return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="24" height="24" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#1976d2" strokeWidth="5" strokeDasharray="31.4 31.4" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" from="0 25 25" to="360 25 25" />
                </circle>
            </svg>
            <span>Chargement...</span>
        </div>
    )
    if (error) return <div className={"alert alert-danger"}>Erreur: {error.message}</div>
    if (!data) return <div>Aucune donnée</div>
}