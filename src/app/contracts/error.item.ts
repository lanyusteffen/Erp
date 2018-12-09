/**
 * 错误项
 */
export interface ErrorItem {
    /**
     * 内联属性名称, 只有isListMode为True才有效
     */
    PropertyName?: string;
    /**
     * 错误描述
     */
    ErrorMessage: string;
    /**
     * 是否是否在列表中的错误
     */
    ListMode: boolean;
}
