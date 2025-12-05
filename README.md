# 🦷 SmilePro

<div align="center">

**Plataforma SaaS completa para gestão de clínicas odontológicas**

</div>

---

## 📖 Sobre o Projeto

**SmilePro** é uma plataforma SaaS moderna e completa desenvolvida para gerenciar clínicas odontológicas. Oferece funcionalidades robustas para gestão de pacientes, agendamentos, serviços, assinaturas e muito mais.

### 🎯 Principais Funcionalidades

- ✅ **Gestão Completa de Pacientes** - CRUD completo com histórico de consultas
- ✅ **Sistema de Agendamentos** - Calendário interativo com controle de horários
- ✅ **Gestão de Serviços** - Cadastro e gerenciamento de serviços oferecidos
- ✅ **Sistema de Assinaturas** - Integração com Stripe para planos BASIC e PROFESSIONAL
- ✅ **Dashboard Analytics** - Gráficos e métricas de receita, agendamentos e status
- ✅ **Internacionalização (i18n)** - Suporte para Inglês e Português (Brasil)
- ✅ **Upload de Fotos** - Armazenamento seguro de fotos de pacientes via AWS S3
- ✅ **QR Code para Agendamento** - Geração automática de QR codes para links públicos
- ✅ **Sistema de Permissões** - Controle de acesso baseado em planos de assinatura
- ✅ **Autenticação Social** - Login via Google OAuth

---

## 🚀 Tecnologias

### Frontend

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes UI acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **dayjs** - Manipulação de datas
- **Recharts** - Gráficos e visualizações

### Backend

- **Next.js API Routes** - Endpoints RESTful
- **NextAuth.js** - Autenticação e autorização
- **Prisma ORM** - Acesso ao banco de dados
- **PostgreSQL** - Banco de dados relacional

### Integrações

- **Stripe** - Pagamentos e assinaturas recorrentes
- **Google OAuth** - Autenticação social
- **AWS S3** - Armazenamento de arquivos
- **QRCode** - Geração de códigos QR

### DevOps & Tools

- **ESLint** - Linter para qualidade de código
- **Prettier** - Formatação automática
- **Prisma Migrate** - Migrations do banco de dados

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ e npm/yarn/pnpm
- **PostgreSQL** 14+ (local ou remoto)
- **Conta Google** (para OAuth)
- **Conta Stripe** (para pagamentos)
- **Conta AWS** (para S3 - opcional)

---

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/smilepro.git
cd smilepro
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/smilepro?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-secret-aqui" # Gere com: openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PLAN_BASIC="price_..." # Price ID do plano Basic
STRIPE_PLAN_PROFESSIONAL="price_..." # Price ID do plano Professional
STRIPE_SUCCESS_URL="http://localhost:3000/dashboard/plans?success=true"
STRIPE_CANCEL_URL="http://localhost:3000/dashboard/plans?canceled=true"

# AWS S3 (Opcional - para upload de fotos)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="sua-access-key"
AWS_SECRET_ACCESS_KEY="sua-secret-key"
AWS_S3_BUCKET_NAME="seu-bucket-name"
AWS_CLOUDFRONT_URL="https://seu-cloudfront-url.cloudfront.net" # Opcional
```

### 4. Configure o banco de dados

```bash
# Execute as migrations
npx prisma migrate dev

# (Opcional) Popule o banco com dados de exemplo
npm run db:seed
```

### 5. Gere o cliente Prisma

```bash
npx prisma generate
```

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build e Produção
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção

# Qualidade de Código
npm run lint         # Executa ESLint
npm run format       # Formata código com Prettier
npm run format:check # Verifica formatação sem alterar

# Banco de Dados
npm run db:seed      # Reseta e popula o banco
npm run db:seed:only # Apenas popula (sem reset)

# Stripe (Desenvolvimento)
npm run stripe:listen # Escuta webhooks do Stripe localmente
```

---

## 📁 Estrutura do Projeto

```
smilepro/
├── app/                          # Next.js App Router
│   ├── (admin)/                 # Rotas protegidas (dashboard)
│   │   └── dashboard/
│   │       ├── appointments/    # Módulo de agendamentos
│   │       ├── patients/        # Módulo de pacientes
│   │       ├── services/        # Módulo de serviços
│   │       ├── profile/         # Perfil do usuário
│   │       └── plans/           # Planos e assinaturas
│   ├── (user)/                  # Rotas públicas
│   │   └── _components/        # Componentes da home
│   ├── api/                     # API Routes
│   │   ├── auth/               # NextAuth
│   │   ├── patients/            # Endpoints de pacientes
│   │   ├── qr-code/             # Geração de QR code
│   │   └── webhook/             # Webhooks (Stripe)
│   └── clinic/[clinicId]/       # Página pública da clínica
│
├── components/                   # Componentes compartilhados
│   ├── ui/                     # Componentes shadcn/ui
│   └── language-selector.tsx   # Seletor de idioma
│
├── hooks/                       # React Hooks customizados
│   └── use-translations.ts     # Hook de traduções
│
├── lib/                         # Bibliotecas e utilitários
│   ├── auth.ts                 # Configuração NextAuth
│   ├── prisma.ts               # Cliente Prisma
│   ├── i18n/                   # Sistema de traduções
│   └── utils/                  # Funções utilitárias
│
├── utils/                       # Utilitários de negócio
│   ├── permissions/            # Sistema de permissões
│   ├── plans/                  # Lógica de planos
│   └── stripe.ts               # Cliente Stripe
│
├── prisma/                      # Prisma
│   ├── schema.prisma           # Schema do banco
│   └── migrations/             # Migrations
│
└── public/                      # Arquivos estáticos
```

---

## 🔐 Configuração de Serviços Externos

### Google OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API "Google+ API"
4. Crie credenciais OAuth 2.0
5. Adicione `http://localhost:3000/api/auth/callback/google` como URI de redirecionamento
6. Copie o Client ID e Client Secret para o `.env`

### Stripe

1. Crie uma conta em [Stripe](https://stripe.com/)
2. Acesse o Dashboard → Products
3. Crie dois produtos: "Basic" e "Professional"
4. Crie preços recorrentes para cada produto
5. Copie os Price IDs para `STRIPE_PLAN_BASIC` e `STRIPE_PLAN_PROFESSIONAL`
6. Configure o webhook em `http://localhost:3000/api/webhook` (use `stripe:listen` para desenvolvimento)
7. Copie a chave secreta do webhook para `STRIPE_WEBHOOK_SECRET`

### AWS S3 (Opcional)

1. Crie um bucket no [AWS S3](https://aws.amazon.com/s3/)
2. Configure as políticas de acesso (CORS e bucket policy)
3. Crie um usuário IAM com permissões de S3
4. Gere Access Key e Secret Key
5. Adicione as credenciais no `.env`

---

## 📚 Documentação

### Documentação Adicional

- [System Design](./SYSTEM_DESIGN.md) - Arquitetura completa do sistema
- [i18n README](./i18n-README.md) - Guia de internacionalização (se existir)

### Principais Conceitos

#### Sistema de Permissões

O SmilePro utiliza um sistema de permissões baseado em planos:

- **BASIC**: Até 3 serviços, suporte padrão
- **PROFESSIONAL**: Até 40 serviços, suporte prioritário

#### Internacionalização

O sistema suporta múltiplos idiomas:

- Inglês (en) - padrão
- Português Brasil (pt-BR)

O idioma é determinado pela preferência do usuário (armazenada no banco) ou pelo `localStorage` para visitantes.

---

## 🧪 Desenvolvimento

### Executando em Modo Desenvolvimento

```bash
# Terminal 1: Servidor Next.js
npm run dev

# Terminal 2: Webhook do Stripe (opcional)
npm run stripe:listen
```
