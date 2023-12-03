from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from RestaurantTinder import settings
from django.core.mail import EmailMessage, send_mail 
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from . tokens import generate_token

# Create your views here.

def home(request):
    return render(request, "authentication/index.html")

def signup(request):

    if request.method == "POST":
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        if User.objects.filter(username=username):
            messages.error(request, "Username already exists, please try another username!")
            return redirect('home')


        if User.objects.filter(email=email):
            messages.error(request, "Email already registered!")
            return redirect('home')


        if len(username) > 15:
            messages.error(request, "Username must be under 15 characters!")
            return redirect('home')

        if not username.isalnum():
            messages.error(request, "Username must be alphanumeric!")
            return redirect('home')

        # Checking if both passwords match
        if pass1 != pass2:

            # If passwords do not match, return to the signup page with a message
            messages.error(request, "Passwords do not match!")
            return render(request, "authentication/signup.html")

                

        # If passwords match, continue with user creation
        myuser = User.objects.create_user(username, email, pass1)
        myuser.first_name = fname
        myuser.last_name = lname
        myuser.is_active = False
        myuser.save()

        messages.success(request, "Your account has been successfully created! We have sent you a confirmation email, please confirm your email in order to activate your account.")

        #Welcome Email

        subject = "Welcome to Tinder for Restaurants!"
        message = "Hello " + myuser.first_name + "! \n Welcome to Tinder for Restaurants! \n Thank you for visting our website! \n We have also sent you a confirmation email, please confirm your email address in order to activate your account! \n Sincerely, \n The Team"
        from_email = settings.EMAIL_HOST_USER
        to_list = [myuser.email]
        send_mail(subject, message, from_email, to_list, fail_silently = True)

        #Confirmation Email

        current_site = get_current_site(request)
        email_subject = "Confirm your email @ Tinder for Restaurants"
        message2 = render_to_string('email_confirmation.html',{
            'name': myuser.first_name,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(myuser.pk)),
            'token': generate_token.make_token(myuser),
        })

        email = EmailMessage(
            email_subject,
            message2,
            settings.EMAIL_HOST_USER,
            [myuser.email],
        )
        email.fail_silently = True
        email.send()



        return redirect('signin')
    
    else:
        return render(request, "authentication/signup.html")


def signup_redirect(request):
    messages.error(request, "Something wrong here, it may be that you already have account!")
    return redirect('home')



def signin(request):

    if request.method == 'POST':
        username = request.POST['username']
        pass1 = request.POST['pass1']

        user = authenticate(username=username, password=pass1)

        if user is not None:
            login(request, user)
            fname = user.first_name
            #return redirect('get_location')  # updated redirect for location app
            return render(request, 'authentication/index.html', {'fname': fname})

        else:
            messages.error(request, "Bad Credentials!")
            return redirect('home')


    return render(request, "authentication/signin.html")


def signout(request):
    logout(request)
    messages.success(request, " Logged Out Successfully! ")
    return redirect('home')

def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        myuser = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        myuser = None
    
    if myuser is not None and generate_token.check_token(myuser, token):
        myuser.is_active = True
        myuser.save()
        login(request, myuser)
        return redirect('home')
    else:
        return render(request, 'activation_failed.html')