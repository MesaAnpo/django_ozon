from django.shortcuts import render

def index_point(request):
    return render(request, "build/index.html")
