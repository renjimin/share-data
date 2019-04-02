// 资格券状态
export function ticketStatus(val) {
  switch (val) {
    case 1:
      return '未消费';
    case 2:
      return '消费中';
    case 3:
      return '已消费';
  }
}


// 资格券状态颜色
export function ticketStatusColor(val) {
  switch (val) {
    case 1:
      return '';
    case 2:
      return 'success';
    case 3:
      return 'danger';
  }
}