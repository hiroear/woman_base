import React from 'react';

const Pagination = ({ topicsPerPage, totalTopics, paginate }) => {
  // topicsPerPage={15} totalTopics={43} paginate={paginate関数
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalTopics / topicsPerPage); i++) {
    // Math.ceil(2.866...) => 3
    pageNumbers.push(i);  //[1, 2, 3]  配列 PageNumbersに 1〜3の数値を追加
  }
  // console.log(pageNumbers);

  return (
    <nav>
      <ul className='pagination pagination-sm'>
        {pageNumbers.map(number => (
          <li key={number} className={"page-item"}>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination;