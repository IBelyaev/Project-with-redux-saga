var srt = 'адрес карп кума куст мир мука парк рим среда стук рост сорт трос';

function getAnagrams(srt) { 
  let arr = srt.split(' ');
  let obj = {};
  
  for (i = 0; i < arr.length; i++) {
    let sort = arr[i].toLowerCase().split('').sort().join('');
      
    obj[sort] = obj[sort] ? `${obj[sort]}-${arr[i]}` : arr[i] ;
  }
  
  let result = [];

  for (var key in obj) result.push(obj[key]);

  return result;
}