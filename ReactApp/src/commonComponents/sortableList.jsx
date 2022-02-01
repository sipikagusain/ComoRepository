import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { TableBody, TableRow } from '@material-ui/core';

export const SortableList = SortableContainer(({ items, sortable }) => {
  return (
    <TableBody>
      {items.map((value) => (
        <TableRow hover tabIndex={-1}> {value}  </TableRow>
      ))}
    </TableBody>

  );
});