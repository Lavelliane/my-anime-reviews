export default function transformSingleResponse(obj) {
  if (Array.isArray(obj)) {
    return obj.map(transformSingleResponse);
  } else if (obj && typeof obj === 'object') {
    if (obj.hasOwnProperty('data')) {
      return transformSingleResponse(obj.data);
    } else if (obj.hasOwnProperty('attributes')) {
      const newObj = { ...transformSingleResponse(obj.attributes) };
      if (obj.id) {
        newObj.id = obj.id;
      }
      return newObj;
    } else {
      const newObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = transformSingleResponse(obj[key]);
        }
      }
      return newObj;
    }
  }
  return obj;
}