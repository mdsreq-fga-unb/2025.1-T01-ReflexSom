import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Carregar carrinho do localStorage ao inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Adicionar item ao carrinho
  const addToCart = (equipamento, quantidade, modalidade, periodo, dataUso) => {
    const novoItem = {
      id: Date.now(), // ID único para o item do carrinho
      equipamento_id: equipamento.id,
      equipamento_nome: equipamento.nome,
      equipamento_marca: equipamento.marca,
      equipamento_modelo: equipamento.modelo,
      equipamento_imagem: equipamento.imagem_principal,
      equipamento_categoria: equipamento.categoria_nome,
      quantidade: parseInt(quantidade),
      modalidade,
      periodo: parseInt(periodo),
      data_uso: dataUso,
      valor_unitario: getValorPorModalidade(equipamento, modalidade),
      valor_total: calcularValorTotal(equipamento, quantidade, modalidade, periodo),
      data_adicao: new Date().toISOString()
    };

    setCartItems(prev => [...prev, novoItem]);
  };

  // Remover item do carrinho
  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Atualizar quantidade do item
  const updateQuantity = (itemId, novaQuantidade) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const novoValorTotal = item.valor_unitario * novaQuantidade * item.periodo;
          return {
            ...item,
            quantidade: parseInt(novaQuantidade),
            valor_total: novoValorTotal
          };
        }
        return item;
      })
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Verificar se equipamento já está no carrinho
  const isInCart = (equipamentoId) => {
    return cartItems.some(item => item.equipamento_id === equipamentoId);
  };

  // Obter valor por modalidade
  const getValorPorModalidade = (equipamento, modalidade) => {
    switch (modalidade) {
      case 'diaria':
        return parseFloat(equipamento.valor_diaria);
      case 'semanal':
        return parseFloat(equipamento.valor_semanal || equipamento.valor_diaria * 7);
      case 'mensal':
        return parseFloat(equipamento.valor_mensal || equipamento.valor_diaria * 30);
      default:
        return parseFloat(equipamento.valor_diaria);
    }
  };

  // Calcular valor total do item
  const calcularValorTotal = (equipamento, quantidade, modalidade, periodo) => {
    const valorUnitario = getValorPorModalidade(equipamento, modalidade);
    return valorUnitario * parseInt(quantidade) * parseInt(periodo);
  };

  // Calcular total do carrinho
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.valor_total, 0);
  };

  // Obter quantidade total de itens
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantidade, 0);
  };

  // Verificar disponibilidade do equipamento
  const checkAvailability = (equipamento, quantidade, dataUso) => {
    // Verificar se a quantidade solicitada não excede a disponível
    if (quantidade > equipamento.quantidade_disponivel) {
      return {
        available: false,
        message: `Apenas ${equipamento.quantidade_disponivel} unidade(s) disponível(is)`
      };
    }

    // Verificar se o equipamento está disponível
    if (!equipamento.disponivel) {
      return {
        available: false,
        message: 'Equipamento indisponível no momento'
      };
    }

    // Verificar se a data é futura
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataUsoDate = new Date(dataUso);
    
    if (dataUsoDate <= hoje) {
      return {
        available: false,
        message: 'A data de uso deve ser futura'
      };
    }

    return {
      available: true,
      message: 'Equipamento disponível'
    };
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartTotal,
    getCartItemCount,
    checkAvailability,
    getValorPorModalidade,
    calcularValorTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 