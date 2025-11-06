from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Purchase, PurchaseItem
from suppliers.models import Supplier
from inventory.models import Item
import uuid

@login_required
def purchase_list(request):
    purchases = Purchase.objects.all()
    return render(request, 'purchases/purchase_list.html', {'purchases': purchases})

@login_required
def purchase_detail(request, pk):
    purchase = get_object_or_404(Purchase, pk=pk)
    purchase_items = purchase.purchaseitem_set.all()
    return render(request, 'purchases/purchase_detail.html', {'purchase': purchase, 'purchase_items': purchase_items})

@login_required
def purchase_create(request):
    if request.method == 'POST':
        supplier_id = request.POST.get('supplier')
        tax_amount = float(request.POST.get('tax_amount', 0))
        
        supplier = get_object_or_404(Supplier, pk=supplier_id)
        purchase_number = f"PUR-{uuid.uuid4().hex[:8].upper()}"
        
        purchase = Purchase.objects.create(
            purchase_number=purchase_number,
            supplier=supplier,
            staff=request.user,
            tax_amount=tax_amount,
        )
        
        # Add items to purchase
        items_data = request.POST.getlist('item_id')
        quantities = request.POST.getlist('quantity')
        costs = request.POST.getlist('unit_cost')
        
        for item_id, quantity, cost in zip(items_data, quantities, costs):
            if item_id and quantity and cost:
                item = get_object_or_404(Item, pk=item_id)
                quantity = int(quantity)
                cost = float(cost)
                
                PurchaseItem.objects.create(
                    purchase=purchase,
                    item=item,
                    quantity=quantity,
                    unit_cost=cost,
                    subtotal=quantity * cost,
                )
                item.quantity += quantity
                item.save()
        
        purchase.calculate_total()
        messages.success(request, 'Purchase created successfully!')
        return redirect('purchase_detail', pk=purchase.pk)
    
    suppliers = Supplier.objects.all()
    items = Item.objects.all()
    return render(request, 'purchases/purchase_form.html', {'suppliers': suppliers, 'items': items})

@login_required
def purchase_update(request, pk):
    purchase = get_object_or_404(Purchase, pk=pk)
    
    if request.method == 'POST':
        purchase.tax_amount = float(request.POST.get('tax_amount', 0))
        purchase.notes = request.POST.get('notes', '')
        purchase.save()
        messages.success(request, 'Purchase updated successfully!')
        return redirect('purchase_detail', pk=purchase.pk)
    
    suppliers = Supplier.objects.all()
    return render(request, 'purchases/purchase_form.html', {'purchase': purchase, 'suppliers': suppliers})

@login_required
def purchase_delete(request, pk):
    purchase = get_object_or_404(Purchase, pk=pk)
    if request.method == 'POST':
        purchase.delete()
        messages.success(request, 'Purchase deleted successfully!')
        return redirect('purchase_list')
    return render(request, 'purchases/purchase_confirm_delete.html', {'purchase': purchase})
