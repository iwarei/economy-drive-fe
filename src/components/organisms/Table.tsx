import React, { useState } from 'react';

export type HeaderCellProps = {
  type?: 'text' | 'html';
  text?: string;
  textColor?: string;
  bgColor?: string;
  width?: string;
  weight?: 'bold' | 'normal' | 'lighter' | 'bolder';
  className?: string;
  rowSpan?: number;
  colSpan?: number;
  html?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLTableCellElement>;
  id?: string | number;
  sortable?: boolean;
  order?: 'asc' | 'desc' | 'none';
};

export type HeaderProps = {
  cellProps: HeaderCellProps[];
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLTableRowElement>;
  id?: string | number;
};

export type CellProps = {
  type?: 'text' | 'html';
  text?: string;
  bold?: boolean;
  textColor?: string;
  bgColor?: string;
  className?: string; // type: textの場合のみ有効。
  rowSpan?: number;
  colSpan?: number;
  html?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLTableCellElement>;
  id?: string | number;
};

export type RowProps = {
  cellProps: CellProps[];
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLTableRowElement>;
  id?: string | number;
};

export type TableProps = {
  // select?: 'check' | 'radio' | undefined;
  // width?: string;
  // widthFlex?: number[];
  className?: string;
  headerProps?: HeaderProps[];
  rowProps?: RowProps[];
  hover?: boolean;
  border?: boolean;
  shadow?: boolean;
  sortable?: boolean;
};

export const Table = ({
  // select,
  // width,
  // widthFlex,
  className,
  headerProps = [],
  rowProps = [],
  hover = true,
  border = true,
  shadow = true,
  sortable = false,
}: TableProps) => {
  const isAbleSort = Boolean(headerProps?.length === 1 && sortable);

  const [headers, setHeaders] = useState(headerProps);
  const [rows, setRows] = useState(rowProps);

  if (sortable) {
    if (headerProps?.length !== 1) {
      // eslint-disable-next-line no-console
      console.warn(
        'No header or more than 2 columns of headers will invalidate the sorting.'
      );
    }
  }

  const tableHeaderClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const rowId = parseInt(
      e.currentTarget.dataset.rowId ||
        (e.target as HTMLElement).dataset.rowId ||
        '-1',
      10
    );
    const colId = parseInt(
      e.currentTarget.dataset.colId ||
        (e.target as HTMLElement).dataset.colId ||
        '-1',
      10
    );

    if (!isAbleSort) return;

    const newHeaders = structuredClone(headers);
    const currentOrder = newHeaders[rowId].cellProps[colId].order;
    let newOrder: 'asc' | 'desc' | 'none';
    if (currentOrder === 'asc') {
      newOrder = 'desc';
    } else if (currentOrder === 'desc') {
      newOrder = 'none';
    } else {
      newOrder = 'asc';
    }
    newHeaders[0].cellProps[colId].order = newOrder;
    for (let i = 0; i < newHeaders[0].cellProps.length; i += 1) {
      if (colId !== i) newHeaders[0].cellProps[i].order = 'none';
    }
    setHeaders(newHeaders);

    const sortedRows = [...rows].sort((a, b) => {
      const upperedA = (a.cellProps[colId]?.text || '').toUpperCase();
      const upperedB = (b.cellProps[colId]?.text || '').toUpperCase();
      if (newOrder === 'asc' || newOrder === 'none')
        return upperedA.localeCompare(upperedB);
      if (newOrder === 'desc') return upperedB.localeCompare(upperedA);
      return 0;
    });
    setRows(sortedRows);
  };

  return (
    <div
      className={`relative overflow-x-auto${
        shadow ? ' shadow-md' : ''
      } sm:rounded-lg`}
    >
      <table
        className={`w-full table-fixed text-left text-gray-500 dark:text-gray-400 ${
          className ?? ''
        }`}
      >
        <thead className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          {headers?.map?.((row: HeaderProps, rowIndex: number) => {
            return (
              <tr key={`h-r${rowIndex + 1}`}>
                {row.cellProps.map(
                  (cell: HeaderCellProps, colIndex: number) => {
                    return (
                      <th
                        scope="col"
                        className={cell.className ?? `px-6 py-4`}
                        colSpan={cell.colSpan}
                        rowSpan={cell.rowSpan}
                        style={{
                          width: cell.width,
                        }}
                        key={`h-r${rowIndex + 1}-c${colIndex + 1}`}
                        onFocus={cell.onFocus}
                        onClick={tableHeaderClick}
                        data-col-id={colIndex}
                        data-row-id={rowIndex}
                      >
                        <span className="flex items-center">
                          {cell.type === 'html' ? (
                            cell.html
                          ) : (
                            <span
                              style={{
                                fontWeight: cell.weight,
                                color: cell.textColor,
                                backgroundColor: cell.bgColor,
                              }}
                            >
                              {cell.text}
                            </span>
                          )}
                          {isAbleSort &&
                            (cell.order === undefined ||
                              cell.order === 'none') && (
                              <svg
                                className="w-4 h-4 text-gray-800 dark:text-white "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          {isAbleSort && cell.order === 'asc' && (
                            <svg
                              className="w-4 h-4 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          {isAbleSort && cell.order === 'desc' && (
                            <svg
                              className="w-4 h-4 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </span>
                      </th>
                    );
                  }
                )}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {rows?.map?.((rowProp: RowProps, rowIndex: number) => {
            return (
              <tr
                className={`bg-white${
                  border ? ' border-b' : ''
                } dark:bg-gray-800 dark:border-gray-700${
                  hover ? ' hover:bg-gray-50 dark:hover:bg-gray-600' : ''
                }`}
                onClick={rowProp.onClick}
                onFocus={rowProp.onFocus}
                id={
                  typeof rowProp.id === 'number'
                    ? rowProp.id.toString()
                    : rowProp.id
                }
                key={`r${rowIndex + 1}`}
              >
                {rowProp.cellProps.map((cell: CellProps, colIndex: number) => {
                  if (cell.type === 'text' && cell.bold) {
                    return (
                      <th
                        scope="row"
                        className={
                          cell.className ??
                          `px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`
                        }
                        id={
                          typeof cell.id === 'number'
                            ? cell.id.toString()
                            : cell.id
                        }
                        rowSpan={cell.rowSpan}
                        colSpan={cell.colSpan}
                        onClick={cell.onClick}
                        onFocus={cell.onFocus}
                        key={`r${rowIndex + 1}-c${colIndex + 1}`}
                      >
                        {cell.text}
                      </th>
                    );
                  }
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                    <td
                      className={
                        cell.type === 'html'
                          ? cell.className
                          : cell.className ?? `px-6 py-4`
                      }
                      id={
                        typeof cell.id === 'number'
                          ? cell.id.toString()
                          : cell.id
                      }
                      rowSpan={cell.rowSpan}
                      colSpan={cell.colSpan}
                      onClick={cell.onClick}
                      onFocus={cell.onFocus}
                      key={`r${rowIndex + 1}-c${colIndex + 1}`}
                    >
                      {cell.type !== 'html' ? (
                        <span
                          style={{
                            color: cell.textColor,
                            backgroundColor: cell.bgColor,
                          }}
                        >
                          {cell.text}
                        </span>
                      ) : (
                        cell.html
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
