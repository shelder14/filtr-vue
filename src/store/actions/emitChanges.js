import request from '@/utils/request';

const $ = window.jQuery;

function markerscroll(name) {
  if (typeof $ !== 'undefined') {
    if (name === '#') return;
    if ($(`a[name="${name}"]`).length === 0) return;

    $('html, body').stop().animate({
      scrollTop: $(`a[name="${name}"]`).offset().top - 10,
    }, 1000);
  }
}

export default function ({ dispatch, commit, state }) {
  // удаляем лишние элементы при обновлении филтра
  if ($ !== undefined) {
    // if ($('#remove_description').length) {
    //   $('#remove_description').fadeOut(150, function () {
    //     $(this).remove();
    //   });
    // }
    if ($('#remove_subcategory_title').length) {
      $('#remove_subcategory_title').fadeOut(150, function () {
        $(this).remove();
      });
    }
    if ($('#remove_subcategories_no').length) {
      $('#remove_subcategories_no').fadeOut(150, function () {
        $(this).remove();
      });
    }
    // if ($('.seo_text,h1 + .text').length) {
    //   $('.seo_text,h1 + .text').remove();
    // }
  }
  // костыль жуткий
  window.document
    .querySelector('#page_main_header .h1_content')
    .innerHTML = 'Стыкоперекрывающие профили и пороги для пола, стен и лестниц';
  window.document
    .querySelector('.breadcrumbs')
    .innerHTML = `
      <ul>
        <li class="breadcrumbs_home"><a href="/">
            <div>Главная</div>
          </a><span class="breadcrumb_separator"><span class="separator_text">/</span></span></li>
        <li><a href="/katalog/" title="Каталог">
            <div>Каталог</div>
          </a><span class="breadcrumb_separator"><span class="separator_text">/</span></span></li>
        <li class="breadcrumbs_last"><a>
            <div>Пороги и профили</div>
          </a><span class="breadcrumb_separator"><span class="separator_text">/</span></span></li>
      </ul>`;
  window.document
    .querySelector('.right_block')
    .classList.add('loading');

  return request({
    data: state.options,
  }).then((data) => {
    window.document
      .querySelector('.right_block')
      .classList.remove('loading');

    if (data.objects) {
      commit('setTotal', data.objects.total);
      commit('setCatalog', data.objects.lines ? data.objects.lines['nodes:item'] : []);
    }
    if (data.filter) {
      dispatch('actualizedFilter', data.filter);
    }

    if (typeof $ !== 'undefined') {
      let scroll = $(window).scrollTop();
      if (scroll > 200) markerscroll('top');
    }

    // if (addHistory && typeof window.history !== 'undefined') {
    //   window.history.pushState(startOptions, '', window.location.pathname + '?' + obj2get(startOptions))
    // }
  }).catch((error) => {
    window.document
      .querySelector('.right_block')
      .classList.remove('loading');
    console.error(error);
  });
}
