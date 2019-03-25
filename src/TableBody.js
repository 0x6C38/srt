import React, {} from "react"

export const TableBody = ({items, itemToRowF}) => {
    const rows = items.map((w) => itemToRowF(w))
    return <tbody>{rows}</tbody>
}