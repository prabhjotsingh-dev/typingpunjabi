import { useState, useEffect } from 'react';

export function useLessonResult(id: string | null) {
    const [data, setData] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            
            setIsLoading(true);
            setError(null);
            
            try {
                const res = await fetch(`/api/${id}`);
                const item = await res.json();
                
                if (item && !item.error) {
                    setData(item);
                } else {
                    setError("Failed to fetch result details");
                    console.error("Failed to fetch result details:", item);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Error fetching result details";
                setError(errorMessage);
                console.error(errorMessage, err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [id]);

    return { data, isLoading, error };
}
