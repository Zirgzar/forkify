import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currPage = this._data.page;

    const nextButton = `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${currPage + 1}</span>
        </button>
        `;

    const prevButton = `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
        </button>
        `;

    // Page 1 & other pages
    if (currPage === 1 && numPages > 1) {
      return nextButton;
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return prevButton;
    }

    // Middle page
    if (currPage > 1 && currPage < numPages) {
      return `${prevButton} ${nextButton}`;
    }
    // Page 1 no other pages
    return '';
  }

  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;

      handler(gotoPage);
    });
  }
}

export default new PaginationView();
