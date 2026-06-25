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
| `clinica_migrate` | Build local (Node.js 24) | Container efêmero para executar migrations (profile `tools`) |

**Arquitetura:** `Host → Nginx (:80) → Node App (:3000) → PostgreSQL`

---

## ✅ Pré-requisitos

- Docker Desktop instalado e em execução
- WSL2 configurado (Windows) ou Linux/macOS
- Git
- Node.js 22+ e npm (apenas para desenvolvimento local sem Docker)

---

## 🚀 Como Executar o Projeto com Docker

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd prova-3-Semestre-2-Bimestre
cd clinica
```

### 2. Instale as dependências

```bash
npm install
```

> Isso instala localmente os pacotes do `package.json` (Express, Sequelize, bcrypt, JWT, etc). Necessário mesmo rodando com Docker, pois o Dockerfile copia o `node_modules` gerado.

### 3. Configure o arquivo de variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` preenchendo **todos** os valores abaixo:

```env
# ── Banco de Dados ──────────────────────────────────────────
DB_NAME=clinica          # Nome do banco que será criado no PostgreSQL
DB_USER=postgres         # Usuário do PostgreSQL (padrão: postgres)
DB_PASS=suasenhasegura   # ⚠️ Troque por uma senha forte
DB_HOST=db               # Nome do serviço no Docker Compose (não altere)
DB_PORT=5432             # Porta padrão do PostgreSQL (não altere)

# ── Autenticação JWT ─────────────────────────────────────────
JWT_SECRET=troque_por_uma_chave_muito_secreta
# ⚠️ Use uma string longa e aleatória. Exemplo para gerar:
#    node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_EXPIRES=8h           # Tempo de expiração do token (ex: 1h, 8h, 7d)

# ── Servidor ─────────────────────────────────────────────────
PORT=3000                # Porta interna do Node.js (não altere — o Nginx aponta aqui)
```

> ⚠️ **NUNCA commite o arquivo `.env` com senhas reais no repositório!** Ele já está no `.gitignore`.

### 4. Suba o ambiente completo

```bash
sudo docker compose up --build -d
```

O sistema estará disponível em: **http://localhost**

### 5. Execute as migrations

```bash
sudo docker compose run --rm migrate
```

> O serviço `migrate` usa o profile `tools`, então **não sobe automaticamente** com `docker compose up`. Ele só executa quando chamado explicitamente.

---

## 🗃️ Comandos de Migration

### Opção 1 — Via Docker (recomendado)

Roda dentro do container, com todas as variáveis de ambiente já configuradas:

```bash
sudo docker compose run --rm migrate
```

Para recriar o banco do zero (apaga todos os dados):

```bash
sudo docker compose run --rm migrate node command.js migrate:fresh
```

### Opção 2 — Via Node local

Com o banco já rodando (`docker compose up -d`), execute direto na máquina:

```bash
node command.js migrate
```

Para recriar o banco do zero:

```bash
node command.js migrate:fresh
```

> Requer Node.js instalado localmente e o `.env` preenchido com `DB_HOST=localhost` e a porta `5432` exposta no `docker-compose.yml` (apenas para desenvolvimento).

> ⚠️ **Atenção:** `migrate:fresh` usa `force: true` no Sequelize — todos os dados existentes serão perdidos.

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

### Serviço de Migration (`migrate`)
Container efêmero com profile `tools` — usa a mesma imagem da aplicação, mas sobrescreve o `CMD` para rodar `node command.js migrate`. O `--rm` garante que o container é removido após a execução. Depende do healthcheck do `db` para garantir que o banco está pronto antes de rodar.

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
2. Preencha `DB_PASS` com uma senha forte
3. Gere um `JWT_SECRET` seguro com:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
4. **Nunca commite o `.env` no repositório** — ele está no `.gitignore`

---

## ✅ Comandos de Verificação

```bash
# Verificar containers em execução
docker ps

# Ver logs da aplicação
sudo docker compose logs app

# Ver logs do nginx
sudo docker compose logs nginx

# Testar conexão com o banco
sudo docker compose exec db psql -U postgres -d clinica -c "\dt"

# Inspecionar a rede interna
docker network inspect clinica_backend
```

---

## 🧹 Limpeza

Para parar e remover containers (mantém volume do banco):

```bash
sudo docker compose down
```

Para remover tudo incluindo dados do banco:

```bash
sudo docker compose down -v
```


## video que pode ajudar

https://medal.tv/games/screen-capture/clips/mYTmu0PoK69hk3Ux_?invite=cr-MSw2d3QsNjE0ODMxMDY4