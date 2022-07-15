import { useState } from "react"

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    const fetching = async (params=null) => {
        try {
            setIsLoading(true)
            await params ? callback(params) : callback()
        } catch (e) {
            setError(e.message);
        }  finally {
            setIsLoading(false)  
        }
    }
    return [fetching, isLoading, error]
};

