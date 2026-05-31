import { useState, useEffect } from 'react';

export function useAllLessons(shouldFetch: boolean) {
    const [data, setData] = useState<any[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!shouldFetch) return;
            
            setIsLoading(true);
            setError(null);
            
            try {
                const res = await fetch("/api/all");
                const result = await res.json();
                
                if (result && result.data) {
                    setData(result.data);
                } else {
                    setError("Failed to load lessons");
                    console.error("Failed to load lessons:", result);
                    setData([]);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Error fetching lessons";
                setError(errorMessage);
                console.error(errorMessage, err);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [shouldFetch]);

    return { data, isLoading, error };
}
