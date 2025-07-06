from django.db import models
from django.contrib.auth.models import User

class Donation(models.Model):
    FOOD_CATEGORIES = [
        ('raw', 'Raw'),
        ('cooked', 'Cooked'),
        ('packaged', 'Packaged'),
    ]
    QUANTITY_UNITS = [
        ('kg', 'Kilograms'),
        ('L', 'Liters'),
        ('packs', 'Packs'),
    ]
    DROP_LOCATIONS = [
        ("center1", "Center 1"),
        ("center2", "Center 2"),
        ("center3", "Center 3"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    donorName = models.CharField(max_length=100)
    donorType = models.CharField(max_length=100)
    contactNumber = models.CharField(max_length=15)
    email = models.EmailField()
    itemType = models.CharField(max_length=100)
    foodCategory = models.CharField(max_length=10, choices=FOOD_CATEGORIES)
    quantity = models.PositiveIntegerField()
    quantityUnit = models.CharField(max_length=10, choices=QUANTITY_UNITS)
    pickupRequired = models.BooleanField()
    isPerishable = models.BooleanField()
    address = models.TextField(null=True, blank=True)
    drop_location = models.CharField(
        max_length=20,
        choices=DROP_LOCATIONS,
        null=True,
        blank=True,
    )
    DonateTime = models.DateTimeField()
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('approved', 'Approved'),
            ('picked_up', 'Picked Up'),
            ('delivered', 'Delivered'),
            ('cancelled', 'Cancelled')
        ],
        default='pending'
    )

    def __str__(self):
        return self.donorName
