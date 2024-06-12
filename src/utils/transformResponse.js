export default function transformResponse(response) {
    function transformObject(obj, parent = null) {
      if (obj.hasOwnProperty('data') && Array.isArray(obj.data)) {
        return obj.data.map(item => transformObject(item, parent));
      }

      if (obj.hasOwnProperty('data') && typeof obj.data === 'object') {
        return transformObject(obj.data, parent);
      }
      
      if (obj.hasOwnProperty('attributes') && typeof obj.attributes === 'object') {
        const transformedObj = transformObject(obj.attributes, obj);
        return transformedObj;
      }

      let transformedObj = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            transformedObj[key] = transformObject(obj[key], obj);
          } else {
            transformedObj[key] = obj[key];
          }
        }
      }
      if (parent && parent.hasOwnProperty('id')) {
        transformedObj.id = parent.id;
      }
  
      return transformedObj;
    }
  
    return transformObject(response);
  }