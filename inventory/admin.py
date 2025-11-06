from django.contrib import admin
from .models import Category, Item

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'sku', 'category', 'quantity', 'unit_price', 'is_low_stock']
    list_filter = ['category', 'created_at']
    search_fields = ['name', 'sku']
    readonly_fields = ['created_at', 'updated_at']
