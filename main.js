let container = document.createElement('DIV');
container.className = 'container';
document.body.append(container);


let pageHeader = document.createElement('DIV');
pageHeader.className = 'page__header';
pageHeader.innerHTML = `<h1>${currentPage}</h1>`;
container.append(pageHeader);

let paginationFooter = document.createElement('DIV');
paginationFooter.classList.add('fixed-bottom', 'pagination__container');
paginationFooter.innerHTML =
    `
     <ul class="pagination">
          <li class="page-item ${currentPage.includes('Home') ? 'disabled' : ''}">
            <a class="page-link"  href="${currentPage.includes('Home') ? '' : (currentPage.includes('2') ? 'index.html' : 'page2.html')}" tabindex="-1" aria-disabled="true"
              >Previous</a
            >
          </li>
          <li class="page-item ${currentPage.includes('Home') ? 'active' : ''}" aria-current="page">
            <a class="page-link" href="index.html">1</a>
          </li>
          <li class="page-item ${currentPage.includes('2') ? 'active' : ''}">
            <a class="page-link" href="page2.html">2</a>
          </li>
          <li class="page-item ${currentPage.includes('3') ? 'active' : ''}"><a class="page-link" href="page3.html">3</a></li>
          <li class="page-item ${currentPage.includes('3') ? 'disabled' : ''}">
            <a class="page-link" href="${currentPage.includes('Home') ? 'page2.html' : (currentPage.includes('2') ? 'page3.html' : '')}">Next</a>
          </li>
        </ul>
    `;
container.append(paginationFooter);
