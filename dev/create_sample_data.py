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
            'descricao': 'Caixa de som ativa 15 polegadas, 1000W. Ideal para eventos de médio porte, com qualidade sonora excepcional e facilidade de transporte. Possui entrada para microfone e line, controle de volume independente e equalização de graves e agudos.',
            'valor_diaria': Decimal('150.00'),
            'valor_semanal': Decimal('900.00'),
            'valor_mensal': Decimal('3200.00'),
            'estado': 'disponivel',
            'quantidade_total': 10,
            'quantidade_disponivel': 8,
            'numero_serie': 'JBL-EON615-001',
            'especificacoes_tecnicas': {
                'Potência': '1000W',
                'Woofer': '15 polegadas',
                'Tweeter': '1 polegada',
                'Resposta de Frequência': '39Hz - 20kHz',
                'SPL Máximo': '127dB',
                'Peso': '18,6kg',
                'Dimensões': '71 x 43 x 33 cm',
                'Conectividade': 'XLR, P10, RCA'
            },
            'imagem_principal': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
            'imagens_adicionais': [
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop'
            ],
            'observacoes': 'Equipamento em excelente estado. Inclui cabo de força e manual de instruções. Recomendado para eventos com até 200 pessoas.'
        },
        {
            'nome': 'Mesa de Som Yamaha MG16XU',
            'categoria': categoria1,
            'marca': 'Yamaha',
            'modelo': 'MG16XU',
            'descricao': 'Mesa de som analógica 16 canais com USB e efeitos internos. Perfeita para bandas ao vivo e eventos que necessitam de múltiplas entradas de áudio.',
            'valor_diaria': Decimal('200.00'),
            'valor_semanal': Decimal('1200.00'),
            'valor_mensal': Decimal('4500.00'),
            'estado': 'disponivel',
            'quantidade_total': 5,
            'quantidade_disponivel': 3,
            'numero_serie': 'YMH-MG16XU-002',
            'especificacoes_tecnicas': {
                'Canais': '16 mono + 4 estéreo',
                'Pré-amplificadores': 'Classe A D-PRE',
                'Efeitos': '24 tipos SPX digitais',
                'Interface USB': 'USB 2.0',
                'Phantom Power': '+48V',
                'Equalização': '3 bandas nos canais mono',
                'Dimensões': '49,8 x 51,8 x 12,4 cm',
                'Peso': '5,1kg'
            },
            'imagem_principal': 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop',
            'observacoes': 'Mesa profissional com manual em português. Inclui fonte de alimentação e cabo USB.'
        },
        {
            'nome': 'Microfone Shure SM58',
            'categoria': categoria1,
            'marca': 'Shure',
            'modelo': 'SM58',
            'descricao': 'Microfone vocal dinâmico cardioide, padrão da indústria para apresentações ao vivo.',
            'valor_diaria': Decimal('30.00'),
            'valor_semanal': Decimal('180.00'),
            'valor_mensal': Decimal('650.00'),
            'estado': 'disponivel',
            'quantidade_total': 20,
            'quantidade_disponivel': 15,
            'especificacoes_tecnicas': {
                'Tipo': 'Dinâmico',
                'Padrão Polar': 'Cardioide',
                'Resposta de Frequência': '50Hz - 15kHz',
                'Impedância': '300 ohms',
                'Sensibilidade': '-54,5 dBV/Pa',
                'Conector': 'XLR macho',
                'Peso': '298g'
            },
            'imagem_principal': 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&h=500&fit=crop'
        },
        # Equipamentos de Iluminação
        {
            'nome': 'Par LED RGB 54x3W',
            'categoria': categoria2,
            'marca': 'Lighttech',
            'modelo': 'PAR54RGB',
            'descricao': 'Refletor LED RGB com controle DMX, ideal para iluminação de palcos e ambientes.',
            'valor_diaria': Decimal('80.00'),
            'valor_semanal': Decimal('480.00'),
            'valor_mensal': Decimal('1800.00'),
            'estado': 'disponivel',
            'quantidade_total': 12,
            'quantidade_disponivel': 10,
            'especificacoes_tecnicas': {
                'LEDs': '54 x 3W RGB',
                'Potência Total': '162W',
                'Ângulo de Abertura': '25°',
                'Controle': 'DMX 512',
                'Canais DMX': '3/7 canais',
                'Temperatura de Cor': '2700K - 6500K',
                'Vida Útil LED': '50.000 horas',
                'Dimensões': '25 x 25 x 28 cm'
            },
            'imagem_principal': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop'
        },
        {
            'nome': 'Moving Head Beam 230W',
            'categoria': categoria2,
            'marca': 'Stage Light',
            'modelo': 'MH230B',
            'descricao': 'Moving head beam 230W com prisma e gobos, para efeitos de iluminação profissional.',
            'valor_diaria': Decimal('300.00'),
            'valor_semanal': Decimal('1800.00'),
            'valor_mensal': Decimal('6500.00'),
            'estado': 'disponivel',
            'quantidade_total': 4,
            'quantidade_disponivel': 2,
            'especificacoes_tecnicas': {
                'Lâmpada': '230W Osram',
                'Movimento Pan': '540°',
                'Movimento Tilt': '270°',
                'Gobos': '17 gobos fixos + open',
                'Prisma': '3 facetas',
                'Cores': '14 cores + open',
                'Canais DMX': '16 canais',
                'Peso': '18kg'
            },
            'imagem_principal': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop'
        },
        # Equipamentos de Estrutura
        {
            'nome': 'Treliça Q30 2m',
            'categoria': categoria3,
            'marca': 'Prolyte',
            'modelo': 'Q30-200',
            'descricao': 'Treliça quadrada 30cm x 2 metros em alumínio, para montagem de estruturas de palco.',
            'valor_diaria': Decimal('50.00'),
            'valor_semanal': Decimal('300.00'),
            'valor_mensal': Decimal('1000.00'),
            'estado': 'disponivel',
            'quantidade_total': 15,
            'quantidade_disponivel': 12,
            'especificacoes_tecnicas': {
                'Material': 'Alumínio 6061-T6',
                'Seção': '30 x 30 cm',
                'Comprimento': '2 metros',
                'Peso': '8,5kg',
                'Carga Máxima': '750kg (distribuída)',
                'Conexão': 'Conical coupling',
                'Acabamento': 'Anodizado'
            },
            'imagem_principal': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=500&fit=crop'
        },
        # Equipamentos de DJ
        {
            'nome': 'CDJ Pioneer CDJ-2000NXS2',
            'categoria': categoria4,
            'marca': 'Pioneer',
            'modelo': 'CDJ-2000NXS2',
            'descricao': 'CDJ profissional com tela touch de alta resolução, perfeito para DJs profissionais.',
            'valor_diaria': Decimal('400.00'),
            'valor_semanal': Decimal('2400.00'),
            'valor_mensal': Decimal('8500.00'),
            'estado': 'disponivel',
            'quantidade_total': 4,
            'quantidade_disponivel': 4,
            'especificacoes_tecnicas': {
                'Tela': '7 polegadas Full Color LCD',
                'Formatos': 'MP3, AAC, WAV, AIFF, FLAC',
                'USB': '2 portas USB',
                'Ethernet': 'Link para rekordbox',
                'Jog Wheel': '206mm com display central',
                'Hot Cues': '8 Hot Cue pads',
                'Loops': 'Auto Loop, Manual Loop',
                'Dimensões': '32 x 42,6 x 10,7 cm'
            },
            'imagem_principal': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop'
        },
        {
            'nome': 'Mixer Pioneer DJM-900NXS2',
            'categoria': categoria4,
            'marca': 'Pioneer',
            'modelo': 'DJM-900NXS2',
            'descricao': 'Mixer DJ profissional 4 canais com efeitos avançados e conectividade total.',
            'valor_diaria': Decimal('350.00'),
            'valor_semanal': Decimal('2100.00'),
            'valor_mensal': Decimal('7500.00'),
            'estado': 'disponivel',
            'quantidade_total': 2,
            'quantidade_disponivel': 1,
            'especificacoes_tecnicas': {
                'Canais': '4 canais',
                'Efeitos': '14 Beat FX + 4 Sound Color FX',
                'Sampling': '16 x 4 Beat',
                'USB': 'Gravação/reprodução USB',
                'Crossfader': 'Magvel Fader Pro',
                'Conectividade': 'rekordbox Link',
                'Saídas': 'Master, Booth, Rec',
                'Dimensões': '32 x 35,5 x 10,6 cm'
            },
            'imagem_principal': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop'
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
            # Atualizar equipamento existente com novos dados
            for key, value in eq_data.items():
                if key != 'nome':  # não atualizar o nome pois é usado para busca
                    setattr(equipamento, key, value)
            equipamento.save()
            print(f"⚠ Equipamento atualizado: {equipamento.nome}")
    
    print(f"\n🎉 Finalizado!")
    print(f"📊 Total de categorias: {Categoria.objects.count()}")
    print(f"📦 Total de equipamentos: {Equipamento.objects.count()}")

if __name__ == '__main__':
    create_sample_data()
