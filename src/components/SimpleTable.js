import React from "react";
import PropTypes from "prop-types";

const SimpleTable = ({ header = [], body = [] }) => {
  return (
    <table className="w3-table-all">
      <thead>
        {header && header.length > 0 && (
          <tr>
            {header.map((t, index) => (
              <th key={`header-${index}`}>{t}</th>
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {body &&
          body.length > 0 &&
          body.map((row, rowIndex) => {
            return (
              <tr key={`row-${rowIndex}`}>
                {row.map((data, dataIndex) => (
                  <td key={`cell-${rowIndex}-${dataIndex}`}>{data}</td>
                ))}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

SimpleTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string),
  body: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)),
};

export default SimpleTable;
