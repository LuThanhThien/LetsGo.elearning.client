import { Colors } from "@/@share/lib/style";
import { Link, SxProps, Theme, Typography } from "@mui/material";

export const createBreadcrumbLink = (name: string, href: string) => {
    return (
        <Link underline="hover" color="inherit" href={href} key={`breadcrumb-${name}`}>
            <Typography variant="body1" fontWeight={"bold"}>{name}</Typography>
        </Link>
)}

export const CourseBreadcrumbs = [
    createBreadcrumbLink("Trang chủ", "/"),
    createBreadcrumbLink("Khoá học", "/courses"),
]


export const BreadcrumbSx : SxProps<Theme> = {
    paddingLeft: 1,
    color: Colors.primary,
 }