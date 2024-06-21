import { BackgroundContainer, ContentContainer } from "@/components/index.component";
import { Breadcrumbs, BreadcrumbsProps, Divider, Grid, Stack, StackProps } from "@mui/material";

export interface CourseHeaderProps extends StackProps {
    children: JSX.Element;
    breadcrumbs?: JSX.Element[];
    breadcrumbsProps?: BreadcrumbsProps;
}

export default function CourseHeader({
    children, 
    breadcrumbs, 
    breadcrumbsProps,
    ...props
} : CourseHeaderProps) {
    return (
        <BackgroundContainer
         className="background-header"
         alignItems={"center"}
         padding={2}
         justifyItems={"center"}
         {...props}
      >
        <ContentContainer 
            height={props.height}>
            <Breadcrumbs 
                separator="›" 
                aria-label="breadcrumb"
                {...breadcrumbsProps}
                sx={{
                    paddingTop: 1,
                    ...breadcrumbsProps?.sx
                }}
            >
                {breadcrumbs}
            </Breadcrumbs>
            {children}
        </ContentContainer>
      </BackgroundContainer>
    )
}