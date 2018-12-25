/**
 * 状态栏导航
 */
export interface NavItem {

    /**
     * 数据状态
     */
    Status?: number;

    /**
     * 审核状态
     */
    AuditStatus?: number;

    /**
     * 业务状态
     */
    BusinessStatus?: number;

    /**
     * 导航状态名称
     */
    Name: string;

    /**
     * 导航标识
     */
    Code: string;

    /**
     * 是否选中
     */
    IsSelected: boolean;
}
