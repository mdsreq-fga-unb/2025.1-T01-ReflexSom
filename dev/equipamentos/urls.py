from django.urls import path
from . import views

app_name = 'equipamentos'

urlpatterns = [
    # Categorias
    path('categorias/', views.CategoriaListView.as_view(), name='categorias-list'),
    path('categorias/criar/', views.CategoriaCreateView.as_view(), name='categorias-create'),
    
    # Equipamentos - CRUD
    path('', views.EquipamentoListView.as_view(), name='equipamentos-list'),
    path('<int:pk>/', views.EquipamentoDetailView.as_view(), name='equipamentos-detail'),
    path('criar/', views.EquipamentoCreateView.as_view(), name='equipamentos-create'),
    path('<int:pk>/editar/', views.EquipamentoUpdateView.as_view(), name='equipamentos-update'),
    path('<int:pk>/deletar/', views.EquipamentoDeleteView.as_view(), name='equipamentos-delete'),
    
    # Funcionalidades especiais
    path('disponiveis/', views.equipamentos_disponiveis_view, name='equipamentos-disponiveis'),
    path('categoria/<int:categoria_id>/', views.equipamentos_por_categoria_view, name='equipamentos-por-categoria'),
    path('buscar/', views.buscar_equipamentos_view, name='equipamentos-buscar'),
    path('calcular-valor/', views.EquipamentoCalculoValorView.as_view(), name='equipamentos-calcular-valor'),
]

