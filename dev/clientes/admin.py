from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Cliente


@admin.register(Cliente)
class ClienteAdmin(UserAdmin):
    """
    Admin para o modelo Cliente
    """
    list_display = [
        'email', 'nome_completo', 'cpf_cnpj', 'telefone', 
        'cidade', 'estado', 'ativo', 'data_cadastro'
    ]
    list_filter = ['ativo', 'estado', 'data_cadastro', 'is_staff', 'is_superuser']
    search_fields = ['email', 'nome_completo', 'cpf_cnpj', 'telefone']
    ordering = ['-data_cadastro']
    
    # Campos para visualização/edição
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Informações Pessoais', {
            'fields': (
                'nome_completo', 'cpf_cnpj', 'telefone', 'data_nascimento'
            )
        }),
        ('Endereço', {
            'fields': ('endereco', 'cidade', 'estado', 'cep')
        }),
        ('Permissões', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser', 
                'groups', 'user_permissions'
            ),
            'classes': ('collapse',)
        }),
        ('Datas Importantes', {
            'fields': ('last_login', 'date_joined', 'data_cadastro', 'data_atualizacao'),
            'classes': ('collapse',)
        }),
    )
    
    # Campos para criação de novo cliente
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'password1', 'password2', 'nome_completo',
                'cpf_cnpj', 'telefone', 'endereco', 'cidade', 'estado', 'cep'
            ),
        }),
    )
    
    readonly_fields = ['data_cadastro', 'data_atualizacao', 'date_joined', 'last_login']
    
    def get_readonly_fields(self, request, obj=None):
        """Tornar alguns campos readonly após criação"""
        readonly = list(self.readonly_fields)
        if obj:  # Editando objeto existente
            readonly.extend(['email', 'cpf_cnpj'])
        return readonly

