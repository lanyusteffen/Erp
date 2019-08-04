/**
 * 采购订单状态
 */
export enum ReceiveStatus {

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
    PartialStorageIn = 2,

    /**
     * 全部入库
     */
    AllStorageIn = 3,

    /**
     * 部分出库
     */
    PartialStorageOut = 4,

    /**
     * 全部出库
     */
    AllStorageOut = 5,

    /**
     * 已终止
     */
    Stoped = 0
}
