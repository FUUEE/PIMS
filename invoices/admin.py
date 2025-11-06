from django.contrib import admin
from .models import Invoice

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_number', 'sale', 'invoice_date', 'status', 'total_amount']
    list_filter = ['status', 'invoice_date', 'created_by']
    search_fields = ['invoice_number']
    readonly_fields = ['invoice_date', 'invoice_number']
