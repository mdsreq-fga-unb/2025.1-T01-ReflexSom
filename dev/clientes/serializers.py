from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import Cliente


class ClienteRegistroSerializer(serializers.ModelSerializer):
    """
    Serializer para registro de novos clientes
    """
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = Cliente
        fields = [
            'email', 'password', 'password_confirm', 'nome_completo',
            'cpf_cnpj', 'telefone', 'endereco', 'cidade', 'estado', 
            'cep', 'data_nascimento'
        ]
        extra_kwargs = {
            'email': {'required': True},
            'nome_completo': {'required': True},
            'cpf_cnpj': {'required': True},
            'telefone': {'required': True},
            'endereco': {'required': True},
            'cidade': {'required': True},
            'estado': {'required': True},
            'cep': {'required': True},
        }
    
    def validate(self, attrs):
        """Validação customizada"""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("As senhas não coincidem.")
        
        # Verificar se email já existe
        if Cliente.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError("Este email já está cadastrado.")
        
        # Verificar se CPF/CNPJ já existe
        if Cliente.objects.filter(cpf_cnpj=attrs['cpf_cnpj']).exists():
            raise serializers.ValidationError("Este CPF/CNPJ já está cadastrado.")
        
        return attrs
    
    def create(self, validated_data):
        """Criar novo cliente"""
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        
        cliente = Cliente.objects.create_user(
            username=validated_data['email'],
            **validated_data
        )
        cliente.set_password(password)
        cliente.save()
        
        return cliente


class ClientePerfilSerializer(serializers.ModelSerializer):
    """
    Serializer para visualização e edição do perfil do cliente
    """
    class Meta:
        model = Cliente
        fields = [
            'id', 'email', 'nome_completo', 'cpf_cnpj', 'telefone',
            'endereco', 'cidade', 'estado', 'cep', 'data_nascimento',
            'data_cadastro', 'data_atualizacao'
        ]
        read_only_fields = ['id', 'email', 'cpf_cnpj', 'data_cadastro', 'data_atualizacao']
    
    def validate_email(self, value):
        """Validar email único (exceto para o próprio usuário)"""
        if Cliente.objects.filter(email=value).exclude(id=self.instance.id if self.instance else None).exists():
            raise serializers.ValidationError("Este email já está cadastrado.")
        return value


class ClienteLoginSerializer(serializers.Serializer):
    """
    Serializer para login de clientes
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    
    def validate(self, attrs):
        """Validação de login"""
        email = attrs.get('email')
        password = attrs.get('password')
        
        if not email or not password:
            raise serializers.ValidationError("Email e senha são obrigatórios.")
        
        try:
            cliente = Cliente.objects.get(email=email)
            if not cliente.check_password(password):
                raise serializers.ValidationError("Credenciais inválidas.")
            if not cliente.is_active:
                raise serializers.ValidationError("Conta desativada.")
        except Cliente.DoesNotExist:
            raise serializers.ValidationError("Credenciais inválidas.")
        
        attrs['cliente'] = cliente
        return attrs


class ClienteAlterarSenhaSerializer(serializers.Serializer):
    """
    Serializer para alteração de senha
    """
    senha_atual = serializers.CharField(required=True, write_only=True)
    nova_senha = serializers.CharField(required=True, write_only=True, validators=[validate_password])
    confirmar_nova_senha = serializers.CharField(required=True, write_only=True)
    
    def validate(self, attrs):
        """Validação de alteração de senha"""
        if attrs['nova_senha'] != attrs['confirmar_nova_senha']:
            raise serializers.ValidationError("As novas senhas não coincidem.")
        
        # Verificar senha atual
        cliente = self.context['request'].user
        if not cliente.check_password(attrs['senha_atual']):
            raise serializers.ValidationError("Senha atual incorreta.")
        
        return attrs
    
    def save(self):
        """Salvar nova senha"""
        cliente = self.context['request'].user
        cliente.set_password(self.validated_data['nova_senha'])
        cliente.save()
        return cliente

