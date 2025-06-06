#from celery import shared_task

#@shared_task
#def test_task():
#    return "Task completed"



from core.semaphore import acquire_slot, release_slot
import subprocess, json
from celery import shared_task

@shared_task
def parse_with_node(task_data):
    if not acquire_slot():
        print("Парсеров запущено слишком много. Задача отложена")
        return "Too many running"
    try:
        result = subprocess.check_output(
            ["node", "parser/parser.js"],
            input=json.dumps(task_data).encode("utf-8")
        )
        return json.loads(result)
    except subprocess.CalledProcessError as e:
        return {"error": e.output.decode("utf-8")}
    finally:
        release_slot()
