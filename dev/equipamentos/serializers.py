from rest_framework import serializers
from .models import Categoria, Equipamento


class CategoriaSerializer(serializers.ModelSerializer):
    """
    Serializer para Categoria de equipamentos
    """
    class Meta:
        model = Categoria
        fields = ['id', 'nome', 'descricao', 'ativo']
        read_only_fields = ['id']


class EquipamentoListSerializer(serializers.ModelSerializer):
    """
    Serializer para listagem de equipamentos (campos resumidos)
    """
    categoria_nome = serializers.CharField(source='categoria.nome', read_only=True)
    disponivel = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Equipamento
        fields = [
            'id', 'nome', 'categoria', 'categoria_nome', 'marca', 'modelo',
            'valor_diaria', 'estado', 'quantidade_disponivel', 'disponivel',
            'imagem_principal'
        ]
        read_only_fields = ['id', 'disponivel']


class EquipamentoDetailSerializer(serializers.ModelSerializer):
    """
    Serializer para detalhes completos do equipamento
    """
    categoria_nome = serializers.CharField(source='categoria.nome', read_only=True)
    disponivel = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Equipamento
        fields = [
            'id', 'nome', 'categoria', 'categoria_nome', 'descricao',
            'marca', 'modelo', 'especificacoes_tecnicas', 'valor_diaria',
            'valor_semanal', 'valor_mensal', 'estado', 'quantidade_disponivel',
            'quantidade_total', 'numero_serie', 'observacoes',
            'imagem_principal', 'imagens_adicionais', 'disponivel',
            'data_cadastro', 'data_atualizacao'
        ]
        read_only_fields = ['id', 'disponivel', 'data_cadastro', 'data_atualizacao']


class EquipamentoCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer para criação e atualização de equipamentos
    """
    class Meta:
        model = Equipamento
        fields = [
            'nome', 'categoria', 'descricao', 'marca', 'modelo',
            'especificacoes_tecnicas', 'valor_diaria', 'valor_semanal',
            'valor_mensal', 'estado', 'quantidade_disponivel',
            'quantidade_total', 'numero_serie', 'observacoes',
            'imagem_principal', 'imagens_adicionais'
        ]
    
    def validate(self, attrs):
        """Validações customizadas"""
        # Validar que quantidade_disponivel não seja maior que quantidade_total
        quantidade_disponivel = attrs.get('quantidade_disponivel', 0)
        quantidade_total = attrs.get('quantidade_total', 1)
        
        if quantidade_disponivel > quantidade_total:
            raise serializers.ValidationError(
                "Quantidade disponível não pode ser maior que a quantidade total."
            )
        
        # Validar valores
        valor_diaria = attrs.get('valor_diaria')
        valor_semanal = attrs.get('valor_semanal')
        valor_mensal = attrs.get('valor_mensal')
        
        if valor_semanal and valor_semanal <= valor_diaria * 7:
            raise serializers.ValidationError(
                "Valor semanal deve ser menor que 7 vezes o valor da diária para ser vantajoso."
            )
        
        if valor_mensal and valor_mensal <= valor_diaria * 30:
            raise serializers.ValidationError(
                "Valor mensal deve ser menor que 30 vezes o valor da diária para ser vantajoso."
            )
        
        return attrs
    
    def validate_numero_serie(self, value):
        """Validar número de série único"""
        if value:
            queryset = Equipamento.objects.filter(numero_serie=value)
            if self.instance:
                queryset = queryset.exclude(id=self.instance.id)
            if queryset.exists():
                raise serializers.ValidationError("Este número de série já está cadastrado.")
        return value


class EquipamentoCalculoValorSerializer(serializers.Serializer):
    """
    Serializer para cálculo de valor por período
    """
    equipamento_id = serializers.IntegerField(required=True)
    dias = serializers.IntegerField(required=True, min_value=1)
    
    def validate_equipamento_id(self, value):
        """Validar se equipamento existe"""
        try:
            equipamento = Equipamento.objects.get(id=value)
            return value
        except Equipamento.DoesNotExist:
            raise serializers.ValidationError("Equipamento não encontrado.")
    
    def get_valor_calculado(self):
        """Calcular valor para o período especificado"""
        equipamento_id = self.validated_data['equipamento_id']
        dias = self.validated_data['dias']
        
        equipamento = Equipamento.objects.get(id=equipamento_id)
        valor_total = equipamento.calcular_valor_periodo(dias)
        
        return {
            'equipamento_id': equipamento_id,
            'equipamento_nome': equipamento.nome,
            'dias': dias,
            'valor_diaria': equipamento.valor_diaria,
            'valor_semanal': equipamento.valor_semanal,
            'valor_mensal': equipamento.valor_mensal,
            'valor_total_calculado': valor_total
        }

