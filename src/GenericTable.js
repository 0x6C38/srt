import React, {Fragment, useState} from "react"
import {Pagination} from "@ds-labs.xyz/srp";
import {TableHead} from "./TableHead";
import {TableBody} from "./TableBody";
import PropTypes from 'prop-types'

export const GenericTable = ({items, itemsPerPage, itemToRow, columnNames, itemMatchesTerm}) => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")

    const pageChanged = async (e) => {
        setPage(parseInt(e.target.innerHTML, 10))
    }
    const searchChanged = async (e) => {
        setPage(1)
        setSearch(e.target.value)
    }


    const offset = Math.max(0, (page - 1) * itemsPerPage)
    // let term = search.toLowerCase()

    const filteredItems = search.length > 0 ? items.filter(item => itemMatchesTerm(item, search)) : items

    const visibleItems = filteredItems.slice(offset, itemsPerPage + offset)

    const tableC =
        <table className="table table-borderless table-hover">
            <TableHead columnNames={columnNames}/>
            <TableBody items={visibleItems} itemToRowF={itemToRow}/>
        </table>

    const searchC = <input className="form-control my-2"
                           type="text"
                           id="search"
                           placeholder="Search.."
                           onChange={searchChanged}
                           autoFocus/>

    const pages = <Pagination totalItems={filteredItems.length}
                              itemsPerPage={itemsPerPage}
                              page={page}
                              onPageChange={pageChanged}/>

    return <Fragment>{searchC}{tableC}{pages}</Fragment>
}

Pagination.propTypes = {
    items: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    itemToRow: PropTypes.func.isRequired,
    columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    itemMatchesTerm: PropTypes.func.isRequired
}

