// 返回手续费
export function serviceCharge(val) {
  switch (val) {
    case 4:
      return '6%';
    case 3:
      return '7%';
    case 2:
      return '7%';
    case 1:
      return '40%';
  }
}

// 代理类型
export function agentType(val) {
  switch (val) {
    case 1:
      return '业务员';
    case 2:
      return '区代理';
    case 3:
      return '市代理';
    case 4:
      return '省代理';
  }
}
// 代理类型颜色
export function agentTypeColor(val) {
  switch (val) {
    case 1:
      return 'success';
    case 2:
      return 'info';
    case 3:
      return 'warning';
    case 4:
      return 'danger';
  }
}