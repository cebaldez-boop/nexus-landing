# NEXUS Landing - Guia de Deploy

## URLs
- Site: https://orbitflow-vault.web.app
- Repo: https://github.com/cebaldez-boop/nexus-landing
- Firebase: orbitflow-vault

## Comandos

### Local
cd ~/nexus-landing && npm run dev

### Deploy producao
cd ~/nexus-landing && npm run build && firebase deploy

### Push GitHub + Deploy
cd ~/nexus-landing && git add -A && git commit -m "update" && git push && npm run build && firebase deploy
