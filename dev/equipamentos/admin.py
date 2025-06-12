from django.contrib import admin
from .models import Categoria, Equipamento


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    """
    Admin para o modelo Categoria
    """
    list_display = ['nome', 'ativo', 'equipamentos_count']
    list_filter = ['ativo']
    search_fields = ['nome', 'descricao']
    ordering = ['nome']
    
    def equipamentos_count(self, obj):
        """Contar equipamentos na categoria"""
        return obj.equipamentos.count()
    equipamentos_count.short_description = 'Qtd Equipamentos'


@admin.register(Equipamento)
class EquipamentoAdmin(admin.ModelAdmin):
    """
    Admin para o modelo Equipamento
    """
    list_display = [
        'nome', 'categoria', 'marca', 'modelo', 'valor_diaria',
        'estado', 'quantidade_disponivel', 'quantidade_total', 'disponivel'
    ]
    list_filter = [
        'categoria', 'estado', 'marca', 'data_cadastro'
    ]
    search_fields = [
        'nome', 'descricao', 'marca', 'modelo', 'numero_serie'
    ]
    ordering = ['categoria__nome', 'nome']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': (
                'nome', 'categoria', 'descricao', 'marca', 'modelo'
            )
        }),
        ('Especificações', {
            'fields': ('especificacoes_tecnicas', 'numero_serie'),
            'classes': ('collapse',)
        }),
        ('Valores', {
            'fields': ('valor_diaria', 'valor_semanal', 'valor_mensal')
        }),
        ('Disponibilidade', {
            'fields': (
                'estado', 'quantidade_disponivel', 'quantidade_total'
            )
        }),
        ('Imagens', {
            'fields': ('imagem_principal', 'imagens_adicionais'),
            'classes': ('collapse',)
        }),
        ('Observações', {
            'fields': ('observacoes',),
            'classes': ('collapse',)
        }),
        ('Datas', {
            'fields': ('data_cadastro', 'data_atualizacao'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['data_cadastro', 'data_atualizacao']
    
    def disponivel(self, obj):
        """Mostrar se está disponível"""
        return obj.disponivel
    disponivel.boolean = True
    disponivel.short_description = 'Disponível'
    
    def get_queryset(self, request):
        """Otimizar consultas"""
        return super().get_queryset(request).select_related('categoria')
    
    # Ações personalizadas
    actions = ['marcar_como_disponivel', 'marcar_como_manutencao', 'marcar_como_inativo']
    
    def marcar_como_disponivel(self, request, queryset):
        """Marcar equipamentos como disponíveis"""
        updated = queryset.update(estado='disponivel')
        self.message_user(
            request, 
            f'{updated} equipamento(s) marcado(s) como disponível(is).'
        )
    marcar_como_disponivel.short_description = "Marcar como disponível"
    
    def marcar_como_manutencao(self, request, queryset):
        """Marcar equipamentos em manutenção"""
        updated = queryset.update(estado='manutencao')
        self.message_user(
            request, 
            f'{updated} equipamento(s) marcado(s) como em manutenção.'
        )
    marcar_como_manutencao.short_description = "Marcar como em manutenção"
    
    def marcar_como_inativo(self, request, queryset):
        """Marcar equipamentos como inativos"""
        updated = queryset.update(estado='inativo')
        self.message_user(
            request, 
            f'{updated} equipamento(s) marcado(s) como inativo(s).'
        )
    marcar_como_inativo.short_description = "Marcar como inativo"

