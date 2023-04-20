# Jwt Implementation Example

Stack: npm workspaces, typescript, koa, react, zustand.

## Scripts

Run app with docker compose:

```sh
docker-compose up -d
```

Run app in dev environment:

```sh
npm run dev
```

## Screenshot

![Screenshot](/assets/screenshot.png)

## App structure

```mermaid
flowchart LR

endpoint1 --> encode
endpoint2 --> decode

agent-jwt --> endpoint1
agent-jwt --> endpoint2

subgraph jwt [libs/jwt]
  encode(encode)
  decode(decode)
end


subgraph backend [apps/backend]
  endpoint1(/jwt/encode)
  endpoint2(/jwt/decode)
end

subgraph frontend [apps/frontend]
  agent-jwt(jwtApi)
  widget-encode(EncodeWidget) --> agent-jwt
  widget-decode(DecodeWidget) --> agent-jwt
end

```
