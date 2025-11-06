from django.contrib import admin
from .models import Sale, SaleItem

class SaleItemInline(admin.TabularInline):
    model = SaleItem
    extra = 1

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ['sale_number', 'cashier', 'sale_date', 'total_amount']
    list_filter = ['sale_date', 'cashier']
    inlines = [SaleItemInline]
    readonly_fields = ['sale_date']

@admin.register(SaleItem)
class SaleItemAdmin(admin.ModelAdmin):
    list_display = ['sale', 'item', 'quantity', 'unit_price', 'subtotal']
