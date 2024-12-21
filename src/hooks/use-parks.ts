'use client';

import {useState, useEffect} from 'react';
import {ParksAPIResponse, npsResponseSchema} from '@/types/park-types';
import {useParksContext} from '@/contexts/parks-context';

// TODO: Add ability to fetch more data, current fetch gets max of 50 items, but has "total" property in json you can use.
async function fetchParks(stateCode?: string): Promise<ParksAPIResponse> {
    const url = `https://developer.nps.gov/api/v1/parks?api_key=${process.env.NEXT_PUBLIC_NPS_API_KEY}&stateCode=${stateCode ? '' : ''}`;

    const res = await fetch(url);
    const json = await res.json();

    const parsedData = npsResponseSchema.parse(json);
    return parsedData;
}

export function useParks(stateCode?: string) {
    const {parks, setParks} = useParksContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!stateCode) {
            setParks(null);
            setLoading(false);
            return;
        }

        let isMounted = true;
        setLoading(true);

        fetchParks(stateCode)
            .then((response) => {
                if (isMounted) {
                    setParks(response.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [stateCode]);

    return {parks, loading, error};
}
