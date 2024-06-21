"use client"
import { Box, Grid, Stack, StackProps, styled } from "@mui/material";
import { GlobalStyle } from "@/@share/lib/style";

export type MainContainerProps = {
    backgroundProps?: StackProps;
    contentProps?: StackProps;
    children: React.ReactNode;
};

export const BackgroundContainer = styled(Stack)<StackProps>(({theme}) => {
    return {
        backgroundColor: theme.palette.background.default,
        width: "100%",
        justifyItems: "center",
        alignItems: "center",
    }
})

export const ContentContainer = styled(Stack)<StackProps>(({theme}) => {
    return {
        width: GlobalStyle.width,
    }
})

export const LayoutContainer = styled(Stack)<StackProps>(({theme}) => {
    return {
        width: "100%",
        justifyItems: "center",
        alignItems: "center",
    }
})

export function MainContainer( props: MainContainerProps ) {
    return (
        <BackgroundContainer {...props.backgroundProps}>
            <ContentContainer {...props.contentProps}>
                {props.children}
            </ContentContainer>
        </BackgroundContainer>
    )
}