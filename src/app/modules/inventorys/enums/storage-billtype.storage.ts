/**
 * 出库类型
 */
export enum StorageOutTypeEnumPublic {

    /**
     * 默认
     */
    Default = 0,

    /**
    * 领料出库
    */
    MaterialOut = 1,

    /**
    * 委外加工
    */
    OutWork = 2,

    /**
    * 内部领用
    */
    Internal = 3,

    /**
    * 借出
    */
    Out = 4,

    /**
    * 其他类型
    */
    Other = 99
}