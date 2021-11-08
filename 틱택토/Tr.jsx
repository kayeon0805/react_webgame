import React, { memo } from "react";
import Td from "./Td";
import Table from "./Table";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} />
            ))}
        </tr>
    )
});

export default Tr;