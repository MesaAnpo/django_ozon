from core.redis_connection import task_queue
from products.tasks import parse_with_node

def enqueue_parse(task_data: dict):
    task_queue.enqueue(parse_with_node, data)

