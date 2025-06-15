from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class Categoria(models.Model):
    """
    Categorias de equipamentos (ex: Som, Iluminação, Estrutura)
    """
    nome = models.CharField(max_length=100, unique=True, verbose_name="Nome da Categoria")
    descricao = models.TextField(blank=True, verbose_name="Descrição")
    ativo = models.BooleanField(default=True, verbose_name="Ativo")
    
    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ['nome']
    
    def __str__(self):
        return self.nome


class Equipamento(models.Model):
    """
    Modelo de Equipamento para locação
    """
    ESTADO_CHOICES = [
        ('disponivel', 'Disponível'),
        ('locado', 'Locado'),
        ('manutencao', 'Em Manutenção'),
        ('inativo', 'Inativo'),
    ]
    
    nome = models.CharField(max_length=200, verbose_name="Nome do Equipamento")
    categoria = models.ForeignKey(
        Categoria, 
        on_delete=models.CASCADE, 
        related_name='equipamentos',
        verbose_name="Categoria"
    )
    
    descricao = models.TextField(verbose_name="Descrição")
    marca = models.CharField(max_length=100, verbose_name="Marca")
    modelo = models.CharField(max_length=100, verbose_name="Modelo")
    
    # Especificações técnicas
    especificacoes_tecnicas = models.JSONField(
        default=dict, 
        blank=True,
        help_text="Especificações técnicas em formato JSON",
        verbose_name="Especificações Técnicas"
    )
    
    # Valores
    valor_diaria = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
        verbose_name="Valor da Diária"
    )
    
    valor_semanal = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
        null=True,
        blank=True,
        verbose_name="Valor Semanal"
    )
    
    valor_mensal = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))],
        null=True,
        blank=True,
        verbose_name="Valor Mensal"
    )
    
    # Estado e disponibilidade
    estado = models.CharField(
        max_length=20,
        choices=ESTADO_CHOICES,
        default='disponivel',
        verbose_name="Estado"
    )
    
    quantidade_disponivel = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(0)],
        verbose_name="Quantidade Disponível"
    )
    
    quantidade_total = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)],
        verbose_name="Quantidade Total"
    )
    
    # Informações adicionais
    numero_serie = models.CharField(
        max_length=100, 
        unique=True, 
        null=True, 
        blank=True,
        verbose_name="Número de Série"
    )
    
    observacoes = models.TextField(blank=True, verbose_name="Observações")
    
    # Imagens
    imagem_principal = models.URLField(
        blank=True,
        verbose_name="URL da Imagem Principal"
    )
    
    imagens_adicionais = models.JSONField(
        default=list,
        blank=True,
        help_text="URLs de imagens adicionais em formato JSON",
        verbose_name="Imagens Adicionais"
    )
    
    # Timestamps
    data_cadastro = models.DateTimeField(auto_now_add=True, verbose_name="Data de Cadastro")
    data_atualizacao = models.DateTimeField(auto_now=True, verbose_name="Última Atualização")
    
    class Meta:
        verbose_name = "Equipamento"
        verbose_name_plural = "Equipamentos"
        ordering = ['categoria__nome', 'nome']
    
    def __str__(self):
        return f"{self.nome} - {self.marca} {self.modelo}"
    
    @property
    def disponivel(self):
        """Verifica se o equipamento está disponível para locação"""
        return self.estado == 'disponivel' and self.quantidade_disponivel > 0
    
    def calcular_valor_periodo(self, dias):
        """Calcula o valor para um período específico em dias"""
        if dias >= 30 and self.valor_mensal:
            meses = dias // 30
            dias_restantes = dias % 30
            return (meses * self.valor_mensal) + (dias_restantes * self.valor_diaria)
        elif dias >= 7 and self.valor_semanal:
            semanas = dias // 7
            dias_restantes = dias % 7
            return (semanas * self.valor_semanal) + (dias_restantes * self.valor_diaria)
        else:
            return dias * self.valor_diaria

