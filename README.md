# Agno GUI Interface v1.0.2

## 🚀 Interface Avançada para o Framework Agno Multi-Agent

Uma interface GUI interativa avançada para criar, gerenciar e monitorar agents e multi-agents com integração completa aos modelos LLM via OpenRouter e Gemini AI.

### ✨ Versão 1.0.2 - Otimizada

- **Next.js 15.0.0** com React 18.2.0
- **Porta otimizada:** 3006 (sem conflitos)
- **TanStack Query** para gerenciamento de estado
- **Componentes UI** otimizados com Radix UI
- **Sistema de logs** completo e monitoramento

## 🎯 Funcionalidades Principais

### ✅ Sistema Funcional
- [x] **Frontend Next.js 15** - Rodando na porta 3006
- [x] **Interface Responsiva** - Design moderno e adaptativo
- [x] **Componentes UI** - Base construída com Radix UI
- [x] **State Management** - TanStack Query configurado
- [x] **Sistema de Logs** - Monitoramento em tempo real
- [x] **Scripts de Inicialização** - PowerShell e Batch otimizados

### 🔄 Em Desenvolvimento
- [ ] **Agent Builder** - Interface visual para criação de agents
- [ ] **Multi-Agent Teams** - Gerenciamento de equipes colaborativas
- [ ] **LLM Integration** - OpenRouter + Gemini AI
- [ ] **MCP Context7** - Sistema anti-alucinação
- [ ] **Workflow Designer** - Designer visual de workflows
- [ ] **Knowledge Base** - Base de conhecimento integrada

## 🚀 Início Rápido

### 1. Clone o Repositório
```bash
git clone <repository-url>
cd agno-gui-interface
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Iniciar o Sistema
#### PowerShell (Recomendado):
```powershell
.\start-agno-gui.ps1
```

#### Batch (Windows CMD):
```batch
.\INICIAR_AGNO_AGENTS.bat
```

### 4. Acessar a Interface
- **URL:** `http://localhost:3006`
- **Status:** ✅ **FUNCIONAL**
- **Porta:** 3006 (otimizada)

## 📊 Status do Sistema

| Componente | Status | Porta/URL |
|------------|--------|-----------|
| **Frontend Next.js** | ✅ **ATIVO** | http://localhost:3006 |
| **React 18** | ✅ **FUNCIONAL** | Integrado |
| **TanStack Query** | ✅ **CONFIGURADO** | Gerenciamento de estado |
| **UI Components** | ✅ **OTIMIZADO** | Radix UI + Tailwind |
| **Sistema de Logs** | ✅ **ATIVO** | logs/frontend.log |
| **Scripts de Inicialização** | ✅ **OTIMIZADO** | v1.0.2 |

## 🛠️ Scripts Disponíveis

### PowerShell (start-agno-gui.ps1)
- **Sistema completo** de inicialização otimizada
- **Detecção automática** de dependências
- **Fallback inteligente** para instalação
- **Logs detalhados** em tempo real

### Batch (INICIAR_AGNO_AGENTS.bat)
- **Interface colorida** no CMD
- **Verificação de dependências**
- **Instalação otimizada** de pacotes
- **Compatibilidade** Windows completa

### Scripts Auxiliares
```batch
.\check_health.bat      # Verificar saúde do sistema
.\view_logs.bat         # Visualizar logs em tempo real
.\clear_logs.bat        # Limpar arquivos de log
.\install-emergency.bat # Instalação de emergência
```

## 🔧 Configuração

### Porta Otimizada
- **Padrão:** 3006 (sem conflitos)
- **Configuração:** `PORT=3006` em variáveis de ambiente
- **Arquivos:** `.env.local` e `next.config.js` atualizados

### Variáveis de Ambiente
```env
# ===== APLICAÇÃO =====
NODE_ENV=development
PORT=3006
API_BASE_URL=http://localhost:8000

# ===== DATABASE =====
DATABASE_URL="sqlite:./database.db"

# ===== API KEYS =====
OPENROUTER_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

## 📝 Logs e Monitoramento

### Estrutura de Logs
```
logs/
├── startup_verification.log  # Log de inicialização
├── frontend.log              # Log do servidor Next.js
├── frontend-error.log        # Erros do frontend
└── docker_startup.log        # Logs do Docker (quando ativo)
```

### Monitoramento em Tempo Real
```batch
.\view_logs.bat
```

### Verificação de Saúde
```batch
.\check_health.bat
```

## 🎨 Interface

### Design System
- **Framework:** Next.js 15 com App Router
- **Styling:** Tailwind CSS otimizado
- **Componentes:** Radix UI primitives
- **Ícones:** Lucide React
- **Temas:** Suporte a dark/light mode

### Layout Responsivo
- **Mobile-first** approach
- **Breakpoints** otimizados
- **Componentes** adaptativos
- **Performance** maximizada

## 🔐 Demonstração

### Contas de Teste
- **Admin:** admin@agnogui.com / password
- **User:** user@agnogui.com / password

## 🚨 Solução de Problemas

### Instalação de Emergência
```batch
.\install-emergency.bat
```

### Logs de Debug
- Verifique `logs\frontend.log` para erros
- Use `logs\frontend-error.log` para debug detalhado
- Consulte `TROUBLESHOOTING.txt` para soluções

### Problemas Comuns
1. **Porta 3006 ocupada?** - O sistema detecta e sugere alternativas
2. **Dependências faltando?** - Script de emergência instala automaticamente
3. **Compilação lenta?** - Normal na primeira vez, Hot Reload acelera depois

## 📈 Roadmap

### Próximas Funcionalidades
- [ ] **Agent Builder Visual** - Interface drag-and-drop
- [ ] **Multi-Agent Teams** - Coordenação entre agents
- [ ] **LLM Integration** - OpenRouter + Gemini
- [ ] **Knowledge Base** - Sistema de documentos
- [ ] **Real-time Monitoring** - Dashboard de métricas
- [ ] **Workflow Engine** - Designer visual de processos

### Melhorias Planejadas
- [ ] **Performance Optimization** - Code splitting avançado
- [ ] **Accessibility** - WCAG 2.1 AA compliance
- [ ] **Internationalization** - i18n support (PT-BR/EN)
- [ ] **PWA Features** - Funcionalidades offline
- [ ] **Testing Suite** - Jest + Testing Library

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **Agno Framework** - Base do sistema multi-agent
- **Next.js** - Framework React de ponta
- **Vercel** - Hosting e deploy platform
- **Radix UI** - Componentes primitivos
- **Tailwind CSS** - Framework de styling

---

## 🎊 Status Final

**✅ SISTEMA FUNCIONAL**
- Frontend Next.js 15 rodando em http://localhost:3006
- Interface completa e responsiva
- Scripts de inicialização otimizados
- Sistema de logs e monitoramento ativo

**🔄 PRONTO PARA DESENVOLVIMENTO**
- Base sólida estabelecida
- Dependências essenciais instaladas
- Estrutura de projeto organizada
- Ferramentas de desenvolvimento configuradas

**🚀 AGUARDANDO FUNCIONALIDADES AVANÇADAS**
- Integração Agno framework
- Multi-agent orchestration
- LLM integrations
- Sistema de conhecimento

---

**🎉 Parabéns! O sistema Agno GUI Interface v1.0.2 está funcionando perfeitamente!**

Acesse **`http://localhost:3006`** para ver a interface em funcionamento.