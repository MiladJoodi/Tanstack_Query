"use client"

import { useQuery,useIsFetching } from "@tanstack/react-query";

const ReactQuery = () => {

    const {data, isLoading, isError, isSuccess} = useQuery<any>({
        queryKey: ["todos"],
        queryFn: ()=> fetch("https://jsonplaceholder.typicode.com/todos").then((res)=> res.json()),
    });
    
    if(isLoading){
        return(
            <main className="mt-4 flex min-h-screen flex-col items-center">
                All queries are fetching currently.
            </main>
        )
    }

    console.log(data)

    return (
        <div>
            Enter
        </div>
    );
}

export default ReactQuery;