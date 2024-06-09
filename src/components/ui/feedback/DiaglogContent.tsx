"use client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {JSX} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";


export default function MyDialogContent(props: { isOpen: boolean, setIsOpen: (value: boolean) => void, focusClose: boolean, content: JSX.Element, title:string }){
    const handleCloseDialog = (event: object, reason: string) => {
        if(props.focusClose && reason === 'backdropClick'){
            return;
        }
        props.setIsOpen(false);
    }
    return(
        <Dialog open={props.isOpen}
                TransitionComponent={Slide}
                onClose={handleCloseDialog}
                disableEscapeKeyDown={props.focusClose}
                aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{props.title}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={(event) => handleCloseDialog(event, 'close')}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon/>
            </IconButton>
            <DialogContent>
                {props.content}
            </DialogContent>
        </Dialog>
    )
}