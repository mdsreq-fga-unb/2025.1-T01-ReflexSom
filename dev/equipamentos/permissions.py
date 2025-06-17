from rest_framework import permissions


class IsStaffUser(permissions.BasePermission):
    """
    Permissão customizada que permite acesso apenas para usuários staff
    """
    
    def has_permission(self, request, view):
        # Verificar se o usuário está autenticado e é staff
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.is_staff
        )


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Permissão que permite leitura para todos, mas escrita apenas para admins
    """
    
    def has_permission(self, request, view):
        # Permitir leitura para todos
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Permitir escrita apenas para usuários autenticados e staff
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.is_staff
        ) 