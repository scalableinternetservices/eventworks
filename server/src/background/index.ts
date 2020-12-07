import { autoLeaveUsers, AUTO_LEAVE_USERS_MS } from './autoLeaveUsers';
import { deleteOldEvents, DELETE_OLD_EVENTS_MS } from './deleteOldEvents';

export function initBackgroundProcesses() {
  setInterval(deleteOldEvents, DELETE_OLD_EVENTS_MS)
  setInterval(autoLeaveUsers, AUTO_LEAVE_USERS_MS)
}