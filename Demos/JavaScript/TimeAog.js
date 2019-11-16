const timeAgo = function (t1, t2) {
  const time1 = new Date(t1);
  const time2 = new Date(t2);
  if (isNaN(time1.getTime()) || isNaN(time2.getTime())) return;
  const obj = {
    '年': time1.getFullYear() - time2.getFullYear(),
    '个月': time1.getMonth() - time2.getMonth(),
    '天': time1.getDate() - time2.getDate(),
    '小时': time1.getHours() - time2.getHours(),
    '分钟': time1.getMinutes() - time2.getMinutes(),
    '秒': time1.getSeconds() - time2.getSeconds(),
  }
  let result;
  // for (const [key, value] of Object.entires(obj)) {
  for (const key in obj) {
    const value = obj[key];
    if (key === '秒' && (value > -10 && value <= 0)) {
      result = '刚刚'
      break;
    } else if (value != 0) {
      result = `${Math.abs(value)}${key}${value > 0 ? '后' : '前'}`;
      break;
    }
  }
  return result;
}

const timeAgo = function (t1, t2) {
  const time1 = new Date(t1);
  const time2 = new Date(t2);
  if (isNaN(time1.getTime()) || isNaN(time2.getTime())) return;
  const diffTime = time1.getTime() - time2.getTime();
  if (Math.abs(diffTime) < 10 * 1000 && diffTime <= 0) return '刚刚';
  const funcs = ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds'];
  const labels = ['年', '个月', '天', '小时', '分钟', '秒'];
  for (let index = 0; index < funcs.length; index++) {
    const funcKey = `get${funcs[index]}`;
    const diff = time1[funcKey]() - time2[funcKey]();
    if (diff != 0) {
      return `${Math.abs(diff)}${labels[index]}${diff > 0 ? '后' : '前'}`;
    }
  }
}

const timeAgo = function (t1, t2) {
  const time1 = new Date(t1);
  const time2 = new Date(t2);
  if (isNaN(time1.getTime()) || isNaN(time2.getTime())) return;
  const diffTime = time1.getTime() - time2.getTime();
  if (Math.abs(diffTime) < 10 * 1000 && diffTime <= 0) return '刚刚';
  const obj = { '年': 'FullYear', '个月': 'Month', '天': 'Date', '小时': 'Hours', '分钟': 'Minutes', '秒': 'Seconds' }
  for (const key in obj) {
    const funcKey = `get${obj[key]}`;
    const diff = time1[funcKey]() - time2[funcKey]();
    if (diff != 0) {
      return `${Math.abs(diff)}${key}${diff > 0 ? '后' : '前'}`;
    }
  }
}

const timeAgo = function (t1, t2) {
  const time1 = new Date(t1);
  const time2 = new Date(t2);
  if (isNaN(time1.getTime()) || isNaN(time2.getTime())) return;
  const diffTime = time1.getTime() - time2.getTime();
  if (Math.abs(diffTime) < 10 * 1000 && diffTime <= 0) return '刚刚';
  const obj = { '年': 'getFullYear', '个月': 'getMonth', '天': 'getDate', '小时': 'getHours', '分钟': 'getMinutes', '秒': 'getSeconds' }
  for (const key in obj) {
    const diff = time1[obj[key]]() - time2[obj[key]]();
    if (diff != 0) {
      return `${Math.abs(diff)}${key}${diff > 0 ? '后' : '前'}`;
    }
  }
}