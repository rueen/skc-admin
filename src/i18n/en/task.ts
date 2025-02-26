/*
 * @Author: diaochan
 * @Date: 2025-02-26 11:50:50
 * @LastEditors: rueen
 * @LastEditTime: 2025-02-26 11:52:35
 * @Description: 
 */
export default {
  platform: 'Platforms',
  columns: {
    name: 'Task Name',
    platform: 'Platform',
    status: 'Status',
    enrollCount: 'Enrollment Count',
    startTime: 'Start Time',
    endTime: 'End Time',
    operation: 'Operation',
  },
  status: {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
  },
  deleteConfirm: 'Are you sure to delete this task?',
} 