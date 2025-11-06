from django.urls import path
from . import views

urlpatterns = [
    path('', views.purchase_list, name='purchase_list'),
    path('<int:pk>/', views.purchase_detail, name='purchase_detail'),
    path('create/', views.purchase_create, name='purchase_create'),
    path('<int:pk>/update/', views.purchase_update, name='purchase_update'),
    path('<int:pk>/delete/', views.purchase_delete, name='purchase_delete'),
]
