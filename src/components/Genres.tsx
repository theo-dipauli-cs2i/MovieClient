import { useState } from "preact/hooks"
import type { ApiResponse } from "../types/ApiResponse"
import { FetchComponent } from "./FetchComponent"

export function Genres() {
    const [response, setResponse] = useState<ApiResponse | null>(null)
    const URL = "http://10.205.47.2:3002/v2/genres"

    return (
        <>
            <FetchComponent
                url={URL}
                onData={setResponse}
            />
            {response && (
                <>
                    <h1>Genres</h1>
                    <div className="d-inline-flex align-items-center mb-2">
                        <span className="badge rounded-pill bg-primary">
                            items: {response.itemCount}
                        </span>
                    </div>
                    <table className="table table-striped w-auto">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Genre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(response.data) && response.data.map((genre: string, idx: number) => (
                                <tr key={genre}>
                                    <td>{idx + 1}</td>
                                    <td>{genre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}