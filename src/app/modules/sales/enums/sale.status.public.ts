/**
 * 采购订单状态
 */
export enum SalesOrderStatus {

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
     * 部分出库
     */
    PartialSalesOut = 2,

    /**
     * 全部出库
     */
    AllSalesOut = 3,

    /**
     * 部分入库
     */
    PartialSalesIn = 4,

    /**
     * 全部入库
     */
    AllSalesIn = 5,

    /**
     * 已终止
     */
    Stoped = -2
}
