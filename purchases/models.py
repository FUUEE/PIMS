from django.db import models
from django.contrib.auth.models import User
from suppliers.models import Supplier
from inventory.models import Item
from django.core.validators import MinValueValidator

class Purchase(models.Model):
    purchase_number = models.CharField(max_length=50, unique=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    staff = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    purchase_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-purchase_date']

    def __str__(self):
        return f"Purchase {self.purchase_number}"

    def calculate_total(self):
        items_total = sum(item.get_subtotal() for item in self.purchaseitem_set.all())
        self.total_amount = items_total + self.tax_amount
        self.save()


class PurchaseItem(models.Model):
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    unit_cost = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.item.name} - {self.quantity} units"

    def get_subtotal(self):
        return self.quantity * self.unit_cost
