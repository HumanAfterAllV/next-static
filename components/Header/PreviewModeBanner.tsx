import { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import { Alert } from "@ui/Alert";

type PreviewStatusResponse = {
    preview: boolean
    context: JSON
} | null

export function PreviewModeBanner() {
    const [isEnable, setIsEnable] = useState<boolean>(false)

    useEffect(() => {
        try{
            fetch('/api/preview/status')
            .then(response => response.json())
            .then((data: PreviewStatusResponse) => {
                setIsEnable(data?.preview || false)
            })
        }
        catch(error){
            setIsEnable(false)
        }
    }, [])

    if(!isEnable){
        return null
    }

    return(
        <div className="fixed right-0 bottom-16 w-md transform translate-x-2/3 hover:translate-x-0 z-10 transition-transform duration-300">
            <Alert severity="warning" variant="filled" action={
                <Button variant="text" color="inherit" href="/api/preview/exit">
                    Disable preview mode
                </Button>
            }>
                <div className="max-w-md"> Preview mode is enabled</div>
            </Alert>
        </div>
    )
}
