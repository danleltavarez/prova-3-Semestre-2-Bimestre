# 🏥 API Clínica Médica

Sistema backend REST para gerenciamento de uma clínica médica, desenvolvido com Node.js, Express, Sequelize e PostgreSQL.

## Caminho Escolhido

**Opção A — Docker / Orquestração Local**

---

## 📦 Containers Utilizados

| Container | Imagem | Descrição |
|---|---|---|
| `clinica_db` | `postgres:17-alpine` | Banco de dados PostgreSQL |
| `clinica_app` | Build local (Node.js 24) | Servidor web Node.js (privado, sem acesso direto pelo host) |
| `clinica_nginx` | `nginx:alpine` | Proxy reverso — único ponto de entrada externo |

**Arquitetura:** `Host → Nginx (:80) → Node App (:3000) → PostgreSQL`

---

## ✅ Pré-requisitos

- Docker Desktop instalado e em execução
- WSL2 configurado (Windows) ou Linux/macOS
- Git

---

## 🚀 Como Executar o Projeto com Docker

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd clinica-api
```

### 2. Configure o arquivo de variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações (especialmente `JWT_SECRET` e `DB_PASS`).

> ⚠️ **NUNCA commite o arquivo `.env` com senhas reais no repositório!**

### 3. Suba o ambiente completo

```bash
docker compose up --build
```

O sistema estará disponível em: **http://localhost**

---

## 🗃️ Como Executar as Migrations

As migrations criam/atualizam todas as tabelas automaticamente.

### Aguarde o banco subir e execute:

```bash
docker compose exec app node command.js migrate
```

Para recriar o banco do zero (apaga todos os dados):

```bash
docker compose exec app node command.js migrate:fresh
```

---

## 🔐 Como Realizar Login e Usar o Token JWT

### 1. Registre um usuário

```bash
curl -X POST http://localhost/api/registro \
  -H "Content-Type: application/json" \
  -d '{"nome": "Admin", "email": "admin@clinica.com", "senha": "123456"}'
```

### 2. Faça login

```bash
curl -X POST http://localhost/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@clinica.com", "senha": "123456"}'
```

A resposta retorna um `token`. Use-o em todas as requisições protegidas:

```bash
curl http://localhost/api/pacientes \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📚 Documentação Swagger

Acesse a documentação interativa em:

**http://localhost/api-docs**

Todas as entidades estão documentadas com suas 5 rotas básicas (list, get, create, update, delete), além das rotas da tabela pivô `medico_especialidade`.

Para usar rotas protegidas no Swagger: clique em **Authorize** e insira `Bearer SEU_TOKEN`.

---

## 🗺️ Rotas Disponíveis

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/api/registro` | Registra novo usuário | ❌ |
| POST | `/api/login` | Gera token JWT | ❌ |
| GET/POST | `/api/convenios` | Listar / Criar convênios | ✅ |
| GET/PUT/DELETE | `/api/convenios/:id` | Buscar / Atualizar / Remover | ✅ |
| GET/POST | `/api/especialidades` | Listar / Criar especialidades | ✅ |
| GET/PUT/DELETE | `/api/especialidades/:id` | Buscar / Atualizar / Remover | ✅ |
| GET/POST | `/api/especialidades/vinculos` | Tabela pivô médico-especialidade | ✅ |
| DELETE | `/api/especialidades/vinculos/:id` | Remove vínculo | ✅ |
| GET/POST | `/api/pacientes` | Listar / Criar pacientes | ✅ |
| GET/PUT/DELETE | `/api/pacientes/:id` | Buscar / Atualizar / Remover | ✅ |
| GET/POST | `/api/medicos` | Listar / Criar médicos | ✅ |
| GET/PUT/DELETE | `/api/medicos/:id` | Buscar / Atualizar / Remover | ✅ |
| GET/POST | `/api/agendas` | Listar / Criar horários | ✅ |
| GET/PUT/DELETE | `/api/agendas/:id` | Buscar / Atualizar / Remover | ✅ |
| GET/POST | `/api/consultas` | Listar / Agendar consultas | ✅ |
| GET/PUT/DELETE | `/api/consultas/:id` | Buscar / Atualizar / Remover | ✅ |

---

## 🔧 Detalhamento Técnico da Infraestrutura

### Otimização de Imagens (Dockerfile)
Multi-stage build com separação total entre estágio de instalação de dependências (`builder`) e runtime (`runtime`). Imagem base `node:24-alpine` para mínimo tamanho. Usuário não-root para segurança. `.dockerignore` configurado para excluir `node_modules`, `.env`, logs e pastas de IDE.

### Persistência
Named Volume `pgdata` para o PostgreSQL, garantindo que os dados persistam mesmo com `docker compose down`. Bind mounts não são usados para dados em produção.

### Rede e Comunicação
Custom Bridge Network `backend`. O Node.js e o PostgreSQL se comunicam via **DNS interno por nome de serviço** (`db`, `app`) — IPs estáticos são proibidos. O Nginx é o único container que expõe porta para o host (`:80`). O Node.js fica isolado na rede interna.

### Segurança
- Variáveis sensíveis via arquivo `.env` (nunca hardcoded)
- JWT com expiração configurável
- Senhas criptografadas com bcrypt (salt rounds: 10)
- Node.js sem porta exposta ao host (acesso somente via Nginx)

---

## 🔑 Gestão de Segredos e Configurações

1. Copie `.env.example` para `.env`
2. Preencha `DB_PASS` e `JWT_SECRET` com valores seguros
3. **Nunca commite o `.env` no repositório** — ele está no `.gitignore`

---

## ✅ Comandos de Verificação

```bash
# Verificar containers em execução
docker ps

# Ver logs da aplicação
docker compose logs app

# Ver logs do nginx
docker compose logs nginx

# Testar conexão com o banco
docker compose exec db psql -U postgres -d clinica -c "\dt"

# Inspecionar a rede interna
docker network inspect clinica_backend
```

---

## 🧹 Limpeza

Para parar e remover containers (mantém volume do banco):

```bash
docker compose down
```

Para remover tudo incluindo dados do banco:

```bash
docker compose down -v
```
