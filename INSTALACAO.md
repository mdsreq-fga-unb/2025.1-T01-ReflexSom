# Guia de Instalação - Reflex Som MVP

## Pré-requisitos do Sistema

### Software Necessário
- **Python 3.11 ou superior**
- **Node.js 20.18.0 ou superior**
- **pnpm** (gerenciador de pacotes)
- **Git** (para controle de versão)

### Verificação dos Pré-requisitos

```bash
# Verificar versão do Python
python3 --version

# Verificar versão do Node.js
node --version

# Verificar versão do pnpm
pnpm --version

# Verificar versão do Git
git --version
```

## Instalação Passo a Passo

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd reflex-som-mvp
```

### 2. Configuração do Backend (Django)

#### 2.1. Instalar Dependências Python

```bash
# Instalar dependências principais
pip install django==5.2.3
pip install djangorestframework
pip install django-cors-headers
pip install psycopg2-binary
pip install djangorestframework-simplejwt
pip install drf-yasg
pip install django-filter

# Ou instalar todas de uma vez
pip install django djangorestframework django-cors-headers psycopg2-binary djangorestframework-simplejwt drf-yasg django-filter
```

#### 2.2. Configurar Banco de Dados

```bash
# Criar migrações
python manage.py makemigrations

# Aplicar migrações
python manage.py migrate
```

#### 2.3. Criar Superusuário

```bash
python manage.py createsuperuser
```

Siga as instruções para criar:
- Username: admin
- Email: admin@reflexsom.com
- Password: (escolha uma senha segura)

#### 2.4. Testar o Backend

```bash
# Iniciar servidor de desenvolvimento
python manage.py runserver 0.0.0.0:8000
```

Acesse:
- API: http://localhost:8000
- Admin: http://localhost:8000/admin
- Swagger: http://localhost:8000/swagger

### 3. Configuração do Frontend (React)

#### 3.1. Navegar para o Diretório Frontend

```bash
cd frontend
```

#### 3.2. Instalar Dependências

```bash
# Instalar dependências do projeto
pnpm install

# Instalar axios para requisições HTTP
pnpm install axios
```

#### 3.3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` no diretório `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

#### 3.4. Iniciar Servidor de Desenvolvimento

```bash
# Iniciar servidor React
pnpm run dev --host
```

O frontend estará disponível em: http://localhost:5173

### 4. Verificação da Instalação

#### 4.1. Testar Backend

1. Acesse http://localhost:8000/swagger
2. Verifique se a documentação da API está carregando
3. Teste o endpoint de saúde da API

#### 4.2. Testar Frontend

1. Acesse http://localhost:5173
2. Verifique se a página de login carrega
3. Teste o cadastro de um novo usuário

#### 4.3. Testar Integração

1. Cadastre um novo cliente pelo frontend
2. Verifique se o login funciona
3. Acesse o dashboard após login

## Configurações Avançadas

### Configuração de Produção

#### Backend (Django)

1. **Configurar PostgreSQL:**

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'reflexsom_db',
        'USER': 'reflexsom_user',
        'PASSWORD': 'sua_senha_segura',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

2. **Configurar variáveis de ambiente:**

```bash
export SECRET_KEY='sua_chave_secreta_django'
export DEBUG=False
export ALLOWED_HOSTS='seu-dominio.com,localhost'
```

#### Frontend (React)

1. **Build para produção:**

```bash
cd frontend
pnpm run build
```

2. **Servir arquivos estáticos:**

```bash
# Usando um servidor HTTP simples
npx serve dist
```

### Configuração de CORS

O CORS já está configurado no Django para desenvolvimento. Para produção, ajuste em `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://seu-frontend.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### Configuração de SSL/HTTPS

Para produção, configure SSL:

```python
# settings.py
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
```

## Solução de Problemas

### Problemas Comuns

#### 1. Erro de CORS

**Sintoma:** Erro de CORS no console do navegador

**Solução:**
```python
# Verificar configuração em settings.py
CORS_ALLOW_ALL_ORIGINS = True  # Apenas para desenvolvimento
```

#### 2. Erro de Migração

**Sintoma:** Erro ao executar migrações

**Solução:**
```bash
# Resetar migrações
python manage.py migrate --fake-initial
```

#### 3. Erro de Dependências Node.js

**Sintoma:** Erro ao instalar dependências

**Solução:**
```bash
# Limpar cache e reinstalar
pnpm store prune
rm -rf node_modules
pnpm install
```

#### 4. Erro de Porta em Uso

**Sintoma:** Porta 8000 ou 5173 em uso

**Solução:**
```bash
# Encontrar processo usando a porta
lsof -i :8000
kill -9 <PID>

# Ou usar porta alternativa
python manage.py runserver 8001
```

### Logs e Debugging

#### Backend (Django)

```python
# settings.py - Configurar logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
```

#### Frontend (React)

```javascript
// Habilitar logs detalhados
console.log('Debug info:', data);
```

## Manutenção

### Backup do Banco de Dados

```bash
# Fazer backup
python manage.py dumpdata > backup.json

# Restaurar backup
python manage.py loaddata backup.json
```

### Atualizações

```bash
# Atualizar dependências Python
pip list --outdated
pip install --upgrade <package>

# Atualizar dependências Node.js
pnpm update
```

### Monitoramento

- Verificar logs regularmente
- Monitorar uso de memória
- Verificar espaço em disco
- Testar funcionalidades críticas

## Suporte

Para suporte técnico:
1. Verificar logs de erro
2. Consultar documentação
3. Verificar issues conhecidos
4. Contatar equipe de desenvolvimento

---

**Última atualização:** Junho 2025  
**Versão do guia:** 1.0

