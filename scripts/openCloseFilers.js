export function handleOpenCloseFilters() {
  const filters = document.querySelectorAll('.filter__selector');
  const filtersInputs = document.querySelectorAll('.filter__input');
  const closeFilterBtn = document.querySelectorAll('.filter__arrow');

  filters[0].addEventListener('click', openFilter);
  filters[1].addEventListener('click', openFilter);
  filters[2].addEventListener('click', openFilter);

  closeFilterBtn[0].addEventListener('click', closeFilter);
  closeFilterBtn[1].addEventListener('click', closeFilter);
  closeFilterBtn[2].addEventListener('click', closeFilter);

  function openFilter() {
    filters.forEach((filter) => filter.classList.remove('open'));

    filtersInputs.forEach((input) => {
      input.type = 'button';
      input.value = input.dataset.value;
    });

    this.classList.add('open');

    const input = this.firstChild.nextElementSibling;
    input.type = 'text';
    input.value = '';
  }

  function closeFilter(e) {
    e.stopPropagation();
    filters.forEach((filter) => filter.classList.remove('open'));

    filtersInputs.forEach((input) => {
      input.type = 'button';
      input.value = input.dataset.value;
    });
  }
}
