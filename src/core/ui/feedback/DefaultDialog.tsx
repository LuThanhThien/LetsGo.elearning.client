import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Typography } from "@mui/material";
import React from "react";


export interface DefaultDialogProps extends DialogProps {
    title?: string;
    content?: string;
    renderTitle?: () => React.ReactNode;
    renderContent?: () => React.ReactNode;
    renderActions: () => React.ReactNode;
};

export const DefaultDialog : React.FC<DefaultDialogProps> = (
    { renderActions, renderContent, renderTitle, title, content, ...others }
) => {

    return (
        <Dialog
            {...others}
            >
            <DialogTitle id="signout-dialog-title">
                {
                    renderTitle ? renderTitle() : 
                    <Typography variant="h6" fontWeight={"bold"}>{title}</Typography>
                }
            </DialogTitle>
            <DialogContent>
                {
                    renderContent ? renderContent() : 
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="body2">{content}</Typography>
                    </DialogContentText>
                }
            </DialogContent>
            <DialogActions>
                {renderActions()}
            </DialogActions>
        </Dialog>);
}

