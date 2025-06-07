from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator


class Cliente(AbstractUser):
    """
    Modelo customizado de Cliente que estende o User padrão do Django
    """
    # Campos adicionais específicos do cliente
    nome_completo = models.CharField(max_length=200, verbose_name="Nome Completo")
    
    # CPF ou CNPJ
    cpf_cnpj = models.CharField(
        max_length=18,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$',
                message='CPF deve estar no formato XXX.XXX.XXX-XX ou CNPJ no formato XX.XXX.XXX/XXXX-XX'
            )
        ],
        verbose_name="CPF/CNPJ"
    )
    
    telefone = models.CharField(
        max_length=20,
        validators=[
            RegexValidator(
                regex=r'^\(\d{2}\)\s\d{4,5}-\d{4}$',
                message='Telefone deve estar no formato (XX) XXXXX-XXXX'
            )
        ],
        verbose_name="Telefone"
    )
    
    endereco = models.CharField(max_length=300, verbose_name="Endereço")
    cidade = models.CharField(max_length=100, verbose_name="Cidade")
    estado = models.CharField(max_length=2, verbose_name="Estado")
    cep = models.CharField(
        max_length=9,
        validators=[
            RegexValidator(
                regex=r'^\d{5}-\d{3}$',
                message='CEP deve estar no formato XXXXX-XXX'
            )
        ],
        verbose_name="CEP"
    )
    
    data_nascimento = models.DateField(null=True, blank=True, verbose_name="Data de Nascimento")
    
    # Timestamps
    data_cadastro = models.DateTimeField(auto_now_add=True, verbose_name="Data de Cadastro")
    data_atualizacao = models.DateTimeField(auto_now=True, verbose_name="Última Atualização")
    
    # Status do cliente
    ativo = models.BooleanField(default=True, verbose_name="Ativo")
    
    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        ordering = ['-data_cadastro']
    
    def __str__(self):
        return f"{self.nome_completo} ({self.email})"
    
    def save(self, *args, **kwargs):
        # Garantir que o username seja o email
        if not self.username:
            self.username = self.email
        super().save(*args, **kwargs)

