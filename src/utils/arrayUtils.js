const mergeData = (cachedData, newData, sort = true) => {
  const idArr = {};

  cachedData?.forEach((obj1) => {
    idArr[obj1._id] = { ...obj1 };
  });

  newData.forEach((obj2) => {
    if (idArr[obj2._id]) {
      idArr[obj2._id] = { ...idArr[obj2._id], ...obj2 };
    } else {
      idArr[obj2._id] = { ...obj2 };
    }
  });

  const combinedArray = Object.values(idArr);

  if (sort) {
    combinedArray.sort((a, b) => b._id - a._id);
  }

  return combinedArray;
};

const filteredDataClient = (totalData, query) => {
  const remainData = totalData.filter((item) => {
    let isMatchItem = true;
    // filter name, id

    const isId = !isNaN(parseInt(query.search));
    if (query.search && isId && parseInt(query.search) !== item._id) {
      isMatchItem = false;
    }

    if (
      query.search &&
      !isId &&
      !item.name_product.toLowerCase().includes(query.search.toLowerCase())
    ) {
      isMatchItem = false;
    }

    //filter price
    if (query.price && isMatchItem) {
      let isMatchPrice = false;

      const limit = query.price.split("-");
      const min = parseInt(limit[0]);
      const max = parseInt(limit[1]);

      if (!isNaN(min) && isNaN(max) && item.price >= min) {
        isMatchPrice = true;
      } else if (
        !isNaN(min) &&
        !isNaN(max) &&
        item.price >= min &&
        item.price <= max
      ) {
        isMatchPrice = true;
      }

      isMatchItem = isMatchPrice;
    }

    //filter category

    if (query.category && item.category !== query.category && isMatchItem) {
      isMatchItem = false;
    }

    //filter date
    if (
      query.fromdate &&
      new Date(item.createdAt) < new Date(query.fromdate) &&
      isMatchItem
    ) {
      isMatchItem = false;
    }

    if (
      query.todate &&
      new Date(item.createdAt) > new Date(query.todate) &&
      isMatchItem
    ) {
      isMatchItem = false;
    }

    return isMatchItem;
  });

  return remainData;
};

const filteredSaleOffClient = (totalData, query) => {
  const remainData = totalData.filter((item) => {
    let isMatchItem = true;
    // filter name, id

    const isId = !isNaN(parseInt(query.search));
    if (query.search && isId && parseInt(query.search) !== item._id) {
      isMatchItem = false;
    }

    if (
      query.search &&
      !isId &&
      !item.name_product.toLowerCase().includes(query.search.toLowerCase())
    ) {
      isMatchItem = false;
    }

    //filter price
    if (query.rate && isMatchItem) {
      let isMatchPrice = false;

      const limit = query.rate.split("-");
      const min = parseInt(limit[0]);
      const max = parseInt(limit[1]);

      if (!isNaN(min) && isNaN(max) && item.price >= min) {
        isMatchPrice = true;
      } else if (
        !isNaN(min) &&
        !isNaN(max) &&
        item.price >= min &&
        item.price <= max
      ) {
        isMatchPrice = true;
      }

      isMatchItem = isMatchPrice;
    }

    //filter category
    if (
      query.active &&
      item.active !== JSON.parse(query.active) &&
      isMatchItem
    ) {
      isMatchItem = false;
    }

    //filter date
    if (
      query.fromdate &&
      new Date(item.createdAt) < new Date(query.fromdate) &&
      isMatchItem
    ) {
      isMatchItem = false;
    }

    if (
      query.todate &&
      new Date(item.createdAt) > new Date(query.todate) &&
      isMatchItem
    ) {
      isMatchItem = false;
    }

    return isMatchItem;
  });
  return remainData;
};

export { mergeData, filteredDataClient, filteredSaleOffClient };
