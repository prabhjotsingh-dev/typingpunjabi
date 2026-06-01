import { Database } from '@/comman/database.types';
import { useState, useEffect } from 'react';

export function useLessonData(id: string | null) {
    const [lessonData, setLessonData] = useState<Database['public']['Tables']['lessons']['Row'] | null>(null);
    const [lessonContent, setLessonContent] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            
            setIsLoading(true);
            setError(null);
            
            try {
                const res = await fetch(`/api/${id}`);
                const result = await res.json();
                
                if (result && result.content) {
                    setLessonData(result);
                    setLessonContent(result.content.split(''));
                } else {
                    setError("Failed to load lesson content");
                    console.error("Failed to load lesson content:", result);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Error fetching lesson content";
                setError(errorMessage);
                console.error(errorMessage, err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [id]);

    return {lessonData, lessonContent, isLoading, error };
}
