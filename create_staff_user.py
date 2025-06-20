#!/usr/bin/env python
import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from clientes.models import Cliente

def create_staff_user():
    print("Criando usuário staff...")
    
    # Criar usuário staff
    staff_user, created = Cliente.objects.get_or_create(
        email='admin@reflexsom.com',
        defaults={
            'username': 'admin@reflexsom.com',
            'nome_completo': 'Administrador',
            'cpf_cnpj': '123.456.789-00',
            'telefone': '(11) 99999-9999',
            'endereco': 'Rua Admin, 123',
            'cidade': 'São Paulo',
            'estado': 'SP',
            'cep': '01234-567',
            'is_staff': True,
            'is_superuser': True,
            'is_active': True,
        }
    )
    
    if created:
        staff_user.set_password('admin123')
        staff_user.save()
        print(f"✓ Usuário staff criado: {staff_user.email}")
        print(f"  Senha: admin123")
    else:
        print(f"⚠ Usuário staff já existe: {staff_user.email}")
    
    # Criar usuário staff adicional
    staff_user2, created = Cliente.objects.get_or_create(
        email='staff@reflexsom.com',
        defaults={
            'username': 'staff@reflexsom.com',
            'nome_completo': 'Staff User',
            'cpf_cnpj': '987.654.321-00',
            'telefone': '(11) 88888-8888',
            'endereco': 'Rua Staff, 456',
            'cidade': 'São Paulo',
            'estado': 'SP',
            'cep': '04567-890',
            'is_staff': True,
            'is_superuser': False,
            'is_active': True,
        }
    )
    
    if created:
        staff_user2.set_password('staff123')
        staff_user2.save()
        print(f"✓ Usuário staff criado: {staff_user2.email}")
        print(f"  Senha: staff123")
    else:
        print(f"⚠ Usuário staff já existe: {staff_user2.email}")
    
    print(f"\n🎉 Finalizado!")
    print(f"👥 Total de usuários staff: {Cliente.objects.filter(is_staff=True).count()}")

if __name__ == '__main__':
    create_staff_user() 