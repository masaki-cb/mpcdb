import { useMemo } from "react";
import { useTable, Column, useSortBy, useBlockLayout } from "react-table";
import styles from "./CriticTable.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortAlphaUp,
  faSortAlphaDownAlt,
} from "@fortawesome/free-solid-svg-icons";

type Data = {
  pieceID: string;
  playerID: string;
  criticID: string;
  critiqueFileName: string;
  content: string;
};

const columns: Column<Data>[] = [
  { Header: "pieceID", accessor: "pieceID" },
  { Header: "playerID", accessor: "playerID" },
  { Header: "criticID", accessor: "criticID" },
];
type Props = {
  onRowClick: (param: Data) => void;
  allData: Data[];
};

const CriticTable = ({ allData, onRowClick }: Props) => {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Data>(
      { columns, data: allData, defaultColumn },
      useSortBy,
      useBlockLayout
    );
  return (
    // FIXME マルチソートができない
    // FIXME thead固定
    // FIXME 譜面PDF表示
    <div className="card" style={{height:"100%"}}>
      <div className="card-content">
        <table className="table is-hoverable " {...getTableProps()}>
          <thead className={styles.thead}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {console.log(column.getSortByToggleProps())}
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon
                            icon={faSortAlphaDownAlt}
                            style={{ marginLeft: "0.5rem" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faSortAlphaUp}
                            style={{ marginLeft: "0.5rem" }}
                          />
                        )
                      ) : (
                        <FontAwesomeIcon
                          icon={faSort}
                          style={{ marginLeft: "0.5rem" }}
                        />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={styles.tbody}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => onRowClick(row.original)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CriticTable;
