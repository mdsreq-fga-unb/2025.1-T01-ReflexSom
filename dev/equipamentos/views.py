from rest_framework import generics, permissions, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Categoria, Equipamento
from .serializers import (
    CategoriaSerializer,
    EquipamentoListSerializer,
    EquipamentoDetailSerializer,
    EquipamentoCreateUpdateSerializer,
    EquipamentoCalculoValorSerializer
)
from .permissions import IsStaffUser


class CategoriaListView(generics.ListAPIView):
    """
    View para listar categorias ativas
    """
    queryset = Categoria.objects.filter(ativo=True)
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]


class CategoriaCreateView(generics.CreateAPIView):
    """
    View para criar nova categoria (apenas staff)
    """
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsStaffUser]


class EquipamentoListView(generics.ListAPIView):
    """
    View para listar equipamentos com filtros
    """
    queryset = Equipamento.objects.all()
    serializer_class = EquipamentoListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categoria', 'estado', 'marca']
    search_fields = ['nome', 'descricao', 'marca', 'modelo']
    ordering_fields = ['nome', 'valor_diaria', 'data_cadastro']
    ordering = ['categoria__nome', 'nome']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtro por disponibilidade
        disponivel = self.request.query_params.get('disponivel')
        if disponivel is not None:
            if disponivel.lower() == 'true':
                queryset = queryset.filter(
                    estado='disponivel',
                    quantidade_disponivel__gt=0
                )
            elif disponivel.lower() == 'false':
                queryset = queryset.exclude(
                    estado='disponivel',
                    quantidade_disponivel__gt=0
                )
        
        # Filtro por faixa de preço
        preco_min = self.request.query_params.get('preco_min')
        preco_max = self.request.query_params.get('preco_max')
        
        if preco_min:
            queryset = queryset.filter(valor_diaria__gte=preco_min)
        if preco_max:
            queryset = queryset.filter(valor_diaria__lte=preco_max)
        
        return queryset


class EquipamentoDetailView(generics.RetrieveAPIView):
    """
    View para detalhes de um equipamento específico
    """
    queryset = Equipamento.objects.all()
    serializer_class = EquipamentoDetailSerializer
    permission_classes = [permissions.AllowAny]


class EquipamentoCreateView(generics.CreateAPIView):
    """
    View para criar novo equipamento (apenas staff)
    """
    queryset = Equipamento.objects.all()
    serializer_class = EquipamentoCreateUpdateSerializer
    permission_classes = [IsStaffUser]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            equipamento = serializer.save()
            
            # Retornar dados completos do equipamento criado
            detail_serializer = EquipamentoDetailSerializer(equipamento)
            
            return Response({
                'message': 'Equipamento cadastrado com sucesso!',
                'equipamento': detail_serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EquipamentoUpdateView(generics.UpdateAPIView):
    """
    View para atualizar equipamento (apenas staff)
    """
    queryset = Equipamento.objects.all()
    serializer_class = EquipamentoCreateUpdateSerializer
    permission_classes = [IsStaffUser]
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        if serializer.is_valid():
            equipamento = serializer.save()
            
            # Retornar dados completos do equipamento atualizado
            detail_serializer = EquipamentoDetailSerializer(equipamento)
            
            return Response({
                'message': 'Equipamento atualizado com sucesso!',
                'equipamento': detail_serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EquipamentoDeleteView(generics.DestroyAPIView):
    """
    View para deletar equipamento (apenas staff)
    """
    queryset = Equipamento.objects.all()
    permission_classes = [IsStaffUser]
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({
            'message': 'Equipamento removido com sucesso!'
        }, status=status.HTTP_200_OK)


class EquipamentoCalculoValorView(APIView):
    """
    View para calcular valor de locação por período
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = EquipamentoCalculoValorSerializer(data=request.data)
        if serializer.is_valid():
            resultado = serializer.get_valor_calculado()
            return Response(resultado, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def equipamentos_disponiveis_view(request):
    """
    View para listar apenas equipamentos disponíveis
    """
    equipamentos = Equipamento.objects.filter(
        estado='disponivel',
        quantidade_disponivel__gt=0
    )
    
    serializer = EquipamentoListSerializer(equipamentos, many=True)
    return Response({
        'count': equipamentos.count(),
        'equipamentos': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def equipamentos_por_categoria_view(request, categoria_id):
    """
    View para listar equipamentos de uma categoria específica
    """
    try:
        categoria = Categoria.objects.get(id=categoria_id, ativo=True)
    except Categoria.DoesNotExist:
        return Response({
            'error': 'Categoria não encontrada.'
        }, status=status.HTTP_404_NOT_FOUND)
    
    equipamentos = Equipamento.objects.filter(categoria=categoria)
    
    # Aplicar filtro de disponibilidade se solicitado
    disponivel = request.query_params.get('disponivel')
    if disponivel and disponivel.lower() == 'true':
        equipamentos = equipamentos.filter(
            estado='disponivel',
            quantidade_disponivel__gt=0
        )
    
    serializer = EquipamentoListSerializer(equipamentos, many=True)
    return Response({
        'categoria': CategoriaSerializer(categoria).data,
        'count': equipamentos.count(),
        'equipamentos': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def buscar_equipamentos_view(request):
    """
    View para busca avançada de equipamentos
    """
    query = request.query_params.get('q', '')
    categoria_id = request.query_params.get('categoria')
    disponivel = request.query_params.get('disponivel')
    
    equipamentos = Equipamento.objects.all()
    
    # Filtro por texto
    if query:
        equipamentos = equipamentos.filter(
            Q(nome__icontains=query) |
            Q(descricao__icontains=query) |
            Q(marca__icontains=query) |
            Q(modelo__icontains=query)
        )
    
    # Filtro por categoria
    if categoria_id:
        equipamentos = equipamentos.filter(categoria_id=categoria_id)
    
    # Filtro por disponibilidade
    if disponivel and disponivel.lower() == 'true':
        equipamentos = equipamentos.filter(
            estado='disponivel',
            quantidade_disponivel__gt=0
        )
    
    serializer = EquipamentoListSerializer(equipamentos, many=True)
    return Response({
        'query': query,
        'count': equipamentos.count(),
        'equipamentos': serializer.data
    }, status=status.HTTP_200_OK)

