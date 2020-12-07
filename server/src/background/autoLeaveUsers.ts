import { Redis } from 'ioredis';

interface autoLeaveProps {
  redis: Redis
}

export async function autoLeaveUsers({redis}: autoLeaveProps) {
  console.log( await redis.scan(0, "MATCH", "*"))

  /*const userRow = check (await User.findOne({ where: {id: user.user?.id }}))

  if (userRow) {
    const timeStampKey = userRow.id + "time"
    const redisUserSearch = check(await redis.mget(timeStampKey));

    const lastTimeUpdate = redisUserSearch ? parseInt(redisUserSearch + "") : null;
    const currentTime = new Date().getTime();
    if (lastTimeUpdate) {
      if (lastTimeUpdate + 60000 < currentTime ) {
        const userKey = userRow.id + "u";
        const userTable = check (await redis.get(userKey));

        const tableId = JSON.parse(userTable).tableId;
        const tableKey = tableId + "t";

        await redis.lrem(tableKey, -1, JSON.stringify({id: userRow.id, name: userRow.name}));
        await redis.del(userKey)
        console.log("user not in any event")
      }
      else {
        console.log("user in an event")
      }
    }
  }*/

  console.log('no user logged in')
}

export const AUTO_LEAVE_USERS_MS = 60000