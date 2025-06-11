from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from django.contrib.auth import authenticate
from .models import Cliente
from .serializers import (
    ClienteRegistroSerializer,
    ClientePerfilSerializer,
    ClienteLoginSerializer,
    ClienteAlterarSenhaSerializer
)


class ClienteRegistroView(generics.CreateAPIView):
    """
    View para registro de novos clientes
    """
    queryset = Cliente.objects.all()
    serializer_class = ClienteRegistroSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            cliente = serializer.save()
            
            # Gerar tokens JWT
            refresh = RefreshToken.for_user(cliente)
            
            return Response({
                'message': 'Cliente cadastrado com sucesso!',
                'cliente': {
                    'id': cliente.id,
                    'email': cliente.email,
                    'nome_completo': cliente.nome_completo,
                    'is_staff': cliente.is_staff,
                    'is_superuser': cliente.is_superuser,
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClienteLoginView(APIView):
    """
    View para login de clientes
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = ClienteLoginSerializer(data=request.data)
        if serializer.is_valid():
            cliente = serializer.validated_data['cliente']
            
            # Gerar tokens JWT
            refresh = RefreshToken.for_user(cliente)
            
            return Response({
                'message': 'Login realizado com sucesso!',
                'cliente': {
                    'id': cliente.id,
                    'email': cliente.email,
                    'nome_completo': cliente.nome_completo,
                    'is_staff': cliente.is_staff,
                    'is_superuser': cliente.is_superuser,
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClienteLogoutView(APIView):
    """
    View para logout de clientes
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            
            return Response({
                'message': 'Logout realizado com sucesso!'
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                'error': 'Erro ao realizar logout.'
            }, status=status.HTTP_400_BAD_REQUEST)


class ClientePerfilView(generics.RetrieveUpdateAPIView):
    """
    View para visualização e edição do perfil do cliente
    """
    serializer_class = ClientePerfilSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Perfil atualizado com sucesso!',
                'cliente': serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClienteAlterarSenhaView(APIView):
    """
    View para alteração de senha do cliente
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = ClienteAlterarSenhaSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Senha alterada com sucesso!'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def cliente_info_view(request):
    """
    View simples para obter informações básicas do cliente logado
    """
    cliente = request.user
    return Response({
        'id': cliente.id,
        'email': cliente.email,
        'nome_completo': cliente.nome_completo,
        'cpf_cnpj': cliente.cpf_cnpj,
        'telefone': cliente.telefone,
        'data_cadastro': cliente.data_cadastro,
        'is_authenticated': True,
        'is_staff': cliente.is_staff,
        'is_superuser': cliente.is_superuser
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verificar_email_view(request):
    """
    View para verificar se um email já está cadastrado
    """
    email = request.data.get('email')
    if not email:
        return Response({
            'error': 'Email é obrigatório.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    existe = Cliente.objects.filter(email=email).exists()
    return Response({
        'email': email,
        'existe': existe
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verificar_cpf_cnpj_view(request):
    """
    View para verificar se um CPF/CNPJ já está cadastrado
    """
    cpf_cnpj = request.data.get('cpf_cnpj')
    if not cpf_cnpj:
        return Response({
            'error': 'CPF/CNPJ é obrigatório.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    existe = Cliente.objects.filter(cpf_cnpj=cpf_cnpj).exists()
    return Response({
        'cpf_cnpj': cpf_cnpj,
        'existe': existe
    }, status=status.HTTP_200_OK)

