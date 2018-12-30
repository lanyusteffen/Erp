/**
 * 采购订单状态
 */
export enum PurchaseOrderStatus {

    /**
     * 已作废
     */
    Obsolete = -1,

    /**
     * 草稿
     */
    Draft = 0,

    /**
     * 正常状态
     */
    Normal = 1,

    /**
     * 部分入库
     */
    PartialPurchaseIn = 2,

    /**
     * 全部入库
     */
    AllPurchaseIn = 3,

    /**
     * 部分出库
     */
    PartialPurchaseOut = 4,

    /**
     * 全部出库
     */
    AllPurchaseOut = 5,

    /**
     * 已终止
     */
    Stoped = -2
}
