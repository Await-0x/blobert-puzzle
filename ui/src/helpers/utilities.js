export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export function uniquefy(arr, field) {
  const seen = {};

  return arr.filter((item) => {
    if (!seen[item[field]]) {
      seen[item[field]] = true;
      return true;
    }
    return false;
  });
}

export function addArrays(arrays) {
  return arrays.reduce((result, currentArray) => {
    for (let i = 0; i < arrays[0].length; i++) {
      result[i] = (result[i] || 0) + currentArray[i];
    }
    return result;
  }, []);
}

export function ellipseAddress(address, start, end) {
  return `${address.slice(0, start)}...${address.slice(-end)}`.toUpperCase();
}

export function calculateDistance(x1, y1, x2, y2) {
  var deltaX = x2 - x1;
  var deltaY = y2 - y1;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

export const fetchImage = (id) => {
  let folder = ''
  
  let num = Number(id)
  if (num < 1000) {
    folder = 'images'
  } else if (num < 2000) {
    folder = 'images1'
  } else if (num < 3000) {
    folder = 'images2'
  } else if (num < 4000) {
    folder = 'images3'
  } else if (num < 5000) {
    folder = 'images4'
  }

  return new URL(`../assets/${folder}/piece_${id}.png`, import.meta.url).href
}