import { Tag } from "antd";

export enum OrderStatusEnum {
  INIT = 0,
  PENDING = 1,
  BATCHPAY = 3,
  COMPLETED = 5,
  CANCELLED = 6,
  SOLD = 7,
}

export const OrderStatusEnumMaps = {
  [OrderStatusEnum.INIT]: <Tag color="blue">待支付</Tag>,
  [OrderStatusEnum.PENDING]: <Tag color="orange">锁定中</Tag>,
  // [OrderStatusEnum.BATCHPAY]: "批量付",
  [OrderStatusEnum.COMPLETED]: <Tag color="green">已完成</Tag>,
  [OrderStatusEnum.CANCELLED]: <Tag color="red">已取消</Tag>,
};
