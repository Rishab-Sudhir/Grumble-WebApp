from django import forms
from .utils import get_yelp_categories

class RestaurantSearchForm(forms.Form):
    category = forms.ChoiceField(choices=get_yelp_categories(), required=False)
    price = forms.ChoiceField(choices=[
        ('1', '$'),
        ('2', '$$'),
        ('3', '$$$'),
        ('4', '$$$$'),
    ], required=False)
    open_now = forms.BooleanField(required=False)