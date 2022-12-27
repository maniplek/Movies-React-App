import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props; //number of item and pagesize we have in our state
console.log(currentPage)
  const pagesCount = Math.ceil(itemsCount / pageSize); //we are getting number of items that can be on one page
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); // here we are converting page account into array so that each array value takes an element

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination"> 
        {pages.map( page => (
            <li key={page} className={ page  === currentPage ? 'page-item active' : 'page-item'}>
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
