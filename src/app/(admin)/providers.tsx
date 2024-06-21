

interface Props {
    children: React.ReactNode;
}

export default function AdminProviders({children} : Props) {
    return (
        <>
            {children}
        </>
           
    )
}