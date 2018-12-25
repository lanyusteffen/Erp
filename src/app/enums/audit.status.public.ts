/**
 * 审核状态
 */
export enum AuditStatusPublic {

    /**
     * 审核通过
     */
    Approved = 1,

    /**
     * 审核中
     */
    Auditing = 2,

    /**
     * 审核未通过
     */
    AuditRefuse = -1,

    /**
     * 未审核
     */
    WaitAudit = 0
}
