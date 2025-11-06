from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Invoice
from sales.models import Sale
import uuid

@login_required
def invoice_list(request):
    invoices = Invoice.objects.all()
    return render(request, 'invoices/invoice_list.html', {'invoices': invoices})

@login_required
def invoice_detail(request, pk):
    invoice = get_object_or_404(Invoice, pk=pk)
    return render(request, 'invoices/invoice_detail.html', {'invoice': invoice})

@login_required
def invoice_create(request):
    if request.method == 'POST':
        sale_id = request.POST.get('sale')
        sale = get_object_or_404(Sale, pk=sale_id) if sale_id else None
        
        invoice_number = f"INV-{uuid.uuid4().hex[:8].upper()}"
        subtotal = float(request.POST.get('subtotal', 0))
        tax_amount = float(request.POST.get('tax_amount', 0))
        discount_amount = float(request.POST.get('discount_amount', 0))
        
        invoice = Invoice.objects.create(
            invoice_number=invoice_number,
            sale=sale,
            subtotal=subtotal,
            tax_amount=tax_amount,
            discount_amount=discount_amount,
            created_by=request.user,
        )
        invoice.calculate_total()
        messages.success(request, 'Invoice created successfully!')
        return redirect('invoice_detail', pk=invoice.pk)
    
    sales = Sale.objects.all()
    return render(request, 'invoices/invoice_form.html', {'sales': sales})

@login_required
def invoice_update(request, pk):
    invoice = get_object_or_404(Invoice, pk=pk)
    
    if request.method == 'POST':
        invoice.status = request.POST.get('status')
        invoice.tax_amount = float(request.POST.get('tax_amount', 0))
        invoice.discount_amount = float(request.POST.get('discount_amount', 0))
        invoice.notes = request.POST.get('notes', '')
        invoice.save()
        invoice.calculate_total()
        messages.success(request, 'Invoice updated successfully!')
        return redirect('invoice_detail', pk=invoice.pk)
    
    return render(request, 'invoices/invoice_form.html', {'invoice': invoice})

@login_required
def invoice_delete(request, pk):
    invoice = get_object_or_404(Invoice, pk=pk)
    if request.method == 'POST':
        invoice.delete()
        messages.success(request, 'Invoice deleted successfully!')
        return redirect('invoice_list')
    return render(request, 'invoices/invoice_confirm_delete.html', {'invoice': invoice})

@login_required
def invoice_print(request, pk):
    invoice = get_object_or_404(Invoice, pk=pk)
    return render(request, 'invoices/invoice_print.html', {'invoice': invoice})
