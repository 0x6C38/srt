import React, {} from "react"

export const TableHead = ({columnNames}) => {
    const cols = columnNames.map((c,i) => <th scope="col" key={i}>{c}</th>)
    return <thead className="thead-light"><tr>{cols}</tr></thead>
}