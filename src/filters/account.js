// 提现状态
export function withdrawStatus(val) {
  switch (val) {
    case 1:
      return '审核中';
    case 2:
      return '未通过';
    case 3:
      return '等待打款';
    case 4:
      return '自动打款异常';
    case 5:
      return '打款完成';
    case 6:
      return '手动打款';
  }
}


// 流水交易类型
export function tradeType(val) {
  switch (val) {
    case 1:
      return '充值';
    case 2:
      return '消费';
    case 3:
      return '入账';
    case 4:
      return '出账';
    case 5:
      return '提现';
  }
}


// 流水交易类型
export function tradeTypeColor(val) {
  switch (val) {
    case 1:
      return 'success';
    case 2:
      return 'info';
    case 3:
      return '';
    case 4:
      return 'danger';
    case 5:
      return 'info';
  }
}