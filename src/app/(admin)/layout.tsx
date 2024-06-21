import AdminProviders from "./providers";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children } : Props) {
    return (
        <AdminProviders>
            {children}
        </AdminProviders>
    )
}