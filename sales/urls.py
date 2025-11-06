from django.urls import path
from . import views

urlpatterns = [
    path('pos/', views.pos_system, name='pos_system'),
    path('', views.sale_list, name='sale_list'),
    path('<int:pk>/', views.sale_detail, name='sale_detail'),
    path('create/', views.create_sale, name='create_sale'),
]
