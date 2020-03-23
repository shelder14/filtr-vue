export default (props) => {
  const {
    data: {
      category_id,
      catalog_per_page,
      ...data
    },
    method = 'GET',
  } = props;

  data.nojson = 1;

  for (const key in data) {
    if (data[key] === null) {
      delete data[key];
    }
  }

  const options = {
    method,
  };
  // ($categoryId, $limit, $ignorePaging = false, $level = 1)
  const params = [
    category_id,
    catalog_per_page,
    0,
    10,
  ];

  let url = `/udata/catalog/getCatalogAjaxData/${params.join('/')}/`;

  switch (method) {
    case 'PATCH':
    case 'POST':
      if (data && Object.keys(data).length) {
        Object.assign(options, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(data),
        });
      }
      break;
    case 'DELETE':
    case 'GET':
      if (data && Object.keys(data).length) {
        const fd = [];
        for (const key in data) {
          fd.push(`${key}=${data[key]}`);
        }
        url += `?${fd.join('&')}`;
      }
      break;
    default:
  }

  return fetch(url, options)
    .then(response => response.json())
    .catch((response) => {
      console.error(response);
    });
};
