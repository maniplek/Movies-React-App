/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash"; // optimized version of underscore package
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props; //number of item and pagesize we have in our state

  const pagesCount = Math.ceil(itemsCount / pageSize); //we are getting number of items that can be on one page/ converting to integer so that if its one we dont see pagination

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); // here we are converting page account into array so that each array value takes an element

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/** if u have reusable component u should use PropTypes to catch syntax error */

Pagination.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
