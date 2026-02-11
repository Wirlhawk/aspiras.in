"use client";

import { useAction } from "next-safe-action/hooks";
import { demoAction } from "@/app/actions/demo-action";
import { useState } from "react";

export function DemoClient() {
    const [name, setName] = useState("");
    const { execute, status, result } = useAction(demoAction);

    return (
        <div className="flex flex-col gap-4 p-4 border rounded-lg max-w-md">
            <h2 className="text-xl font-bold">Safe Action Demo</h2>

            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="border p-2 rounded text-black"
                />
            </div>

            <button
                onClick={() => execute({ name })}
                disabled={status === "executing"}
                className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            >
                {status === "executing" ? "Executing..." : "Run Action"}
            </button>

            {result.data?.message && (
                <div className="p-2 bg-green-100 text-green-800 rounded">
                    {result.data.message}
                </div>
            )}

            {result.serverError && (
                <div className="p-2 bg-red-100 text-red-800 rounded">
                    Error: {result.serverError.message}
                </div>
            )}

            {result.validationErrors && (
                <div className="p-2 bg-yellow-100 text-yellow-800 rounded">
                    Validation Error: {JSON.stringify(result.validationErrors)}
                </div>
            )}
        </div>
    );
}
