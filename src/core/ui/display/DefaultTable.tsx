import { Colors, FontSize } from "../../lib/style";
import { Paper, Skeleton, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import Table from '@mui/material/Table';
import React from "react";



export const DefaultTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: Colors.gray,
        fontWeight: "bold",
        FontSize: FontSize.medium,
        backgroundColor: "transparent",
      },
}));

export const DefaultTableRow = styled(TableRow)(({ theme }) => ({
}));


export interface DefaultTableProps {
    rows: any[],
    renderHead?: () => JSX.Element, 
    renderBody: (row: any, index: number) => JSX.Element, 
    height?: number,
} 


export function DefaultTable( { 
    rows,
    renderHead,
    renderBody,
    height,

 } : DefaultTableProps) {

    return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
                {renderHead && renderHead()}
            </TableHead>
            <TableBody>
                {
                !rows ?
                <DefaultTableRow style={{ height: 53 *  (height || 1)}}>
                <DefaultTableCell colSpan={12}>
                    <Skeleton variant="rectangular" height={50} animation="wave"/>
                </DefaultTableCell>
                </DefaultTableRow>
                :
                rows.map((row, index) => (
                    renderBody(row, index)
                ))
                }
            </TableBody>
        </Table>
    </TableContainer>
        )
}