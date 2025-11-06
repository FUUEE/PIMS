from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Sum
from .models import Sale, SaleItem
from inventory.models import Item
from invoices.models import Invoice
import uuid

@login_required
def pos_system(request):
    items = Item.objects.filter(quantity__gt=0)
    return render(request, 'sales/pos.html', {'items': items})

@login_required
def sale_list(request):
    sales = Sale.objects.all()
    return render(request, 'sales/sale_list.html', {'sales': sales})

@login_required
def sale_detail(request, pk):
    sale = get_object_or_404(Sale, pk=pk)
    sale_items = sale.saleitem_set.all()
    return render(request, 'sales/sale_detail.html', {'sale': sale, 'sale_items': sale_items})

@login_required
def create_sale(request):
    if request.method == 'POST':
        sale_number = f"SALE-{uuid.uuid4().hex[:8].upper()}"
        tax_amount = float(request.POST.get('tax_amount', 0))
        discount_amount = float(request.POST.get('discount_amount', 0))
        
        sale = Sale.objects.create(
            sale_number=sale_number,
            cashier=request.user,
            tax_amount=tax_amount,
            discount_amount=discount_amount,
        )
        
        # Add items to sale
        items_data = request.POST.getlist('item_id')
        quantities = request.POST.getlist('quantity')
        
        for item_id, quantity in zip(items_data, quantities):
            if item_id and quantity:
                item = get_object_or_404(Item, pk=item_id)
                quantity = int(quantity)
                
                if item.quantity >= quantity:
                    SaleItem.objects.create(
                        sale=sale,
                        item=item,
                        quantity=quantity,
                        unit_price=item.unit_price,
                        subtotal=quantity * item.unit_price,
                    )
                    item.quantity -= quantity
                    item.save()
        
        sale.calculate_total()
        messages.success(request, 'Sale created successfully!')
        return redirect('sale_detail', pk=sale.pk)
    
    return redirect('pos_system')
