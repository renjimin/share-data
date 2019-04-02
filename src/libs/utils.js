// 生成唯一ID
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 返回随机数
export const randomNum = (minNum, maxNum, float) => {
  let ranNum;
  if (float) {
    ranNum = (minNum + Math.random()).toFixed(2)
    if (ranNum > maxNum) {
      ranNum = maxNum
    }
  } else {
    ranNum = parseInt(Math.random() * (maxNum - minNum + 1) + minNum)
  }
  return ranNum
}
// 返回随机颜色
export const randomColor = (opacity = 0) => {
  return `rgba(
      ${randomNum(0, 255)},
      ${randomNum(0, 255)},
      ${randomNum(0, 255)},
      ${opacity || randomNum(0.4, 0.8, true)}
    )`
}

// 设置导航列表
export const setTagsInSessionStorage = list => {
  sessionStorage.setItem('tags', JSON.stringify(list))
}
// 获取导航列表
export const getTagsFormSessionStorage = () => {
  return new Promise(resolve => {
    const list = sessionStorage.getItem('tags')
    list ? resolve(JSON.parse(list)) : resolve(false)
  })
}
// 设置导航状态
export const setSideStateLocal = state => {
  localStorage.sideState = state
}
// 获取导航状态
export const getSideStateLocal = () => {
  const sideState = localStorage.sideState
  return sideState === 'false' ? false : true
}


// 去抖
export const debounce = (fn, t) => {
  let delay = t || 500;
  let timer;
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  }
};


// 手机号
function isPhone(val) {
  const reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
  if (reg.test(val)) {
    return true;
  } else {
    return false;
  }
}

// 银行卡
function isBank(bankno) {
  var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）
  var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
  var newArr = [];

  for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }
  var arrJiShu = []; //奇数位*2的积 <9
  var arrJiShu2 = []; //奇数位*2的积 >9
  var arrOuShu = []; //偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {//奇数位
      if (parseInt(newArr[j]) * 2 < 9)
        arrJiShu.push(parseInt(newArr[j]) * 2); else
        arrJiShu2.push(parseInt(newArr[j]) * 2);
    }
    else //偶数位
      arrOuShu.push(newArr[j]);
  }
  var jishu_child1 = [];//奇数位*2 >9 的分割之后的数组个位数
  var jishu_child2 = [];//奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
  }
  var sumJiShu = 0; //奇数位*2 < 9 的数组之和
  var sumOuShu = 0; //偶数位数组之和
  var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0;
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }
  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }
  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
  }
  //计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
  //计算Luhm值
  var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
  var luhm = 10 - k;
  if (lastNum == luhm) {
    return true;
  }
  else {
    return false;
  }
}


export function validator(type, val) {
  if (type === 'phone') {
    return isPhone(val);
  }
  if (type === 'bank') {
    return isBank(val);
  }
}