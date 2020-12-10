import { Redis } from 'ioredis';
import { autoLeaveUsers, AUTO_LEAVE_USERS_MS } from './autoLeaveUsers';
import { deleteOldEvents, DELETE_OLD_EVENTS_MS } from './deleteOldEvents';

interface backgroundProps {
  redis: Redis
}

export function initBackgroundProcesses({redis}: backgroundProps) {
  setInterval(deleteOldEvents, DELETE_OLD_EVENTS_MS)
  setInterval(function() { autoLeaveUsers({redis: redis})}, AUTO_LEAVE_USERS_MS)
}