# Agno GUI Interface

🚀 **Advanced Multi-Agent GUI Interface for Agno Framework**

A sophisticated web interface for creating, managing, and monitoring AI agents with seamless integration to OpenRouter and Gemini AI, built with modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue)
![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-0.0.57-blue)

## ✨ Features

### 🤖 Agent Management System
- **Visual Agent Builder**: Drag-and-drop interface for creating AI agents
- **Template Library**: Pre-configured agent templates
- **Tool Integration**: External tool integration via MCP
- **Memory Management**: Persistent and contextual memory systems
- **Performance Monitoring**: Real-time performance metrics

### 👥 Multi-Agent Teams
- **Team Builder**: Create collaborative agent teams
- **Role Assignment**: Define roles and responsibilities
- **Communication Protocols**: Inter-agent communication management
- **Conflict Resolution**: Automated conflict resolution systems
- **Workflow Orchestration**: Complex workflow coordination

### 🔗 LLM Model Management
- **Multi-Provider Support**: OpenRouter + Gemini + Others
- **Auto-Switching**: Automatic model switching based on context
- **Cost Optimization**: Usage-based cost optimization
- **Performance Analytics**: Model performance tracking
- **Rate Limiting**: Automatic rate limit management

### 🧠 MCP Context7 Integration
- **Hallucination Prevention**: Advanced anti-hallucination systems
- **Context Validation**: Real-time context validation
- **Knowledge Grounding**: Verified knowledge anchoring
- **Fact Checking**: Automatic fact verification
- **Context Preservation**: Cross-session context management

### 📊 Real-time Monitoring & Analytics
- **Live Dashboard**: Real-time monitoring dashboard
- **Performance Metrics**: Detailed performance tracking
- **Error Tracking**: Comprehensive error analysis
- **Usage Analytics**: Usage pattern analysis
- **Alert System**: Intelligent alerting system

### 🎨 Advanced Features
- **Visual Workflow Designer**: Drag-and-drop workflow creation
- **Knowledge Base Integration**: Integrated knowledge management
- **Multi-modal Support**: Text, image, audio, video processing
- **Export/Import**: Configuration backup and restore
- **Version Control**: Agent and team versioning

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### State Management
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **Custom Hooks** - Reusable logic components

### AI Integration
- **Vercel AI SDK** - LLM integration framework
- **OpenRouter** - Multi-model routing
- **Gemini AI** - Google's AI models
- **MCP Context7** - Context management

### Backend
- **FastAPI** - Python web framework
- **Agno Framework** - Multi-agent orchestration
- **PostgreSQL** - Primary database
- **Prisma ORM** - Database toolkit

### Real-time Features
- **WebSockets** - Real-time communication
- **Server-Sent Events** - Live updates
- **Socket.io** - WebSocket client

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL 14+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/agno-gui-interface.git
   cd agno-gui-interface
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup (Optional)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the FastAPI server**
   ```bash
   uvicorn app.main:app --reload
   ```

## 📁 Project Structure

```
agno-gui-interface/
├── 📁 app/                      # Next.js App Router
│   ├── 📁 (auth)/              # Authentication routes
│   ├── 📁 dashboard/           # Main dashboard
│   ├── 📁 agents/              # Agent management
│   ├── 📁 teams/               # Team management
│   ├── 📁 workflows/           # Workflow designer
│   ├── 📁 knowledge/           # Knowledge base
│   ├── 📁 models/              # Model management
│   └── 📁 analytics/           # Analytics dashboard
├── 📁 components/              # React components
│   ├── 📁 ui/                  # Base UI components
│   ├── 📁 agents/              # Agent-specific components
│   ├── 📁 teams/               # Team components
│   ├── 📁 models/              # Model components
│   └── 📁 layout/              # Layout components
├── 📁 lib/                     # Utility libraries
├── 📁 hooks/                   # Custom React hooks
├── 📁 stores/                  # State management
├── 📁 types/                   # TypeScript types
├── 📁 backend/                 # FastAPI backend
└── 📁 docs/                    # Documentation
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Application
NODE_ENV=development
PORT=3000
API_BASE_URL=http://localhost:8000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/agno_gui"

# AI Providers
OPENROUTER_API_KEY=your_openrouter_key
GEMINI_API_KEY=your_gemini_key

# Agno Framework
AGNO_API_KEY=your_agno_key
AGNO_WORKSPACE_ID=your_workspace_id

# MCP Context7
MCP_CONTEXT7_API_KEY=your_context7_key
MCP_CONTEXT7_PROJECT_ID=your_project_id

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
```

### API Configuration

The application integrates with multiple AI providers:

- **OpenRouter**: Multi-model routing and optimization
- **Gemini AI**: Google's advanced AI models
- **MCP Context7**: Context management and validation

## 🎯 Usage

### Creating Your First Agent

1. Navigate to the Dashboard
2. Click "Create Agent"
3. Choose a template or start from scratch
4. Configure the agent's personality and tools
5. Deploy and start chatting!

### Building Agent Teams

1. Go to the Teams section
2. Create a new team
3. Add agents with specific roles
4. Define communication protocols
5. Set up workflows and triggers

### Workflow Design

1. Open the Workflow Designer
2. Drag and drop components
3. Connect agents and actions
4. Configure triggers and conditions
5. Test and deploy workflows

## 📊 Monitoring & Analytics

- **Real-time Performance**: Monitor agent response times
- **Usage Analytics**: Track API usage and costs
- **Error Tracking**: Detailed error reporting and analysis
- **Custom Dashboards**: Build custom monitoring views

## 🔒 Security

- **API Key Management**: Secure storage and rotation
- **Authentication**: NextAuth.js integration
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive data validation
- **Rate Limiting**: Built-in rate limiting protection

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

### Docker

```bash
# Build and run with Docker
docker-compose up --build
```

## 📚 Documentation

- [Setup Guide](docs/SETUP.md)
- [API Reference](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guide](CONTRIBUTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Agno Framework** for the multi-agent orchestration
- **Vercel** for the AI SDK and hosting platform
- **OpenRouter** for multi-model integration
- **Google** for Gemini AI models
- **Context7** for context management solutions

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/agno-gui-interface/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/agno-gui-interface/discussions)
- **Email**: support@agnogui.com

---

**Built with ❤️ for the AI community**