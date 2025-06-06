import redis

MAX_PARSERS = 1
SEMAPHORE_KEY = "parsers:running"

r = redis.Redis(host="redis", port=6379,db=0)

def acquire_slot():
    current = r.get(SEMAPHORE_KEY)
    if current and int(current) >= MAX_PARSERS:
        return False
    r.incr(SEMAPHORE_KEY)
    return True

def release_slot():
    r.decr(SEMAPHORE_KEY)
