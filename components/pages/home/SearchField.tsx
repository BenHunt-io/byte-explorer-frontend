import { Alert, Snackbar, TextField } from "@mui/material"
import React, { useState } from "react";

type SearchFieldProps = {
    handleResult: (rawBlockData: string) => void;
}


type SearchResultStatus = 'SERVER_ERROR' | 'NOT_FOUND' | undefined;

/**
 * This search field is not responsible for managing the results of the search.
 * 
 * It is just responsible for fetching results based on inputs and delegating
 * the results to some handler.
 */
const SearchField = (props : any) => {

    const [input, setInput] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const [searchResultStatus, setSearchResultStatus] = useState<SearchResultStatus>();

    const onChange = (e : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInput(e.target.value);
    }
    
    const handleSnackbarClose = (e: React.SyntheticEvent | Event, reason: string) => {
        setShowNotification(false);
    }

    const handleSearch = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key == "Enter"){
            fetch(`http://localhost:3000/blockchain/block?blockHash=${input}`)
                .then(
                    response => {
                        if(response.ok){
                            return response.text();
                        }
                    
                        throw new Error();
                    }
                )
                .then((rawBlockData : string) => { 
                    if(rawBlockData){
                        props.handleResult(rawBlockData)
                    }
                    else{
                        setSearchResultStatus('NOT_FOUND')
                        setShowNotification(true);
                    }

                })
                .catch(exception => {
                    setSearchResultStatus('SERVER_ERROR')
                    setShowNotification(true);
                })
        }
    }

    const createAlert = (reason: SearchResultStatus) => {
        if(reason == 'NOT_FOUND'){
            return <Alert severity="info">Block data not found</Alert>
        }
        else if (reason == 'SERVER_ERROR'){
            return <Alert severity="error">Search is having issues, please try again later</Alert>
        }
    }

    return (
        <>
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Search for block data by block height or block hash"
                value={input}
                onChange={(e) => onChange(e)}
                onKeyDown={(e) => handleSearch(e)}
            />
            <Snackbar 
                open={showNotification} 
                autoHideDuration={6000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom"
                }}>
                {createAlert(searchResultStatus)}
            </Snackbar>
        </>
    )
}

export default SearchField;