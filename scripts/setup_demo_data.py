import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from inventory.models import Category, Item
from suppliers.models import Supplier

# Create demo users
users_data = [
    {'username': 'admin', 'password': 'admin123', 'is_staff': True, 'is_superuser': True},
    {'username': 'staff', 'password': 'staff123', 'is_staff': True},
    {'username': 'cashier', 'password': 'cashier123', 'is_staff': False},
]

for user_data in users_data:
    if not User.objects.filter(username=user_data['username']).exists():
        User.objects.create_user(**user_data)
        print(f"Created user: {user_data['username']}")

# Create categories
categories_data = [
    {'name': 'Notebooks', 'description': 'Writing notebooks and pads'},
    {'name': 'Pens & Pencils', 'description': 'Writing instruments'},
    {'name': 'Art Supplies', 'description': 'Paints, markers, and art materials'},
    {'name': 'Calculators', 'description': 'Scientific and basic calculators'},
    {'name': 'Backpacks', 'description': 'School bags and backpacks'},
]

for cat_data in categories_data:
    if not Category.objects.filter(name=cat_data['name']).exists():
        Category.objects.create(**cat_data)
        print(f"Created category: {cat_data['name']}")

# Create sample items
items_data = [
    {'name': 'Spiral Notebook A4', 'sku': 'NB-001', 'category_name': 'Notebooks', 'unit_price': 3.50, 'quantity': 100},
    {'name': 'Ballpoint Pen Blue', 'sku': 'PEN-001', 'category_name': 'Pens & Pencils', 'unit_price': 0.50, 'quantity': 500},
    {'name': 'Pencil HB', 'sku': 'PEN-002', 'category_name': 'Pens & Pencils', 'unit_price': 0.30, 'quantity': 300},
    {'name': 'Watercolor Set', 'sku': 'ART-001', 'category_name': 'Art Supplies', 'unit_price': 8.00, 'quantity': 50},
    {'name': 'Scientific Calculator', 'sku': 'CALC-001', 'category_name': 'Calculators', 'unit_price': 15.00, 'quantity': 30},
    {'name': 'School Backpack', 'sku': 'BAG-001', 'category_name': 'Backpacks', 'unit_price': 25.00, 'quantity': 20},
]

for item_data in items_data:
    if not Item.objects.filter(sku=item_data['sku']).exists():
        category = Category.objects.get(name=item_data.pop('category_name'))
        Item.objects.create(category=category, **item_data)
        print(f"Created item: {item_data['name']}")

# Create sample suppliers
suppliers_data = [
    {'name': 'ABC School Supplies', 'contact_person': 'John Smith', 'email': 'john@abcsupplies.com', 'phone': '555-0001', 'city': 'New York'},
    {'name': 'XYZ Educational Materials', 'contact_person': 'Jane Doe', 'email': 'jane@xyzedu.com', 'phone': '555-0002', 'city': 'Los Angeles'},
    {'name': 'Global Stationery Co.', 'contact_person': 'Mike Johnson', 'email': 'mike@globalstat.com', 'phone': '555-0003', 'city': 'Chicago'},
]

for sup_data in suppliers_data:
    if not Supplier.objects.filter(name=sup_data['name']).exists():
        Supplier.objects.create(**sup_data)
        print(f"Created supplier: {sup_data['name']}")

print("\nDemo data setup completed!")
