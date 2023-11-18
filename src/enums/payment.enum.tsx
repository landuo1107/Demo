import { Tag } from "antd";

export enum PaymentStatusEnum {
  DEFAULT = 0,
  PENDING = 1,
  COMPLETED = 2,
  CANCELLED = 3,
  CLOSED = 4,
  REFUNDING = 5,
  REFUNDED = 6,
  REFUND_FAILED = 7,
  REFUND_CLOSED = 8,
}

export const PaymentStatusEnumMaps = {
  [PaymentStatusEnum.DEFAULT]: <Tag color="pink">默认</Tag>,
  [PaymentStatusEnum.PENDING]: <Tag color="volcano">支付中</Tag>,
  [PaymentStatusEnum.COMPLETED]: <Tag color="orange">支付成功</Tag>,
  [PaymentStatusEnum.CANCELLED]: <Tag color="green">支付失败</Tag>,
  [PaymentStatusEnum.CLOSED]: <Tag color="cyan">关闭支付</Tag>,
  [PaymentStatusEnum.REFUNDING]: <Tag color="cyan">退款中</Tag>,
  [PaymentStatusEnum.REFUNDED]: <Tag color="geekblue">退款成功</Tag>,
  [PaymentStatusEnum.REFUND_FAILED]: <Tag color="lime">退款失败</Tag>,
  [PaymentStatusEnum.REFUND_CLOSED]: <Tag color="purple">关闭退款</Tag>,
};
