from django.urls import path
from . import views

app_name = 'clientes'

urlpatterns = [
    # Autenticação
    path('registro/', views.ClienteRegistroView.as_view(), name='registro'),
    path('login/', views.ClienteLoginView.as_view(), name='login'),
    path('logout/', views.ClienteLogoutView.as_view(), name='logout'),
    
    # Perfil
    path('perfil/', views.ClientePerfilView.as_view(), name='perfil'),
    path('alterar-senha/', views.ClienteAlterarSenhaView.as_view(), name='alterar-senha'),
    path('info/', views.cliente_info_view, name='info'),
    
    # Validações
    path('verificar-email/', views.verificar_email_view, name='verificar-email'),
    path('verificar-cpf-cnpj/', views.verificar_cpf_cnpj_view, name='verificar-cpf-cnpj'),
]

