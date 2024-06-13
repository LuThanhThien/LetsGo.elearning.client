"use client"

import { Dialog, DialogActions, DialogContent, DialogContentProps, DialogContentText, DialogContentTextProps, DialogProps, DialogTitle, DialogTitleProps, Typography, TypographyProps } from "@mui/material";
import React from "react";


export interface DefaultDialogProps extends DialogProps {
    title?: string;
    content?: string;
    titleProps?: TypographyProps;
    contentProps?: TypographyProps;
    dialogTitleProps?: DialogTitleProps;
    dialogContentProps?: DialogContentProps & DialogContentTextProps;
    renderTitle?: () => React.ReactNode;
    renderContent?: () => React.ReactNode;
    renderActions: () => React.ReactNode;
};

export const DefaultDialog : React.FC<DefaultDialogProps> = ({ 
    renderActions, 
    renderContent,
    renderTitle,
    title,
    titleProps,
    dialogTitleProps,
    content,
    contentProps,
    dialogContentProps,
    sx,
    ...others }
) => {

    return (
        <Dialog
            sx={{
                '.MuiPaper-root': {
                    padding: 1,
                },
                ...sx
            }}
            {...others}
            >
            <DialogTitle sx={{paddingLeft: 2}} id="signout-dialog-title" {...dialogTitleProps}>
                {
                    renderTitle ? renderTitle() : 
                    <Typography variant="h6" fontWeight={"bold"} sx={{
                        margin: 0
                    }} {...titleProps}>{title}</Typography>
                }
            </DialogTitle>
            <DialogContent {...dialogContentProps}>
                {
                    renderContent ? renderContent() : 
                    <DialogContentText sx={{paddingLeft: 0}} id="alert-dialog-description" {...dialogContentProps}>
                        <Typography variant="body2" {...contentProps}>{content}</Typography>
                    </DialogContentText>
                }
            </DialogContent>
            <DialogActions>
                {renderActions()}
            </DialogActions>
        </Dialog>);
}

