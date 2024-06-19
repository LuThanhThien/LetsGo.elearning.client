"use client"
import { Colors, FontSize } from "../../lib/style";
import { Checkbox, Paper, Skeleton, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow, TableRowProps, styled, tableCellClasses } from "@mui/material";
import Table from '@mui/material/Table';
import React from "react";



export const DefaultTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: Colors.gray,
        fontWeight: "bold",
        FontSize: FontSize.medium,
        backgroundColor: "transparent",
      },
}));


export type DefaultTableRowProps = TableRowProps & {
    checkBoxSelection?: boolean,
};

export const DefaultTableRow = (props: DefaultTableRowProps) => {
    return (
        <TableRow {...props}>
            {
                props.checkBoxSelection &&
                <DefaultTableCell padding="checkbox">
                    <Checkbox
                    color="primary"
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    // onChange={onSelectAllClick}
                    sx={{ paddingRight: 2}}
                    inputProps={{
                    'aria-label': 'select all desserts',
                    }}
                    />
                </DefaultTableCell>
            }
            {props.children}
        </TableRow>
    )
}


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