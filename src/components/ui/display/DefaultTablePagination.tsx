import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Skeleton, Table, TableCell, TableHead, TableRow, Typography, styled } from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { use, useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { DefaultTableCell, DefaultTableRow } from './DefaultTable';
import { FontSize } from '@/lib/styles';


export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
}
  
export function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Box>
      );
}


interface DefaultTablePaginationProps<T> {
    rows: T[] | undefined;
    labelFontSize?: number;
    renderHead?: () => JSX.Element;
    renderBody: (row: T, index: number) => JSX.Element;
    rowsPerPageOptions?: number[];
    enableAll?: boolean;
    labelRowsPerPage?: string;
    labelNoData?: string;
    fullHeight?: boolean;
}

export default function DefaultTablePagination<T>({
  rows, 
  labelFontSize,
  rowsPerPageOptions = [10, 20, 50],    
  enableAll = false, 
  renderHead, 
  renderBody,
  labelRowsPerPage,
  labelNoData,
  fullHeight = false,
} : DefaultTablePaginationProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = (!rows) ? 0 : 
    (page > 0 ?  Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowsContentChange = () => {
    setPage(0);
  }

  useEffect(() => {
    handleRowsContentChange();
  }, [rows])


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead sx={{backgroundColor: "transparent"}}>
          {renderHead && renderHead()}
        </TableHead>
        <TableBody>
          { !rows ? 
            <DefaultTableRow style={{ height: 53 * emptyRows }}>
              <DefaultTableCell colSpan={12}>
                <Skeleton variant="rectangular" height={50} animation="wave"/>
              </DefaultTableCell>
            </DefaultTableRow> :
            rows.length === 0 ?
            <DefaultTableRow style={{ height: fullHeight ? 53 * rowsPerPageOptions[0] : 53 }}>
              <DefaultTableCell colSpan={12} sx={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Typography fontSize={labelFontSize ? labelFontSize : FontSize.semium}>
                  {labelNoData ? labelNoData : `(Không có dữ liệu)`}
                </Typography>
              </DefaultTableCell> 
            </DefaultTableRow> :
          (rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            renderBody(row, index)
          ))}
          {emptyRows > 0 && (
            <DefaultTableRow style={{ height: 53 * emptyRows }}>
              <DefaultTableCell colSpan={12} />
            </DefaultTableRow>
          )}
        </TableBody>
        <TableFooter>
          <DefaultTableRow>
            <DefaultTableCell colSpan={12}>
            <TablePagination
              rowsPerPageOptions={enableAll ? [...rowsPerPageOptions, {label: "All", value: -1}] : [...rowsPerPageOptions]}
              component={"div"}
              count={rows?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: false,
                },
              }}
              labelRowsPerPage={labelRowsPerPage ? labelRowsPerPage : "Số hàng"}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
            </DefaultTableCell>
          </DefaultTableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}