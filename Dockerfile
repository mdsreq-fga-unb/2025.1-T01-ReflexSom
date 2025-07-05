# Dockerfile para Reflex Som MVP (SQLite)
FROM python:3.11-slim

# Definir variáveis de ambiente
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=backend.settings_docker

# Definir diretório de trabalho
WORKDIR /app

# Instalar dependências do sistema (mínimas para SQLite)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        sqlite3 \
        build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código da aplicação
COPY . .

# Criar usuário não-root
RUN adduser --disabled-password --gecos '' appuser

# Criar diretórios necessários e definir permissões
RUN mkdir -p logs data staticfiles media \
    && chown -R appuser:appuser /app \
    && chmod -R 755 /app

# Mudar para usuário não-root
USER appuser

# Expor porta
EXPOSE 8000

# Comando padrão
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "backend.wsgi:application"] 