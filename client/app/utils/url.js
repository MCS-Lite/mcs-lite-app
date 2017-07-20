export const query = (arr) => {
  if (arr == "") return {};
  let obj = {};
  arr.forEach((k, i) => {
    const p = arr[i].split('=', 2);
    if (p.length == 1)
      obj[p[0]] = "";
    else
      obj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));  
  });
  return obj;
};

