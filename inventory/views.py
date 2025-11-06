from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q, Sum, Count
from django.utils import timezone
from datetime import timedelta
from .models import Item, Category
from sales.models import Sale
from purchases.models import Purchase
from suppliers.models import Supplier
from django.db import models
from .decorators import role_required

@login_required
def dashboard(request):
    # Check user role
    if not (request.user.is_staff or request.user.is_superuser):
        return redirect('home')

    # Calculate summary statistics
    total_items = Item.objects.count()
    low_stock_items = Item.objects.filter(quantity__lte=models.F('low_stock_threshold')).count()
    total_inventory_value = sum(item.total_value for item in Item.objects.all())
    
    # Sales data
    total_sales = Sale.objects.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
    total_purchases = Purchase.objects.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
    supplier_count = Supplier.objects.count()
    
    # Recent sales
    recent_sales = Sale.objects.all()[:5]
    
    # Recent purchases
    recent_purchases = Purchase.objects.all()[:5]
    
    # Sales trend data (last 7 days)
    today = timezone.now()
    sales_trend = []
    for i in range(6, -1, -1):
        date = today - timedelta(days=i)
        daily_sales = Sale.objects.filter(
            sale_date__date=date.date()
        ).aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        sales_trend.append({
            'date': date.strftime('%a'),
            'amount': float(daily_sales)
        })

    context = {
        'total_items': total_items,
        'low_stock_items': low_stock_items,
        'total_inventory_value': total_inventory_value,
        'total_sales': total_sales,
        'total_purchases': total_purchases,
        'supplier_count': supplier_count,
        'recent_sales': recent_sales,
        'recent_purchases': recent_purchases,
        'sales_trend': sales_trend,
    }
    return render(request, 'inventory/dashboard.html', context)


@login_required
def item_list(request):
    items = Item.objects.all()
    search_query = request.GET.get('search', '')
    category_filter = request.GET.get('category', '')
    
    if search_query:
        items = items.filter(
            Q(name__icontains=search_query) |
            Q(sku__icontains=search_query) |
            Q(description__icontains=search_query)
        )
    
    if category_filter:
        items = items.filter(category_id=category_filter)
    
    categories = Category.objects.all()
    
    context = {
        'items': items,
        'categories': categories,
        'search_query': search_query,
        'category_filter': category_filter,
    }
    return render(request, 'inventory/item_list.html', context)


@login_required
def item_detail(request, pk):
    item = get_object_or_404(Item, pk=pk)
    return render(request, 'inventory/item_detail.html', {'item': item})


@login_required
@role_required('staff')
def item_create(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        category_id = request.POST.get('category')
        description = request.POST.get('description')
        unit_price = request.POST.get('unit_price')
        quantity = request.POST.get('quantity')
        low_stock_threshold = request.POST.get('low_stock_threshold')
        sku = request.POST.get('sku')
        
        category = get_object_or_404(Category, pk=category_id) if category_id else None
        
        Item.objects.create(
            name=name,
            category=category,
            description=description,
            unit_price=unit_price,
            quantity=quantity,
            low_stock_threshold=low_stock_threshold,
            sku=sku,
        )
        messages.success(request, 'Item created successfully!')
        return redirect('item_list')
    
    categories = Category.objects.all()
    return render(request, 'inventory/item_form.html', {'categories': categories})


@login_required
def item_update(request, pk):
    item = get_object_or_404(Item, pk=pk)
    
    if request.method == 'POST':
        item.name = request.POST.get('name')
        item.description = request.POST.get('description')
        item.unit_price = request.POST.get('unit_price')
        item.quantity = request.POST.get('quantity')
        item.low_stock_threshold = request.POST.get('low_stock_threshold')
        item.sku = request.POST.get('sku')
        category_id = request.POST.get('category')
        item.category = get_object_or_404(Category, pk=category_id) if category_id else None
        item.save()
        messages.success(request, 'Item updated successfully!')
        return redirect('item_detail', pk=item.pk)
    
    categories = Category.objects.all()
    return render(request, 'inventory/item_form.html', {'item': item, 'categories': categories})


@login_required
def item_delete(request, pk):
    item = get_object_or_404(Item, pk=pk)
    if request.method == 'POST':
        item.delete()
        messages.success(request, 'Item deleted successfully!')
        return redirect('item_list')
    return render(request, 'inventory/item_confirm_delete.html', {'item': item})
