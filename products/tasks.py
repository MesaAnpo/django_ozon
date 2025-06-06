#from celery import shared_task

#@shared_task
#def test_task():
#    return "Task completed"



from core.semaphore import acquire_slot, release_slot
import subprocess, json
from celery import shared_task
from products.models.models import ParsedProduct


@shared_task
def parse_with_node_and_save(task_data):
    if not acquire_slot():
        print("Парсеров запущено слишком много. Задача отложена")
        return "Too many running"
    try:
        result = subprocess.check_output(
            ["node", "parser/parser.js"],
            input=json.dumps(task_data).encode("utf-8")
        )
        decoded = result.decode()
        data = json.loads(decoded)
        for item in data["items"]:
            ParsedProduct.objects.create(
                title=item["name"],
                price=item["price"],
                link = item.get("link", ""),
                )
        return f"Сохранено {len(data)} товаров"
    except subprocess.CalledProcessError as e:
        return {"error": e.output.decode("utf-8")}
    finally:
        release_slot()
