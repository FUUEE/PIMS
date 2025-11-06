from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Supplier
from purchases.models import Purchase

@login_required
def supplier_list(request):
    suppliers = Supplier.objects.all()
    return render(request, 'suppliers/supplier_list.html', {'suppliers': suppliers})

@login_required
def supplier_detail(request, pk):
    supplier = get_object_or_404(Supplier, pk=pk)
    purchases = Purchase.objects.filter(supplier=supplier)
    return render(request, 'suppliers/supplier_detail.html', {'supplier': supplier, 'purchases': purchases})

@login_required
def supplier_create(request):
    if request.method == 'POST':
        Supplier.objects.create(
            name=request.POST.get('name'),
            contact_person=request.POST.get('contact_person'),
            email=request.POST.get('email'),
            phone=request.POST.get('phone'),
            address=request.POST.get('address'),
            city=request.POST.get('city'),
            country=request.POST.get('country'),
            payment_terms=request.POST.get('payment_terms'),
        )
        messages.success(request, 'Supplier created successfully!')
        return redirect('supplier_list')
    
    return render(request, 'suppliers/supplier_form.html')

@login_required
def supplier_update(request, pk):
    supplier = get_object_or_404(Supplier, pk=pk)
    
    if request.method == 'POST':
        supplier.name = request.POST.get('name')
        supplier.contact_person = request.POST.get('contact_person')
        supplier.email = request.POST.get('email')
        supplier.phone = request.POST.get('phone')
        supplier.address = request.POST.get('address')
        supplier.city = request.POST.get('city')
        supplier.country = request.POST.get('country')
        supplier.payment_terms = request.POST.get('payment_terms')
        supplier.save()
        messages.success(request, 'Supplier updated successfully!')
        return redirect('supplier_detail', pk=supplier.pk)
    
    return render(request, 'suppliers/supplier_form.html', {'supplier': supplier})

@login_required
def supplier_delete(request, pk):
    supplier = get_object_or_404(Supplier, pk=pk)
    if request.method == 'POST':
        supplier.delete()
        messages.success(request, 'Supplier deleted successfully!')
        return redirect('supplier_list')
    return render(request, 'suppliers/supplier_confirm_delete.html', {'supplier': supplier})
