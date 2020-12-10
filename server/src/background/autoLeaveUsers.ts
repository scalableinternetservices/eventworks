import { Redis } from 'ioredis';
import { LessThan } from 'typeorm';
import { check } from '../../../common/src/util';
import { User } from '../entities/User';
import { pubsub } from '../graphql/api';

interface autoLeaveProps {
  redis: Redis
}

const MINUTE_MS = 60000;

export async function autoLeaveUsers({redis}: autoLeaveProps) {
  const awayUsers = await User.find({ where: { timeUpdated: LessThan(new Date(new Date().getTime() - MINUTE_MS)) }})

  console.log(awayUsers)

  if (awayUsers.length > 0) {
    awayUsers.map(async user => {
      user.hostedEvents.map(async events => {
        try {
          const userRedisKey = user.id + "u" + events.id + "e"
          const userRedisObject = check( await redis.get(userRedisKey)) || null;
          const tableId = userRedisObject ? JSON.parse(userRedisObject).tableId : null;
          const tableRedisKey = userRedisObject ? JSON.parse(userRedisObject).tableId + "t" : null

          const userObject = {id: user.id, name: user.name, email: user.email, userType: user.userType, linkedinLink: user.linkedinLink}

          await redis.del(userRedisKey);
          tableRedisKey ? await redis.lrem(tableRedisKey, -1, JSON.stringify(userObject)) : console.log("user is not at an event or table");

          const oldTableUpdatedRedis = tableRedisKey ? check( await redis.lrange(tableRedisKey, 0, -1)) : null
          const oldTableUpdatedObject = oldTableUpdatedRedis ? oldTableUpdatedRedis.map(x => JSON.parse(x)) : null;

          console.log(tableId, oldTableUpdatedObject)

          pubsub.publish('TABLE_UPDATE' + tableId, oldTableUpdatedObject)
        } catch (err) {
          console.log(err, "user isn't currently at any event or table")
        }
      })
    });

    console.log("users not on event deleted from redis");
  }
  else {
    console.log("no users to be removed from event")
  }
}
export const AUTO_LEAVE_USERS_MS = 60000