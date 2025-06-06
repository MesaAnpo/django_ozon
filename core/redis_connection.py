import redis
from rq import Queue

redis_conn = redis.Redis(host="redis", port=6379,db=0)
task_queue = Queue("parse", connection=redis_conn)
