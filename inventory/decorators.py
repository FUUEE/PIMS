from functools import wraps
from django.shortcuts import redirect
from django.contrib import messages

def role_required(role):
    """Decorator to check user role"""
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not request.user.is_authenticated:
                return redirect('login')
            
            if role == 'admin' and not request.user.is_superuser:
                messages.error(request, 'Admin access required!')
                return redirect('dashboard')
            elif role == 'staff' and not request.user.is_staff:
                messages.error(request, 'Staff access required!')
                return redirect('dashboard')
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator
