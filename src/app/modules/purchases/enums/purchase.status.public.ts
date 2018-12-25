/**
 * 采购订单状态
 */
export enum PurchaseOrderStatus {

    /**
     * 草稿
     */
    Draft = 0,

    /**
     * 部分入库
     */
    PartialPurchaseIn = 1,

    /**
     * 全部入库
     */
    AllPurchaseIn = 2,

    /**
     * 部分出库
     */
    PartialPurchaseOut = 3,

    /**
     * 全部出库
     */
    AllPurchaseOut = 4,

    /**
     * 已终止
     */
    Stoped = 5
}
