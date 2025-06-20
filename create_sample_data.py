#!/usr/bin/env python
import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from equipamentos.models import Categoria, Equipamento
from decimal import Decimal

def create_sample_data():
    print("Criando categorias...")
    
    # Criar categorias
    categoria1, created = Categoria.objects.get_or_create(
        nome='Som e Áudio',
        defaults={
            'descricao': 'Equipamentos de som e áudio profissional',
            'ativo': True
        }
    )
    if created:
        print(f"✓ Categoria criada: {categoria1.nome}")
    
    categoria2, created = Categoria.objects.get_or_create(
        nome='Iluminação',
        defaults={
            'descricao': 'Equipamentos de iluminação para eventos',
            'ativo': True
        }
    )
    if created:
        print(f"✓ Categoria criada: {categoria2.nome}")
    
    categoria3, created = Categoria.objects.get_or_create(
        nome='Estrutura',
        defaults={
            'descricao': 'Estruturas e suportes para eventos',
            'ativo': True
        }
    )
    if created:
        print(f"✓ Categoria criada: {categoria3.nome}")
    
    categoria4, created = Categoria.objects.get_or_create(
        nome='DJ e Música',
        defaults={
            'descricao': 'Equipamentos para DJs e música ao vivo',
            'ativo': True
        }
    )
    if created:
        print(f"✓ Categoria criada: {categoria4.nome}")
    
    print("\nCriando equipamentos...")
    
    # Equipamentos de Som e Áudio
    equipamentos = [
        {
            'nome': 'Caixa de Som JBL EON615',
            'categoria': categoria1,
            'marca': 'JBL',
            'modelo': 'EON615',
            'descricao': 'Caixa de som ativa 15 polegadas, 1000W',
            'valor_diaria': Decimal('150.00'),
            'estado': 'disponivel',
            'quantidade_total': 10,
            'quantidade_disponivel': 8,
        },
        {
            'nome': 'Mesa de Som Yamaha MG16XU',
            'categoria': categoria1,
            'marca': 'Yamaha',
            'modelo': 'MG16XU',
            'descricao': 'Mesa de som analógica 16 canais com USB',
            'valor_diaria': Decimal('200.00'),
            'estado': 'disponivel',
            'quantidade_total': 5,
            'quantidade_disponivel': 3,
        },
        {
            'nome': 'Microfone Shure SM58',
            'categoria': categoria1,
            'marca': 'Shure',
            'modelo': 'SM58',
            'descricao': 'Microfone vocal dinâmico cardioide',
            'valor_diaria': Decimal('30.00'),
            'estado': 'disponivel',
            'quantidade_total': 20,
            'quantidade_disponivel': 15,
        },
        # Equipamentos de Iluminação
        {
            'nome': 'Par LED RGB 54x3W',
            'categoria': categoria2,
            'marca': 'Lighttech',
            'modelo': 'PAR54RGB',
            'descricao': 'Refletor LED RGB com controle DMX',
            'valor_diaria': Decimal('80.00'),
            'estado': 'disponivel',
            'quantidade_total': 12,
            'quantidade_disponivel': 10,
        },
        {
            'nome': 'Moving Head Beam 230W',
            'categoria': categoria2,
            'marca': 'Stage Light',
            'modelo': 'MH230B',
            'descricao': 'Moving head beam 230W com prisma',
            'valor_diaria': Decimal('300.00'),
            'estado': 'disponivel',
            'quantidade_total': 4,
            'quantidade_disponivel': 2,
        },
        # Equipamentos de Estrutura
        {
            'nome': 'Treliça Q30 2m',
            'categoria': categoria3,
            'marca': 'Prolyte',
            'modelo': 'Q30-200',
            'descricao': 'Treliça quadrada 30cm x 2 metros',
            'valor_diaria': Decimal('50.00'),
            'estado': 'disponivel',
            'quantidade_total': 15,
            'quantidade_disponivel': 12,
        },
        # Equipamentos de DJ
        {
            'nome': 'CDJ Pioneer CDJ-2000NXS2',
            'categoria': categoria4,
            'marca': 'Pioneer',
            'modelo': 'CDJ-2000NXS2',
            'descricao': 'CDJ profissional com tela touch',
            'valor_diaria': Decimal('400.00'),
            'estado': 'disponivel',
            'quantidade_total': 4,
            'quantidade_disponivel': 4,
        },
        {
            'nome': 'Mixer Pioneer DJM-900NXS2',
            'categoria': categoria4,
            'marca': 'Pioneer',
            'modelo': 'DJM-900NXS2',
            'descricao': 'Mixer DJ profissional 4 canais',
            'valor_diaria': Decimal('350.00'),
            'estado': 'disponivel',
            'quantidade_total': 2,
            'quantidade_disponivel': 1,
        },
    ]
    
    for eq_data in equipamentos:
        equipamento, created = Equipamento.objects.get_or_create(
            nome=eq_data['nome'],
            defaults=eq_data
        )
        if created:
            print(f"✓ Equipamento criado: {equipamento.nome}")
        else:
            print(f"⚠ Equipamento já existe: {equipamento.nome}")
    
    print(f"\n🎉 Finalizado!")
    print(f"📊 Total de categorias: {Categoria.objects.count()}")
    print(f"📦 Total de equipamentos: {Equipamento.objects.count()}")

if __name__ == '__main__':
    create_sample_data()
