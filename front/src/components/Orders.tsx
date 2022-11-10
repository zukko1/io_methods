import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders({ data }) {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tiempo</TableCell>
            <TableCell>Valores</TableCell>
            <TableCell>Pronostico</TableCell>
            <TableCell>Error</TableCell>
            <TableCell>Error Absoluto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.tiempo}>
              <TableCell>{row.tiempo}</TableCell>
              <TableCell>{row.valores}</TableCell>
              <TableCell>{row.pronostico}</TableCell>
              <TableCell>{row.error}</TableCell>
              <TableCell>{row.errorAbsoluto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
